import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiReactquery,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiThreedotjs,
  SiGit,
  SiGithub,
  SiFigma,
  SiPostman,
  SiVite,
  SiCplusplus,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import type { IconType } from 'react-icons';

export interface Skill {
  name: string;
  icon: IconType;
  category: 'frontend' | 'styling' | 'tools' | 'languages';
  proficiency: number; // 0-100
  color: string;
}

export const skills: Skill[] = [
  { name: 'React.js', icon: SiReact, category: 'frontend', proficiency: 92, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, category: 'frontend', proficiency: 82, color: '#F8FAFC' },
  { name: 'TypeScript', icon: SiTypescript, category: 'frontend', proficiency: 86, color: '#38BDF8' },
  { name: 'JavaScript (ES6+)', icon: SiJavascript, category: 'frontend', proficiency: 92, color: '#FACC15' },
  { name: 'Redux Toolkit', icon: SiRedux, category: 'frontend', proficiency: 85, color: '#F97316' },
  { name: 'React Query', icon: SiReactquery, category: 'frontend', proficiency: 84, color: '#EF4444' },
  { name: 'HTML5', icon: SiHtml5, category: 'frontend', proficiency: 95, color: '#F97316' },
  { name: 'CSS3', icon: SiCss, category: 'frontend', proficiency: 92, color: '#38BDF8' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'styling', proficiency: 94, color: '#38BDF8' },
  { name: 'Three.js', icon: SiThreedotjs, category: 'styling', proficiency: 78, color: '#FACC15' },
  { name: 'Bootstrap', icon: SiBootstrap, category: 'styling', proficiency: 88, color: '#F97316' },
  { name: 'SCSS / Sass', icon: SiSass, category: 'styling', proficiency: 86, color: '#EF4444' },
  { name: 'Git', icon: SiGit, category: 'tools', proficiency: 88, color: '#F97316' },
  { name: 'GitHub', icon: SiGithub, category: 'tools', proficiency: 90, color: '#F8FAFC' },
  { name: 'Vite', icon: SiVite, category: 'tools', proficiency: 90, color: '#FACC15' },
  { name: 'Postman', icon: SiPostman, category: 'tools', proficiency: 85, color: '#F97316' },
  { name: 'Figma', icon: SiFigma, category: 'tools', proficiency: 80, color: '#EF4444' },
  { name: 'C++', icon: SiCplusplus, category: 'languages', proficiency: 75, color: '#38BDF8' },
  { name: 'Java', icon: FaJava, category: 'languages', proficiency: 72, color: '#F97316' },
];

export const skillCategories = [
  { key: 'frontend', label: 'Frontend & State', description: 'Core web frameworks & state management' },
  { key: 'styling', label: 'UI, Styling & 3D', description: 'CSS frameworks, preprocessors & 3D web' },
  { key: 'tools', label: 'Tools & Workflow', description: 'Development, API testing & design tools' },
  { key: 'languages', label: 'Languages', description: 'Programming languages' },
] as const;
