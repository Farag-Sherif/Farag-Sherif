import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiGit,
  SiGithub,
  SiFigma,
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
  { name: 'HTML5', icon: SiHtml5, category: 'frontend', proficiency: 95, color: '#E34F26' },
  { name: 'CSS3', icon: SiCss, category: 'frontend', proficiency: 92, color: '#1572B6' },
  { name: 'JavaScript', icon: SiJavascript, category: 'frontend', proficiency: 90, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, category: 'frontend', proficiency: 82, color: '#3178C6' },
  { name: 'React.js', icon: SiReact, category: 'frontend', proficiency: 88, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, category: 'frontend', proficiency: 75, color: '#FFFFFF' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'styling', proficiency: 90, color: '#06B6D4' },
  { name: 'Bootstrap', icon: SiBootstrap, category: 'styling', proficiency: 85, color: '#7952B3' },
  { name: 'Git', icon: SiGit, category: 'tools', proficiency: 85, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, category: 'tools', proficiency: 88, color: '#FFFFFF' },
  { name: 'Figma', icon: SiFigma, category: 'tools', proficiency: 72, color: '#F24E1E' },
  { name: 'C++', icon: SiCplusplus, category: 'languages', proficiency: 70, color: '#00599C' },
  { name: 'Java', icon: FaJava, category: 'languages', proficiency: 68, color: '#ED8B00' },
];

export const skillCategories = [
  { key: 'frontend', label: 'Frontend', description: 'Core web technologies & frameworks' },
  { key: 'styling', label: 'Styling', description: 'CSS frameworks & design systems' },
  { key: 'tools', label: 'Tools', description: 'Development & design tools' },
  { key: 'languages', label: 'Languages', description: 'Programming languages' },
] as const;
