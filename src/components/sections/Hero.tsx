import { memo } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub, SiWhatsapp } from 'react-icons/si';

import { personal } from '../../data/personal';

const socials = [
  { name: 'LinkedIn', icon: FaLinkedin, href: personal.social.linkedin },
  { name: 'GitHub', icon: SiGithub, href: personal.social.github },
  { name: 'Email', icon: HiOutlineEnvelope, href: personal.social.email },
  { name: 'WhatsApp', icon: SiWhatsapp, href: personal.social.whatsapp },
] as const;

const Hero = memo(function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] bg-background flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-12 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
        {/* Minimal metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 md:mb-16 flex items-center gap-4 text-sm font-medium tracking-widest uppercase text-muted"
        >
          <span>Portfolio</span>
          <span className="w-12 h-px bg-muted/30"></span>
          <span>{new Date().getFullYear()}</span>
        </motion.div>

        {/* Very large typography, tight letter spacing, asymmetrical */}
        <div className="flex flex-col items-start w-full">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-heading font-semibold text-foreground leading-[0.8] tracking-tighter"
          >
            FARAG
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-heading font-semibold text-foreground leading-[0.8] tracking-tighter md:ml-32"
          >
            SHERIF<span className="text-accent">.</span>
          </motion.h1>
        </div>

        {/* Bio & Socials in an asymmetrical grid layout */}
        <div className="mt-16 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="md:col-span-4 flex gap-6"
          >
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors"
              >
                <social.icon className="w-6 h-6 md:w-8 md:h-8" />
              </a>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="md:col-span-6 md:col-start-7 text-lg md:text-xl text-muted leading-relaxed font-sans"
          >
            {personal.bio}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
