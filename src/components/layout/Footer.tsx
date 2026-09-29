import { personal } from '../../data/personal';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub, SiWhatsapp, SiFacebook } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-[#151515] text-[#F4F0E8] px-6 lg:px-12 py-8 border-t border-[#F4F0E8]/10">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="text-sm font-medium uppercase tracking-widest text-[#F4F0E8]/50">
          &copy; {new Date().getFullYear()} {personal.name}. All Rights Reserved.
        </div>

        <div className="flex items-center gap-8">
          <a href={personal.social.linkedin} target="_blank" rel="noreferrer" className="text-xl hover:text-[#C85A3E] transition-colors">
            <FaLinkedin />
          </a>
          <a href={personal.social.github} target="_blank" rel="noreferrer" className="text-xl hover:text-[#C85A3E] transition-colors">
            <SiGithub />
          </a>
          <a href={personal.social.whatsapp} target="_blank" rel="noreferrer" className="text-xl hover:text-[#C85A3E] transition-colors">
            <SiWhatsapp />
          </a>
          <a href={personal.social.facebook} target="_blank" rel="noreferrer" className="text-xl hover:text-[#C85A3E] transition-colors">
            <SiFacebook />
          </a>
        </div>
        
      </div>
    </footer>
  );
}
