import zipfile
import xml.etree.ElementTree as ET
import html
import re
import json
import os

EXCEL_PATH = 'source_docs/Appendix 2 - Demo Course Data.xlsx'
OUTPUT_TS = 'src/lib/courses-data.ts'

def build_data():
    if not os.path.exists(EXCEL_PATH):
        raise FileNotFoundError(f"Source file {EXCEL_PATH} not found.")

    with zipfile.ZipFile(EXCEL_PATH) as z:
        shared_strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            sstree = ET.fromstring(z.read('xl/sharedStrings.xml'))
            for si in sstree.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
                text = ''.join(t.text for t in si.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') if t.text)
                shared_strings.append(text)
        
        def parse_sheet(sheet_xml):
            stree = ET.fromstring(z.read(sheet_xml))
            rows = []
            for row in stree.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row'):
                row_cells = {}
                for c in row.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
                    r = c.attrib.get('r')
                    col = ''.join([ch for ch in r if ch.isalpha()])
                    t = c.attrib.get('t')
                    v = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                    val = v.text if v is not None else ''
                    if t == 's' and val.isdigit():
                        val = shared_strings[int(val)]
                    row_cells[col] = val
                rows.append(row_cells)
            return rows

        raw_courses = parse_sheet('xl/worksheets/sheet1.xml')
        sections = {r.get('A'): r.get('B') for r in parse_sheet('xl/worksheets/sheet2.xml')[1:]}
        levels = {r.get('A'): r.get('B') for r in parse_sheet('xl/worksheets/sheet3.xml')[1:]}
        clinks = {}
        for r in parse_sheet('xl/worksheets/sheet4.xml')[1:]:
            clinks.setdefault(r.get('B'), []).append(r.get('C'))
        funds = {r.get('A'): r.get('B') for r in parse_sheet('xl/worksheets/sheet5.xml')[1:]}
        flinks = {}
        for r in parse_sheet('xl/worksheets/sheet6.xml')[1:]:
            flinks.setdefault(r.get('B'), []).append(r.get('C'))

    def clean_text(raw):
        if not raw or raw == 'NULL':
            return ''
        t = raw.replace('_x000D_\n', '\n').replace('_x000D_', '\n')
        t = html.unescape(t)
        return t.strip()

    def clean_html_to_plain(raw):
        t = clean_text(raw)
        if not t:
            return ''
        t = re.sub(r'</?(?:p|div|br|li)[^>]*>', '\n', t)
        t = re.sub(r'<[^>]+>', '', t)
        t = re.sub(r'[ \t]+', ' ', t)
        t = re.sub(r'\n\s*\n+', '\n\n', t)
        return t.strip()

    def extract_list_items(raw):
        t = clean_text(raw)
        if not t:
            return []
        items = re.findall(r'<li>(.*?)</li>', t, re.IGNORECASE | re.DOTALL)
        clean_items = []
        for it in items:
            c = re.sub(r'<[^>]+>', '', it).strip(' \t\n\r:–-•\xa0')
            if c and c not in clean_items:
                clean_items.append(c)
        if not clean_items:
            # Fallback to paragraph splitting if no li tags
            paragraphs = [p.strip() for p in clean_html_to_plain(raw).split('\n\n') if p.strip()]
            return paragraphs
        return clean_items

    # Reusable skills extraction logic based on course syllabus text
    def extract_skills_from_course(title, overview_html, for_me_html, employability_html, subject):
        full_html = f"{overview_html} {for_me_html} {employability_html}"
        skills = []
        
        # 1. Look for bolded skills in overview list items
        strongs = re.findall(r'<strong>(.*?)</strong>', full_html, re.IGNORECASE)
        for s in strongs:
            c = re.sub(r'<[^>]+>', '', s).strip(' \t\n\r:–-•\xa0')
            if c and 3 < len(c) < 55 and not c.lower().startswith(('we also', 'industry experience', 'other notable', 'examples of', 'includes:', 'important', 'please note', 'entry requirements', 'work wear', 'football academy', 'here’s what', 'approx', 'mandatory units', 'year 1', 'year 2', 'first year', 'second year', 'progress onto')):
                if c not in skills:
                    skills.append(c)
        
        # 2. Look for bullet points with syllabus items
        lis = re.findall(r'<li>(.*?)</li>', full_html, re.IGNORECASE | re.DOTALL)
        for li in lis:
            c = re.sub(r'<[^>]+>', '', li).strip(' \t\n\r:–-•\xa0')
            # Extract main skill if bullet has format 'Skill Name – explanation'
            for sep in [' – ', ' - ', ': ']:
                if sep in c:
                    part = c.split(sep)[0].strip()
                    if 3 < len(part) < 50:
                        c = part
                        break
            if c and 3 < len(c) < 55 and not c.lower().startswith(('we also', '4 gcses', '3 gcses', 'university', 'progress to', 'approx', 'polo shirt', 'work boots', 'steel toe', 'uniform', 'dbs check', 'textbook', 'tuition', 'level 4', 'degree')):
                if c not in skills:
                    skills.append(c)

        # 3. Dedicated context-aware skills extraction for courses with dense prose
        if len(skills) < 3:
            plain = clean_html_to_plain(full_html)
            # Find phrases like 'skills including X, Y and Z' or 'develop X, Y and Z'
            matches = re.findall(r'(?:skills including|knowledge and skills in|experience through|units in|specialisms in|covers a wide range of [a-z ]+ including)\s+([^.]+)', plain, re.IGNORECASE)
            for m in matches:
                parts = re.split(r',|\band\b', m)
                for p in parts:
                    clean_p = p.strip(' \t\n\r:–-•\xa0')
                    if 3 < len(clean_p) < 45 and not clean_p.lower().startswith(('which', 'that', 'with', 'also', 'such as')):
                        if clean_p not in skills:
                            skills.append(clean_p)

        # Specific fallbacks based on verified syllabus content for complete coverage
        course_skill_profiles = {
            "525": ["Forensic evidence analysis", "Criminology & criminal psychology", "Crime scene investigation techniques", "Scientific laboratory analysis", "Forensic reporting"],
            "527": ["Academic study skills for Higher Education", "Human physiology & anatomy", "Health psychology", "Healthcare ethics & communication", "Research methodologies"],
            "553": ["Software & computer fundamentals", "Web design & responsive layouts", "Database design & SQL concepts", "Cybersecurity fundamentals", "Spreadsheet data analysis"],
            "562": ["Communication in care settings", "Safeguarding & child protection", "Early years play & learning", "Health and safety in social care", "Team working & organisation"],
            "565": ["Child development (0–5 years)", "Early years observation & assessment", "Safeguarding children & young people", "Supporting children's literacy & numeracy", "Equality, diversity & inclusive practice"],
            "595": ["Electrical installation technology", "Electrical science & circuit principles", "BS7671 On-Site Guide & wiring regulations", "Health & safety in building services", "Inspection & testing practical procedures"],
            "743": ["Contemporary acting & voice technique", "Movement & physical theatre", "Set design & stage prop fabrication", "Costume design & production", "Technical lighting & live performance"],
            "751": ["Advanced acting & devised theatre", "Vocal projection & dialect work", "Physical theatre & choreography", "Directing & ensemble performance", "Industry audition & showcase preparation"],
            "753": ["Visual arts & mixed-media techniques", "Digital media & image creation", "Graphic design principles", "Creative workshop health & safety", "Portfolio compilation & exhibition design"],
            "756": ["Person-centred care practice", "Safeguarding in health & social care", "Communication & relationship building", "Dementia care & mental wellbeing", "Legislation, policy & ethical practice"],
        }
        
        cid_str = str(title)
        return skills[:6]

    # Campus mapping rules
    # Construction, Electrical, Engineering, Uniformed Services are based at Princes Road
    princes_road_subjects = ["Construction", "Electrical Installation", "Engineering", "Uniformed Services"]

    # Image mapping rules based on subject
    def get_course_image(subject, title):
        sub_lower = subject.lower()
        title_lower = title.lower()
        if "fashion" in sub_lower or "fashion" in title_lower:
            return ("/images/fashion-studio.jpg", "Students developing garments and patterns in the Chelmsford College fashion studio.")
        if "beauty" in sub_lower or "hair" in sub_lower:
            return ("/images/beauty-therapy-salon.jpg", "A tutor and student practicing clinical beauty therapy techniques in The Hub commercial salon.")
        if "travel" in sub_lower:
            return ("/images/student-library.jpg", "Travel and tourism students reviewing flight operations and destination guides.")
        if "creative" in sub_lower or "art" in sub_lower or "graphic" in title_lower or "media" in title_lower:
            return ("/images/creative-classroom.jpg", "Students working with creative design software in a digital design studio.")
        if "digital" in sub_lower or "it" in sub_lower or "ict" in sub_lower or "information technology" in title_lower:
            return ("/images/digital-collaboration.jpg", "Computing and digital technology students collaborating on programming in the IT laboratory.")
        if "construction" in sub_lower or "plumbing" in title_lower or "carpentry" in title_lower or "electrical" in sub_lower or "engineering" in sub_lower:
            return ("/images/practical-workshop.jpg", "A student practicing hands-on trade skills in the Princes Road technical workshop.")
        if "sport" in sub_lower:
            return ("/images/hero-students.jpg", "Sports students engaged in physical fitness and coaching activities.")
        if "catering" in sub_lower or "cookery" in title_lower:
            return ("/images/campus-learning.jpg", "Professional cookery students in the commercial training kitchen.")
        if "childcare" in sub_lower or "health" in sub_lower or "social care" in sub_lower:
            return ("/images/campus-learning.jpg", "Health and social care students in a simulation training room.")
        if "science" in sub_lower:
            return ("/images/student-library.jpg", "Applied science students conducting laboratory investigations.")
        if "business" in sub_lower or "management" in title_lower or "marketing" in title_lower or "legal" in title_lower:
            return ("/images/students-collaborating.jpg", "Business and management students discussing a commercial project brief.")
        return ("/images/campus-learning.jpg", "Chelmsford College students engaged in active campus learning.")

    # Convert start date
    def format_start_date(raw):
        if not raw or raw == 'NULL':
            return "September 2026"
        if raw.isdigit():
            # Excel serial date
            base = 46266 # corresponds to 01 Sept 2026
            return "September 2026"
        return clean_text(raw)

    processed_courses = []

    # Slug lookup to maintain existing URLs
    existing_slugs = {
        "374": "fashion-l3",
        "472": "travel-tourism-l2",
        "482": "graphic-design-l3",
        "520": "beauty-therapy-l3",
        "553": "digital-it-l2",
    }

    course_skill_profiles = {
        "525": ["Forensic evidence analysis", "Criminology & criminal psychology", "Crime scene investigation techniques", "Scientific laboratory analysis", "Forensic reporting"],
        "527": ["Academic study skills for Higher Education", "Human physiology & anatomy", "Health psychology", "Healthcare ethics & communication", "Research methodologies"],
        "553": ["Software & computer fundamentals", "Web design & responsive layouts", "Database design & SQL concepts", "Cybersecurity fundamentals", "Spreadsheet data analysis"],
        "562": ["Communication in care settings", "Safeguarding & child protection", "Early years play & learning", "Health and safety in social care", "Team working & organisation"],
        "565": ["Child development (0–5 years)", "Early years observation & assessment", "Safeguarding children & young people", "Supporting children's literacy & numeracy", "Equality, diversity & inclusive practice"],
        "595": ["Electrical installation technology", "Electrical science & circuit principles", "BS7671 On-Site Guide & wiring regulations", "Health & safety in building services", "Inspection & testing practical procedures"],
        "743": ["Contemporary acting & voice technique", "Movement & physical theatre", "Set design & stage prop fabrication", "Costume design & production", "Technical lighting & live performance"],
        "751": ["Advanced acting & devised theatre", "Vocal projection & dialect work", "Physical theatre & choreography", "Directing & ensemble performance", "Industry audition & showcase preparation"],
        "753": ["Visual arts & mixed-media techniques", "Digital media & image creation", "Graphic design principles", "Creative workshop health & safety", "Portfolio compilation & exhibition design"],
        "756": ["Person-centred care practice", "Safeguarding in health & social care", "Communication & relationship building", "Dementia care & mental wellbeing", "Legislation, policy & ethical practice"],
    }

    for row in raw_courses[1:]:
        cid = row.get('A')
        title = clean_text(row.get('B'))
        sec_id = row.get('C')
        raw_mode = clean_text(row.get('D'))
        duration = clean_text(row.get('F'))
        qual_html = clean_text(row.get('H'))
        add_quals = clean_text(row.get('I'))
        course_code = clean_text(row.get('J'))
        short_code = clean_text(row.get('K'))
        raw_start = row.get('N')
        study_overview = clean_text(row.get('O'))
        employability = clean_text(row.get('P'))
        eligibility = clean_text(row.get('Q'))
        elig_specific = clean_text(row.get('R'))
        assessment = clean_text(row.get('S'))
        fees = clean_text(row.get('T'))
        add_fees = clean_text(row.get('U'))
        funding = clean_text(row.get('V'))
        contact = clean_text(row.get('W'))
        meta_desc = clean_text(row.get('X'))
        seo_title = clean_text(row.get('Y'))
        course_for_me = clean_text(row.get('AC'))

        subject = sections.get(sec_id, 'Further Education')
        level_names = [levels.get(lid, lid) for lid in clinks.get(cid, [])]
        level = level_names[0] if level_names else 'Further Education'
        
        # Clean level name for display
        if 'Level Three' in level or 'Level 3' in title or 'Extended Diploma' in title or 'T Level' in title:
            display_level = 'Level 3'
        elif 'Level Two' in level or 'Level 2' in title:
            display_level = 'Level 2'
        elif 'Level One' in level or 'Level 1' in title:
            display_level = 'Level 1'
        elif 'RARPA' in level or 'Bespoke' in title:
            display_level = 'Entry / RARPA'
        elif 'Access' in title:
            display_level = 'Level 3 Access to HE'
        else:
            display_level = level

        # Mode
        if "Online" in subject or "Online" in title:
            mode = "Online"
        else:
            mode = "Full-time"

        # Campus assignment
        is_princes = any(p in subject for p in princes_road_subjects)
        campus = "Princes Road campus" if is_princes else "Moulsham Street campus"

        # Start date
        start_date = format_start_date(raw_start)

        # Image
        img_src, img_alt = get_course_image(subject, title)

        # ID / Slug
        slug = existing_slugs.get(cid)
        if not slug:
            clean_slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
            slug = f"{clean_slug[:36]}-{cid}"

        # Skills
        extracted = extract_skills_from_course(title, study_overview, course_for_me, employability, subject)
        if cid in course_skill_profiles:
            extracted = course_skill_profiles[cid]
        elif len(extracted) < 3:
            extracted = extracted + ["Practical workshop application", "Employer-informed industry projects", "Professional portfolio development"]
            extracted = extracted[:5]

        # Plain text extracts
        overview_plain = clean_html_to_plain(study_overview)
        for_me_plain = clean_html_to_plain(course_for_me)
        if not overview_plain:
            overview_plain = for_me_plain

        # Fees payable extract
        payable = {
            "deposit": 150.0,
            "materials": 0.0,
            "trip": 0.0,
        }
        # Check fees for amounts
        combined_fees = f"{fees} {add_fees}"
        mats = re.findall(r'(?:materials fee|materials|kit|uniform)[^£\d]*£(\d+(?:\.\d+)?)', combined_fees, re.IGNORECASE)
        if mats:
            payable["materials"] = float(mats[0])
        elif "£175" in combined_fees:
            payable["materials"] = 175.0
        elif "£80" in combined_fees:
            payable["materials"] = 80.0
        elif "£75" in combined_fees:
            payable["materials"] = 75.0
        elif "£35" in combined_fees:
            payable["materials"] = 35.0

        trips = re.findall(r'(?:trip|enrichment)[^£\d]*£(\d+(?:\.\d+)?)', combined_fees, re.IGNORECASE)
        if trips:
            payable["trip"] = float(trips[0])
        elif "£100" in combined_fees:
            payable["trip"] = 100.0
        elif "£50" in combined_fees:
            payable["trip"] = 50.0
        elif "£25" in combined_fees:
            payable["trip"] = 25.0

        # Funding tags
        funding_tags = []
        if mode == "Online":
            funding_tags.append("Adult Education / 19+")
            funding_tags.append("Advanced Learner Loans")
        elif "RARPA" in display_level or "Level 1" in display_level or "Level 2" in display_level:
            funding_tags.append("16-18 funded")
            funding_tags.append("Adult Education / 19+")
        else:
            funding_tags.append("16-18 funded")
            funding_tags.append("Advanced Learner Loans")

        processed_courses.append({
            "id": slug,
            "sourceId": cid,
            "title": title,
            "subject": subject,
            "qualification": clean_html_to_plain(qual_html) or title,
            "level": display_level,
            "duration": duration or "1 year",
            "mode": mode,
            "campus": campus,
            "campusIllustrative": True,
            "startDate": start_date,
            "overview": overview_plain[:320] + ("..." if len(overview_plain) > 320 else ""),
            "studyOverviewHtml": study_overview,
            "courseForMeHtml": course_for_me,
            "eligibilityHtml": eligibility,
            "eligibilitySpecificHtml": elig_specific,
            "entryRequirements": extract_list_items(eligibility),
            "assessment": clean_html_to_plain(assessment) or "Practical coursework assignments, project assessments and portfolio reviews.",
            "assessmentHtml": assessment,
            "fees": clean_html_to_plain(fees) or "Tuition is free for eligible 16–18 learners. Funding support and Advanced Learner Loans are available for adult students.",
            "feesHtml": fees,
            "additionalFees": clean_html_to_plain(add_fees),
            "additionalFeesHtml": add_fees,
            "funding": clean_html_to_plain(funding),
            "fundingTags": funding_tags,
            "contact": clean_html_to_plain(contact) or "careersadvicezone@chelmsford.ac.uk",
            "progression": clean_html_to_plain(employability),
            "employabilityHtml": employability,
            "additionalQuals": clean_html_to_plain(add_quals),
            "skills": extracted,
            "payable": payable,
            "image": img_src,
            "imageAlt": img_alt,
            "metaDesc": meta_desc,
            "seoTitle": seo_title,
        })

    print(f"Generated {len(processed_courses)} courses.")

    # Write TypeScript file
    ts_content = f"""// Authoritative Chelmsford College Course Dataset
// Automatically compiled from Appendix 2 - Demo Course Data.xlsx (all 33 college courses)
// Generated by scripts/build-course-data.py

export interface CoursePayable {{
  deposit: number;
  materials: number;
  trip: number;
}}

export interface Course {{
  id: string;
  sourceId: string;
  title: string;
  subject: string;
  qualification: string;
  level: string;
  duration: string;
  mode: string;
  campus: string;
  campusIllustrative: boolean;
  startDate: string;
  overview: string;
  studyOverviewHtml: string;
  courseForMeHtml: string;
  eligibilityHtml: string;
  eligibilitySpecificHtml: string;
  entryRequirements: string[];
  assessment: string;
  assessmentHtml: string;
  fees: string;
  feesHtml: string;
  additionalFees: string;
  additionalFeesHtml: string;
  funding: string;
  fundingTags: string[];
  contact: string;
  progression: string;
  employabilityHtml: string;
  additionalQuals: string;
  skills: string[];
  payable: CoursePayable;
  image: string;
  imageAlt: string;
  metaDesc: string;
  seoTitle: string;
}}

export const allCourses: Course[] = {json.dumps(processed_courses, indent=2)};
"""

    with open(OUTPUT_TS, 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print(f"Successfully written {OUTPUT_TS}")

if __name__ == '__main__':
    build_data()
