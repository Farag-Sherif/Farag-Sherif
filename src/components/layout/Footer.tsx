import { personal } from '../../data/personal';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub, SiWhatsapp, SiFacebook } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#060608]/90 backdrop-blur-xl text-zinc-300 px-6 lg:px-12 py-8 border-t border-amber-500/15">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
          &copy; {new Date().getFullYear()}{' '}
          <span className="text-amber-400 font-semibold">{personal.name}</span>. All Rights Reserved.
        </div>

        <div className="flex items-center gap-6">
          <a
            href={personal.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-lg text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href={personal.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-lg text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <SiGithub />
          </a>
          <a
            href={personal.social.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="text-lg text-zinc-400 hover:text-orange-400 transition-colors"
          >
            <SiWhatsapp />
          </a>
          <a
            href={personal.social.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="text-lg text-zinc-400 hover:text-red-400 transition-colors"
          >
            <SiFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
}
