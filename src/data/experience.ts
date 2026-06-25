export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string;
  startDate: string;
  endDate: string;
  description: string;
  icon: "code" | "users" | "tasks";
}

export const experiences: Experience[] = [
  {
    id: "bluebrain",
    role: "Part-Time Front-End Developer",
    company: "Blue Brain",
    type: "Part-Time",
    startDate: "Apr 2026",
    endDate: "Present",
    description:
      "Worked on developing and modernizing client web applications using React and modern frontend technologies. Enhanced UI/UX, implemented multilingual Arabic/English support with seamless RTL/LTR switching, integrated REST APIs, improved responsiveness and performance, and delivered scalable, production-ready solutions for real-world business requirements.",
    icon: "briefcase",
  },
  {
    id: "puresoft",
    role: "Frontend Developer",
    company: "PureSoft",
    type: "Internship (On Site)",
    startDate: "Nov 2025",
    endDate: "Feb 2026",
    description:
      "Developed responsive web applications using modern frontend technologies. Collaborated with the team to deliver high-quality solutions on time.",
    icon: "code",
  },
  {
    id: "gdg",
    role: "Frontend Developer",
    company: "Google Developer Groups (GDG) on CIC",
    type: "Internship",
    startDate: "May 2025",
    endDate: "Sept 2025",
    description:
      "Built interactive web experiences and contributed to community-driven projects. Enhanced skills in React.js and modern development practices.",
    icon: "code",
  },
  {
    id: "mufix",
    role: "PR Specialist",
    company: "MUFIX Community",
    type: "Full Time",
    startDate: "Jan 2023",
    endDate: "Present",
    description:
      "Led public relations efforts, managed community engagement, and coordinated events to foster growth and collaboration within the tech community.",
    icon: "users",
  },
];

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: "code" | "design" | "management";
}

export const services: Service[] = [
  {
    id: "webdev",
    title: "Web Development",
    description:
      "Creating responsive and visually appealing websites using modern web technologies.",
    icon: "code",
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    description:
      "Designing user interfaces and experiences that are intuitive and engaging.",
    icon: "design",
  },
  {
    id: "pm",
    title: "Project Management",
    description:
      "Leading and coordinating projects to ensure timely delivery and quality outcomes.",
    icon: "management",
  },
];
