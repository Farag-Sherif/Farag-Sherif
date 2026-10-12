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
    role: "Front-End Developer",
    company: "Blue Brain Agency",
    type: "Part-Time",
    startDate: "Apr 2026",
    endDate: "Present",
    description:
      "Developed production-ready web applications using React.js and Next.js (App Router, Server Components). Built reusable, scalable UI component libraries with modern frontend architecture to improve maintainability. Integrated REST APIs with optimized rendering strategies, improved responsive behavior and frontend performance through lazy loading and code splitting, and implemented dynamic multilingual (Arabic/English) experiences with seamless RTL/LTR switching.",
    icon: "code",
  },
  {
    id: "puresoft",
    role: "Frontend Developer",
    company: "PureSoft",
    type: "Internship · On-Site",
    startDate: "Nov 2025",
    endDate: "Feb 2026",
    description:
      "Redesigned responsive interfaces and implemented robust Arabic/English RTL/LTR support across production applications. Architected optimized data flows by integrating complex RESTful APIs using Axios and Redux, and built performant front-end systems with React, Vite, and Next.js focusing on clean code and reduced load times.",
    icon: "code",
  },
  {
    id: "gdg",
    role: "Frontend Trainee",
    company: "Google Developer Groups (GDG) on CIC",
    type: "Training Program",
    startDate: "May 2025",
    endDate: "Sept 2025",
    description:
      "Completed an intensive frontend development training program focused on React.js and modern web practices. Built interactive web projects and gained hands-on experience with scalable component-based architecture.",
    icon: "code",
  },
  {
    id: "mufix",
    role: "PR Specialist",
    company: "MUFIX Community",
    type: "Community Role",
    startDate: "Jan 2023",
    endDate: "Sept 2026",
    description:
      "Led public relations efforts, managed community engagement, and coordinated technical events to foster growth and collaboration within the tech community.",
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
    title: "Modern Frontend Engineering",
    description:
      "Building fast, scalable, and multilingual (RTL/LTR) web applications using React.js, Next.js, TypeScript, Tailwind CSS, and Three.js.",
    icon: "code",
  },
  {
    id: "uiux",
    title: "UI/UX & Design Systems",
    description:
      "Crafting intuitive interfaces, interactive 3D experiences, and reusable component architectures that elevate user engagement.",
    icon: "design",
  },
  {
    id: "pm",
    title: "API Integration & Performance",
    description:
      "Architecting state management with Redux & React Query, RESTful API integration, code splitting, and performance optimization.",
    icon: "management",
  },
];
