export type Course = {
  id: string;
  title: string;
  subject: string;
  qualification: string;
  level: string;
  duration: string;
  mode: string;
  image: string;
  imageAlt: string;
};

// The source repository contained no course export. These are the five records
// and only the attributes explicitly provided in the project brief.
export const courses: Course[] = [
  {
    id: "fashion-l3",
    title: "UAL Level 3 Diploma and Extended Diploma in Creative Practice: Fashion",
    subject: "Fashion",
    qualification: "UAL Level 3 Diploma and Extended Diploma in Creative Practice",
    level: "Level 3",
    duration: "2 years",
    mode: "Full-time",
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
    image: "/images/creative-classroom.jpg",
    imageAlt: "Students working together on digital projects around a laptop.",
  },
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

export const photographyNote =
  "Official photography featuring Chelmsford College students, tutors, practical workshops and achievement celebrations.";

export function courseById(id: string) {
  return courses.find((course) => course.id === id);
}
