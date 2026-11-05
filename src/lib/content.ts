import { allCourses, type Course, type CoursePayable } from "./courses-data";

export type { Course, CoursePayable };

// All 33 college courses mapped directly from Appendix 2 - Demo Course Data.xlsx
export const courses: Course[] = allCourses;

export const campuses = [
  { name: "Moulsham Street campus", address: "Moulsham Street, Chelmsford CM2 0JQ" },
  { name: "Princes Road campus", address: "Princes Road, Chelmsford CM2 9DX" },
];

export interface SubjectArea {
  name: string;
  label: string;
  image: string;
  count: number;
}

// Complete subject areas dynamically mapped from the 33 college courses
export const subjectAreas: SubjectArea[] = [
  { name: "Creative Industries", label: "Fashion, Graphics, Media & Art", image: "/images/fashion-studio.jpg", count: 7 },
  { name: "Business", label: "Enterprise, T Levels & Legal Services", image: "/images/students-collaborating.jpg", count: 4 },
  { name: "Construction", label: "Plumbing, Carpentry & Painting", image: "/images/practical-workshop.jpg", count: 3 },
  { name: "ICT & Digital Skills", label: "Software, Web & Computing", image: "/images/digital-collaboration.jpg", count: 2 },
  { name: "Hair & Beauty", label: "Hairdressing & Beauty Therapy", image: "/images/beauty-therapy-salon.jpg", count: 2 },
  { name: "Uniformed Services", label: "Public Services & Entry Preparation", image: "/images/hero-students.jpg", count: 2 },
  { name: "Childcare", label: "Early Years & Young People's Settings", image: "/images/campus-learning.jpg", count: 2 },
  { name: "Performing Arts", label: "Acting, Theatre & Production Arts", image: "/images/creative-classroom.jpg", count: 2 },
  { name: "Travel & Tourism", label: "Aviation, Hospitality & World Travel", image: "/images/student-library.jpg", count: 1 },
  { name: "Catering", label: "Professional Cookery & Culinary Arts", image: "/images/campus-learning.jpg", count: 1 },
  { name: "Electrical Installation", label: "Domestic & Commercial Systems", image: "/images/practical-workshop.jpg", count: 1 },
  { name: "Engineering", label: "Engineering Technologies & CAD", image: "/images/practical-workshop.jpg", count: 1 },
  { name: "Health & Social Care", label: "Occupational Entry in Social Care", image: "/images/campus-learning.jpg", count: 1 },
  { name: "Science", label: "Forensic & Criminal Investigation", image: "/images/student-library.jpg", count: 1 },
  { name: "Sport", label: "Performance, Fitness & Football Academy", image: "/images/hero-students.jpg", count: 1 },
  { name: "Access to HE Diplomas (Studied Online)", label: "Flexible Health Professions Pathway", image: "/images/digital-collaboration.jpg", count: 1 },
  { name: "Foundation Provision", label: "Life Skills & Independence Pathway", image: "/images/campus-learning.jpg", count: 1 },
  { name: "Bespoke Provision", label: "RARPA Individualised Learning", image: "/images/campus-learning.jpg", count: 1 },
];

export interface PresentationScheduleRow {
  department: string;
  moulshamTimes: string[];
  princesRoadTimes: string[];
  note?: string;
}

export interface CollegeEvent {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  time: string;
  location: string;
  campusFilter: "Moulsham Street" | "Princes Road" | "Both campuses";
  type: "Open evening" | "Workshop" | "Information session" | "Taster day";
  isPastEvent: boolean;
  isSample: boolean;
  sampleBadge?: string;
  image: string;
  imageAlt: string;
  description: string;
  scheduleRows: PresentationScheduleRow[];
  parking: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
}

// Authoritative Showcase Open Evening event per Demo Event .docx
export const showcaseEvent: CollegeEvent = {
  slug: "showcase-open-evening",
  title: "Showcase Open Evening",
  date: "2026-11-04",
  dateLabel: "Wednesday 4 November 2026",
  time: "6:00 PM – 8:30 PM",
  location: "Moulsham Street & Princes Road campuses",
  campusFilter: "Both campuses",
  type: "Open evening",
  isPastEvent: true,
  isSample: false,
  image: "/images/students-collaborating.jpg",
  imageAlt: "Chelmsford College students laughing and chatting together on campus wearing college lanyards.",
  description:
    "The Showcase event is an excellent opportunity to see what Chelmsford College is like. Visit the various departments, check out the campus and talk to the tutors who could be working with you next year. With our leisure centre recently refurbished, you will also have the chance to tour the facilities as well talk to staff about careers, SEND support and student support (including travel & finance). Your booked time represents the time you can arrive at the building. You can stay as long as you like and visit as many departments as you're interested in.",
  scheduleRows: [
    {
      department: "Apprenticeships",
      moulshamTimes: ["6:30 PM", "7:00 PM", "7:30 PM"],
      princesRoadTimes: ["6:30 PM", "7:00 PM", "7:30 PM"],
    },
    {
      department: "Electrical",
      moulshamTimes: [],
      princesRoadTimes: ["6:15 PM", "6:45 PM", "7:15 PM", "7:45 PM"],
      note: "Princes Road technical workshops",
    },
    {
      department: "Football Academy",
      moulshamTimes: ["6:30 PM (Boys Academy)", "7:00 PM (Girls Academy)"],
      princesRoadTimes: [],
    },
    {
      department: "Higher Qualifications",
      moulshamTimes: ["7:00 PM"],
      princesRoadTimes: ["7:00 PM"],
    },
    {
      department: "Performing Arts",
      moulshamTimes: ["6:45 PM", "7:15 PM", "7:45 PM"],
      princesRoadTimes: [],
    },
    {
      department: "SEND Support Transition to College, Stakeholders & Inclusion Partners",
      moulshamTimes: ["6:15 PM", "6:45 PM", "7:15 PM", "7:45 PM"],
      princesRoadTimes: ["6:15 PM", "6:45 PM", "7:15 PM", "7:45 PM"],
    },
    {
      department: "T Levels",
      moulshamTimes: ["6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM (All other T Levels)"],
      princesRoadTimes: ["6:30 PM", "7:30 PM (Construction & Engineering T Levels)"],
    },
    {
      department: "Uniformed Services",
      moulshamTimes: [],
      princesRoadTimes: ["6:15 PM", "6:45 PM", "7:15 PM", "7:45 PM"],
      note: "Princes Road specialist training wing",
    },
  ],
  parking:
    "Parking is available at both campuses however, it is limited. Street parking is available but please make sure you check you are not parking in a resident only zone.",
  contact: {
    name: "College Careers Advice Zone",
    phone: "01245 29 30 31",
    email: "careersadvicezone@chelmsford.ac.uk",
  },
};

// Additional sample events (clearly labelled as samples for prototype evaluation)
export const collegeEvents: CollegeEvent[] = [
  showcaseEvent,
  {
    slug: "discovery-morning",
    title: "Apprenticeships & Technical Skills Discovery Morning",
    date: "2026-11-21",
    dateLabel: "Saturday 21 November 2026",
    time: "10:00 AM – 1:00 PM",
    location: "Princes Road campus",
    campusFilter: "Princes Road",
    type: "Workshop",
    isPastEvent: false,
    isSample: true,
    sampleBadge: "Sample event · Illustrative",
    image: "/images/practical-workshop.jpg",
    imageAlt: "Chelmsford College students and staff in technical training facilities at Princes Road.",
    description:
      "Explore apprenticeships, construction, electrical installations, engineering and motor vehicle technical facilities at our dedicated Princes Road campus. Meet local employers, current apprentices and course tutors.",
    scheduleRows: [
      {
        department: "Apprenticeship Hub & Employer Match",
        moulshamTimes: [],
        princesRoadTimes: ["10:30 AM", "11:30 AM", "12:30 PM"],
      },
      {
        department: "Construction & Engineering T Levels",
        moulshamTimes: [],
        princesRoadTimes: ["11:00 AM", "12:00 PM"],
      },
      {
        department: "Electrical Installations Workshop Tour",
        moulshamTimes: [],
        princesRoadTimes: ["10:45 AM", "11:45 AM"],
      },
    ],
    parking: "Free visitor parking available on site at Princes Road campus.",
    contact: {
      name: "Apprenticeship Admissions",
      phone: "01245 29 30 31",
      email: "apprenticeships@chelmsford.ac.uk",
    },
  },
  {
    slug: "creative-arts-media-workshop",
    title: "Creative Arts, Fashion & Media Portfolio Masterclass",
    date: "2026-12-05",
    dateLabel: "Saturday 5 December 2026",
    time: "10:30 AM – 1:30 PM",
    location: "Moulsham Street campus",
    campusFilter: "Moulsham Street",
    type: "Workshop",
    isPastEvent: false,
    isSample: true,
    sampleBadge: "Sample event · Illustrative",
    image: "/images/fashion-studio.jpg",
    imageAlt: "Students working on creative garments and sketchbooks in the college fashion atelier.",
    description:
      "A hands-on creative workshop for aspiring fashion, graphic design, animation and media students. Bring your sketchbooks, digital work or creative ideas for 1-to-1 tutor advice on building an interview-winning portfolio.",
    scheduleRows: [
      {
        department: "Fashion & Textile Design Studio Tour",
        moulshamTimes: ["10:45 AM", "11:45 AM"],
        princesRoadTimes: [],
      },
      {
        department: "Graphic Design & Adobe Masterclass",
        moulshamTimes: ["11:15 AM", "12:15 PM"],
        princesRoadTimes: [],
      },
      {
        department: "Media, Film & Animation Studios",
        moulshamTimes: ["11:00 AM", "12:30 PM"],
        princesRoadTimes: [],
      },
    ],
    parking: "Limited parking on site at Moulsham Street campus. Nearby pay-and-display parking available.",
    contact: {
      name: "Creative Arts Admissions",
      phone: "01245 29 30 31",
      email: "information@chelmsford.ac.uk",
    },
  },
  {
    slug: "adult-learners-he-session",
    title: "Adult Learners & Higher Education Information Evening",
    date: "2026-12-15",
    dateLabel: "Tuesday 15 December 2026",
    time: "5:30 PM – 7:30 PM",
    location: "Moulsham Street campus",
    campusFilter: "Moulsham Street",
    type: "Information session",
    isPastEvent: false,
    isSample: true,
    sampleBadge: "Sample event · Illustrative",
    image: "/images/campus-learning.jpg",
    imageAlt: "Adult learners discussing higher education courses in a seminar space.",
    description:
      "Tailored for adults (19+) looking to retrain, gain qualifications for university through Access to HE Diplomas (studied online or flexible), or explore fee remissions and Advanced Learner Loans.",
    scheduleRows: [
      {
        department: "Access to Higher Education (Health & Nursing)",
        moulshamTimes: ["5:45 PM", "6:45 PM"],
        princesRoadTimes: [],
      },
      {
        department: "Adult Funding, Fees & Learner Loans Guidance",
        moulshamTimes: ["6:00 PM", "7:00 PM"],
        princesRoadTimes: [],
      },
      {
        department: "Free Level 3 Entitlement & Digital Skills",
        moulshamTimes: ["6:15 PM"],
        princesRoadTimes: [],
      },
    ],
    parking: "Free evening parking available in the main Moulsham Street campus car park.",
    contact: {
      name: "Adult Education Guidance",
      phone: "01245 29 30 31",
      email: "careersadvicezone@chelmsford.ac.uk",
    },
  },
  {
    slug: "construction-trades-taster",
    title: "Construction, Electrical & Engineering Taster Day",
    date: "2027-01-16",
    dateLabel: "Saturday 16 January 2027",
    time: "9:30 AM – 12:30 PM",
    location: "Princes Road campus",
    campusFilter: "Princes Road",
    type: "Taster day",
    isPastEvent: false,
    isSample: true,
    sampleBadge: "Sample event · Illustrative",
    image: "/images/practical-workshop.jpg",
    imageAlt: "Students working with construction materials and electrical wiring rigs in technical workshops.",
    description:
      "Get practical workshop experience in carpentry, plumbing, electrical installations, brickwork, and engineering. Try your hand at real trade tasks guided by expert industry tradespeople.",
    scheduleRows: [
      {
        department: "Electrical Installation Rig Demonstrations",
        moulshamTimes: [],
        princesRoadTimes: ["9:45 AM", "10:45 AM", "11:45 AM"],
      },
      {
        department: "Carpentry & Joinery Practical Tasters",
        moulshamTimes: [],
        princesRoadTimes: ["10:00 AM", "11:00 AM", "12:00 PM"],
      },
      {
        department: "Plumbing Systems & Science Workshops",
        moulshamTimes: [],
        princesRoadTimes: ["10:15 AM", "11:15 AM"],
      },
    ],
    parking: "Free on-site visitor parking at Princes Road campus.",
    contact: {
      name: "Construction & Trades Admissions",
      phone: "01245 29 30 31",
      email: "information@chelmsford.ac.uk",
    },
  },
];

export function eventBySlug(slug: string) {
  return collegeEvents.find((event) => event.slug === slug);
}

export const photographyNote =
  "Official photography featuring Chelmsford College students, tutors, practical workshops and achievement celebrations.";

export function courseById(id: string) {
  return courses.find((course) => course.id === id || course.sourceId === id);
}
