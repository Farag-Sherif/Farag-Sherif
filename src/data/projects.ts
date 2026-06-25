export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  category: 'react' | 'fullstack' | 'frontend';
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "Invitations",
    title: "Invitations",
    description:
      "Built a comprehensive bilingual (Arabic/English) wedding invitation platform featuring an advanced dashboard for complete invitation management. Users can customize invitation themes, cover images, event information, background music, comments, gallery images, locations, and guest details through an intuitive interface. Implemented dynamic real-time preview functionality, enabling users to instantly review invitation changes before publishing. Designed a fully responsive experience optimized for mobile and desktop devices.",
    image: "/images/projects/11.png",
    techStack: [
      "React JS",
      "Tailwind CSS",
      "JavaScript",
      "Axios",
      "REST API",
      "i18n",
      "Responsive Design",
      "Dashboard Development",
      "State Management",
      "Dynamic Forms",
      "Real-Time Preview",
    ],
    liveUrl: "https://invaite.test.do-go.net/en/pricing",
    githubUrl: "",
    category: "react",
    featured: true,
  },
  {
    id: "BlueBrain",
    title: "Blue Brain",
    description:
      "Developed a responsive bilingual (English/Arabic) web application for Blue Brain Agency using React and Tailwind CSS. Integrated a custom REST API with Axios for dynamic content rendering and implemented seamless RTL/LTR language switching for an enhanced multilingual user experience.",
    image: "/images/projects/10.png",
    techStack: [
      "React JS",
      "Tailwind CSS",
      "Axios",
      "REST API",
      "i18n",
      "JavaScript",
      "Responsive Design",
    ],
    liveUrl: "https://bluebrain-co.com/",
    githubUrl: "",
    category: "react",
    featured: true,
  },
  {
    id: "Seada",
    title: "Seada",
    description:
      "Migrated and upgraded the Seada website from Next.js to React (Vite), transforming it from an e-commerce platform into a modern corporate landing page. Built a premium responsive experience with dynamic bilingual support, smooth animations, and optimized performance across all devices.",
    image: "/images/projects/9.png",
    techStack: [
      "React",
      "Vite",
      "Bootstrap",
      "SCSS",
      "i18next",
      "Responsive Design",
      "CSS Animations",
      "Multilingual",
    ],
    liveUrl: "https://seada.test.do-go.net/",
    githubUrl: "",
    category: "react",
    featured: true,
  },
  {
    id: "ElOmdaa",
    title: "El Omdaa",
    description:
      "Developed a responsive bilingual e-commerce platform using React.js and Redux. Implemented dynamic shipping cost calculations, persistent address management, real-time cart synchronization with the server, and a high-priority notification system to improve the overall shopping experience.",
    image: "/images/projects/8.png",
    techStack: [
      "React JS",
      "Redux",
      "SCSS",
      "Bootstrap",
      "Axios",
      "JavaScript",
      "REST API",
      "i18n",
      "Responsive Design",
    ],
    liveUrl: "https://omdacoffee.com/",
    githubUrl: "",
    category: "react",
    featured: true,
  },
  {
    id: "ayat",
    title: "Ayat",
    description:
      "Built an Islamic learning platform showcasing Quran recitations by esteemed sheikhs, an extensive collection of religious texts, daily Dhikr prompts. It provides interactive Quran study with word-by-word explanations, precise prayer timings with countdowns, and a memorization feature for efficient, structured learning.",
    image: "/images/projects/4.png",
    techStack: [
      "React JS",
      "Tailwind",
      "JavaScript",
      "API",
      "Responsive Design",
    ],
    liveUrl: "https://ayat-website.netlify.app/",
    githubUrl: "https://github.com/Farag-Sherif/Ayat-Website.git",
    category: "react",
    featured: true,
  },
  {
    id: "doctors",
    title: "Doctors Website",
    description:
      "Developed a responsive and modern doctors appointment platform using React.js, Vite, and Tailwind CSS. Users can browse doctors by specialization, view contact details, and book appointments online. The platform also provides search functionality for pharmacies, laboratories, and radiology centers.",
    image: "/images/projects/7.png",
    techStack: [
      "React JS",
      "Tailwind CSS",
      "Vite",
      "JavaScript",
      "Responsive Design",
    ],
    liveUrl: "",
    githubUrl: "",
    category: "react",
    featured: true,
  },
  {
    id: "movie",
    title: "Movie & TV Show Platform",
    description:
      "Developed a dynamic movie and TV show platform using React.js, leveraging TMDb API for real-time content updates. The platform offers a sleek, responsive interface with browse, search, and filter capabilities. Includes secure user authentication and personalized watchlists.",
    image: "/images/projects/3.png",
    techStack: [
      "React JS",
      "JavaScript",
      "API",
      "Authentication",
      "Responsive Design",
    ],
    liveUrl: "https://movie-project-react-js.netlify.app/",
    githubUrl: "https://github.com/Farag-Sherif/Movie-Project.git",
    category: "react",
    featured: true,
  },
  {
    id: "aqar",
    title: "AQAR",
    description:
      "Collaborated with a team to develop a real estate platform showcasing premium villas and apartments, featuring detailed property listings and responsive design. Includes a secure login system, smooth navigation, and an advanced admin dashboard for managing bookings and properties.",
    image: "/images/projects/6.png",
    techStack: ["React JS", "Bootstrap", "JavaScript", "API", "Authentication"],
    liveUrl: "https://mohamedabuzahda.github.io/Real-State/",
    githubUrl: "https://github.com/mohamedabuzahda/Real-State.git",
    category: "fullstack",
    featured: true,
  },
  {
    id: "bookstore",
    title: "Book Store",
    description:
      "Developed an eCommerce bookstore platform using React.js, delivering a seamless user experience with intuitive book browsing, user authentication, dynamic shopping cart, and a comprehensive admin dashboard for efficient management of inventory, orders, and user data.",
    image: "/images/projects/2.png",
    techStack: [
      "React JS",
      "JavaScript",
      "API",
      "Authentication",
      "Responsive Design",
    ],
    liveUrl: "https://github.com/Farag-Sherif/Book-Store-React-JS",
    githubUrl: "https://github.com/Farag-Sherif/Book-Store-React-JS.git",
    category: "fullstack",
    featured: false,
  },
  {
    id: "bloodbank",
    title: "Blood Bank",
    description:
      "Developed a blood donation platform connecting donors with blood banks, featuring real-time blood needs updates and location-based bank searches. The site offers a user-friendly interface, seamless navigation, and secure data handling for accessibility and efficiency.",
    image: "/images/projects/1.png",
    techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    liveUrl: "https://farag-sherif.github.io/Blood-Bank/",
    githubUrl: "https://github.com/Farag-Sherif/Blood-Bank.git",
    category: "frontend",
    featured: false,
  },
  {
    id: "egypt",
    title: "It is Egypt",
    description:
      "Developed an interactive travel website showcasing Egypt's beauty and culture, featuring detailed information about landmarks, traditional cuisine, and integrated videos for each attraction. Implements responsive design and smooth navigation for an engaging user experience.",
    image: "/images/projects/5.png",
    techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    liveUrl: "https://farag-sherif.github.io/it-is-Egypt/",
    githubUrl: "https://github.com/Farag-Sherif/it-is-Egypt.git",
    category: "frontend",
    featured: false,
  },
];

export const projectCategories = [
  { key: 'all', label: 'All Projects' },
  { key: 'react', label: 'React' },
  { key: 'fullstack', label: 'Full-Stack' },
  { key: 'frontend', label: 'Frontend' },
] as const;
