export type Course = {
  id: string;
  title: string;
  subject: string;
  qualification: string;
  level: string;
  duration: string;
  mode: string;
  campus: string;
  startDate: string;
  overview: string;
  entryRequirements?: string[];
  modules?: string[];
  assessment?: string;
  fees?: string;
  progression?: string;
  image: string;
  imageAlt: string;
};

// Course records structured around the college SQL dataset and tender specification.
export const courses: Course[] = [
  {
    id: "fashion-l3",
    title: "UAL Level 3 Diploma and Extended Diploma in Creative Practice: Fashion",
    subject: "Fashion",
    qualification: "UAL Level 3 Diploma and Extended Diploma in Creative Practice",
    level: "Level 3",
    duration: "2 years",
    mode: "Full-time",
    campus: "Moulsham Street campus",
    startDate: "September 2026",
    overview:
      "This practical, studio-based qualification gives you the creative foundation and technical skills to explore fashion design, garment construction, pattern drafting, and trend forecasting. You’ll work with specialist equipment in our dedicated fashion studios and build an industry-standard portfolio.",
    entryRequirements: [
      "4 GCSEs at grade 4/C or above, including English Language and an Art or Design subject.",
      "A portfolio of creative work demonstrated during a friendly college discussion.",
    ],
    modules: [
      "Visual research and creative methods in fashion",
      "Pattern drafting, grading and garment construction",
      "Textile experimentation, print and surface embellishment",
      "Fashion styling, visual communication and digital presentation",
      "Final major self-directed project and public fashion showcase",
    ],
    assessment:
      "100% practical coursework assignments, project sketchbooks, finished garments, and a final externally moderated synoptic project.",
    fees:
      "Fully funded for students aged 16–18 on 31 August of their enrolling year. For learners aged 19+, Advanced Learner Loans and fee remissions may apply.",
    progression:
      "Progress to university degrees in Fashion Design, Fashion Marketing, or Contour Fashion, or enter creative apprenticeships and junior design atelier roles.",
    image: "/images/fashion-studio.jpg",
    imageAlt: "A student and tutor working together in a practical college technical workshop.",
  },
  {
    id: "travel-tourism-l2",
    title: "NCFE Diploma in Travel and Tourism, Level 2",
    subject: "Travel and Tourism",
    qualification: "NCFE Diploma in Travel and Tourism",
    level: "Level 2",
    duration: "1 year",
    mode: "Full-time",
    campus: "Moulsham Street campus",
    startDate: "September 2026",
    overview:
      "Develop the essential professional knowledge and customer-facing skills required across the dynamic travel, airline, and holiday sectors. Gain insights into customer service excellence, UK and worldwide destinations, airport operations, and guided tour planning.",
    entryRequirements: [
      "3 GCSEs at grade 3/D or above, or an equivalent Level 1 vocational qualification.",
      "A genuine passion for working with people and exploring worldwide tourism.",
    ],
    modules: [
      "Customer service in travel and tourism",
      "The UK travel industry and major transport hubs",
      "European and worldwide holiday destinations",
      "Airport ground operations and cabin crew introduction",
      "Organising and delivering educational visitor events",
    ],
    assessment:
      "Internal continuous assessment including coursework reports, customer-service roleplay, presentations, and a practical synoptic assignment.",
    fees:
      "Free for eligible 16–18 year olds. 19+ learners may qualify for fee remission depending on personal circumstances.",
    progression:
      "Progress directly to Level 3 Travel and Tourism, Aviation Operations, or enter entry-level customer service roles with airlines, travel agencies, and resorts.",
    image: "/images/student-library.jpg",
    imageAlt: "A student celebrating their award and certificate with tutors at Chelmsford College.",
  },
  {
    id: "graphic-design-l3",
    title: "UAL Level 3 Diploma and Extended Diploma in Creative Practice: Graphic Design",
    subject: "Graphic Design",
    qualification: "UAL Level 3 Diploma and Extended Diploma in Creative Practice",
    level: "Level 3",
    duration: "2 years",
    mode: "Full-time",
    campus: "Moulsham Street campus",
    startDate: "September 2026",
    overview:
      "Immerse yourself in graphic communication, typography, branding, motion design, and editorial layout. Working in Mac studios equipped with industry-standard software, you’ll tackle live client briefs and graduate with a professional design portfolio.",
    entryRequirements: [
      "4 GCSEs at grade 4/C or above, including English Language and a creative/visual subject.",
      "A creative portfolio showing sketches, digital design, or visual ideas.",
    ],
    modules: [
      "Visual problem-solving and conceptual ideation",
      "Typography, editorial layout and publishing systems",
      "Brand identity development and campaign design",
      "Digital illustration and motion graphics (Adobe Creative Suite)",
      "Industry portfolio preparation and end-of-year public exhibition",
    ],
    assessment:
      "Practical design projects, digital portfolios, sketchbook reviews, and an end-of-year final major project assessed by UAL Awarding Body standards.",
    fees:
      "Free for students aged 16–18. Funding advice and Advanced Learner Loans are available for adult learners (19+).",
    progression:
      "Progression to BA (Hons) degrees in Graphic Design, Illustration, Animation, or junior design agency roles and creative apprenticeships.",
    image: "/images/creative-classroom.jpg",
    imageAlt: "Students collaborating with a laptop in a modern digital classroom space.",
  },
  {
    id: "beauty-therapy-l3",
    title: "VTCT Diploma in Beauty Therapy, Level 3",
    subject: "Beauty Therapy",
    qualification: "VTCT Diploma in Beauty Therapy",
    level: "Level 3",
    duration: "1 year",
    mode: "Full-time",
    campus: "Moulsham Street campus",
    startDate: "September 2026",
    overview:
      "Advance your therapy expertise with high-level aesthetic and wellbeing treatments in our commercial salon, The Hub. Master body massage, facial electrotherapy, hot stone therapy, and modern spa treatment protocols working on paying clients.",
    entryRequirements: [
      "A recognized Level 2 qualification in Beauty Therapy.",
      "Professional interpersonal skills and an enthusiasm for hands-on therapy treatments.",
    ],
    modules: [
      "Body massage and neuromuscular treatment techniques",
      "Facial electrotherapy treatment systems",
      "Body electrical treatments and silhouette enhancement",
      "Salon health, safety and operational management",
      "Client consultation, skin diagnosis and bespoke therapy planning",
    ],
    assessment:
      "Practical assessments carried out on live clients in the college's commercial salon, written unit evidence, and end-of-unit online exams.",
    fees:
      "Tuition is free for eligible 16–18 learners. Salon uniform and specialist kit costs apply; bursary support is available for eligible students.",
    progression:
      "Work as a senior beauty therapist, cruise ship spa practitioner, aesthetician, or progress into salon management and Level 4 Advanced Aesthetics.",
    image: "/images/campus-learning.jpg",
    imageAlt: "A tutor guiding a student during a practical hair and beauty styling session.",
  },
  {
    id: "digital-it-l2",
    title: "Gateway Diploma in Digital and IT Skills, Level 2",
    subject: "Digital and IT",
    qualification: "Gateway Diploma in Digital and IT Skills",
    level: "Level 2",
    duration: "1 year",
    mode: "Full-time",
    campus: "Moulsham Street campus",
    startDate: "September 2026",
    overview:
      "Build a versatile technical skillset spanning software fundamentals, responsive web development, cyber hygiene, and database design. This practical course provides hands-on computer lab experience preparing you for advanced technical study.",
    entryRequirements: [
      "3 GCSEs at grade 3/D or above, including Mathematics and English.",
      "An interest in technology, problem-solving, and digital creation.",
    ],
    modules: [
      "Computer hardware architectures and system maintenance",
      "Web design and responsive frontend development",
      "Introductory software programming logic and algorithms",
      "Cybersecurity fundamentals and data protection protocols",
      "Database design and spreadsheet data analysis",
    ],
    assessment:
      "Project-based technical assignments, lab practicals, portfolio tasks, and a synoptic computing challenge.",
    fees:
      "Free for students aged 16–18. Low-income fee remission available for learners 19+.",
    progression:
      "Progression to Level 3 T Levels in Digital Support / Software Development, or entry into IT helpdesk apprenticeships.",
    image: "/images/creative-classroom.jpg",
    imageAlt: "Students working together on digital projects around a laptop.",
  },
];

export const campuses = [
  { name: "Moulsham Street campus", address: "Moulsham Street, Chelmsford CM2 0JQ" },
  { name: "Princes Road campus", address: "Princes Road, Chelmsford CM2 9DX" },
];

export const subjectAreas = [
  { name: "Fashion", label: "Design, make, create", image: "/images/fashion-studio.jpg" },
  { name: "Graphic Design", label: "Ideas into visuals", image: "/images/creative-classroom.jpg" },
  { name: "Digital and IT", label: "Skills for a changing world", image: "/images/creative-classroom.jpg" },
  { name: "Beauty Therapy", label: "Learn through practice", image: "/images/campus-learning.jpg" },
  { name: "Travel and Tourism", label: "See the world differently", image: "/images/student-library.jpg" },
];

export type Presentation = { department: string; times: string[] };

export const showcaseEvent = {
  slug: "showcase-open-evening",
  title: "Showcase Open Evening",
  date: "2026-11-04",
  dateLabel: "Wednesday 4 November 2026",
  time: "6:00 PM – 8:30 PM",
  location: "Moulsham Street campus",
  type: "Open evening",
  image: "/images/students-collaborating.jpg",
  imageAlt: "Chelmsford College students laughing and chatting together on campus wearing college lanyards.",
  description:
    "The Showcase event is an excellent opportunity to see what Chelmsford College is like. Visit the various departments, check out the campus and talk to the tutors who could be working with you next year. With our leisure centre recently refurbished, you will also have the chance to tour the facilities as well talk to staff about careers, SEND support and student support (including travel & finance).",
  presentations: [
    { department: "Apprenticeships", times: ["6:30 PM", "7:00 PM", "7:30 PM"] },
    { department: "Electrical", times: [] },
    { department: "Football Academy", times: ["6:30 PM Boys Academy", "7:00 PM Girls Academy"] },
    { department: "Higher Qualifications", times: ["7:00 PM"] },
    { department: "Performing Arts", times: ["6:45 PM", "7:15 PM", "7:45 PM"] },
    { department: "SEND Support", times: ["6:15 PM", "6:45 PM", "7:15 PM", "7:45 PM"] },
    { department: "T Levels", times: ["6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM"] },
    { department: "Uniformed Services", times: [] },
  ] satisfies Presentation[],
  parking:
    "Parking is available at both campuses but is limited. Street parking is available, subject to residential parking restrictions.",
  contact: {
    name: "Careers Advice Zone",
    phone: "01245 29 30 31",
    email: "careersadvicezone@chelmsford.ac.uk",
  },
};

export const collegeEvents = [
  showcaseEvent,
  {
    slug: "discovery-morning",
    title: "Apprenticeships & Technical Skills Discovery Morning",
    date: "2026-11-21",
    dateLabel: "Saturday 21 November 2026",
    time: "10:00 AM – 1:00 PM",
    location: "Princes Road campus",
    type: "Workshop",
    image: "/images/campus-learning.jpg",
    imageAlt: "Chelmsford College students and staff in technical training facilities.",
    description:
      "Explore apprenticeships, construction, electrical and automotive technical training facilities at our Princes Road campus. Meet employers, current apprentices and course tutors.",
    presentations: [
      { department: "Apprenticeship Hub", times: ["10:30 AM", "11:30 AM"] },
      { department: "Construction & Engineering", times: ["11:00 AM", "12:00 PM"] },
      { department: "Automotive Technologies", times: ["10:45 AM", "11:45 AM"] },
    ] satisfies Presentation[],
    parking: "Free visitor parking available on site at Princes Road campus.",
    contact: {
      name: "Apprenticeship Admissions",
      phone: "01245 29 30 31",
      email: "apprenticeships@chelmsford.ac.uk",
    },
  },
];

export function eventBySlug(slug: string) {
  return collegeEvents.find((event) => event.slug === slug);
}

export const photographyNote =
  "Official photography featuring Chelmsford College students, tutors, practical workshops and achievement celebrations.";

export function courseById(id: string) {
  return courses.find((course) => course.id === id);
}
