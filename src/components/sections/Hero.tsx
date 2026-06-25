import { useState, useEffect, useCallback, memo } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  SiGithub,
  SiWhatsapp,
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import {
  HiOutlineEnvelope,
  HiArrowDownTray,
  HiChevronDown,
} from 'react-icons/hi2';
import { personal } from '../../data/personal';

/* ---------- Typing effect hook ---------- */
function useTypingEffect(words: readonly string[], typingSpeed = 100, deletingSpeed = 60, pauseDuration = 1800) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          setDisplayText(currentWord.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);

          if (charIndex + 1 === currentWord.length) {
            // Pause at end of word
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          // Deleting
          setDisplayText(currentWord.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);

          if (charIndex - 1 === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}

/* ---------- Animation variants ---------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ---------- Social links ---------- */
const socials = [
  { name: 'LinkedIn', icon: FaLinkedin, href: personal.social.linkedin, color: '#0A66C2' },
  { name: 'GitHub', icon: SiGithub, href: personal.social.github, color: '#FFFFFF' },
  { name: 'Email', icon: HiOutlineEnvelope, href: personal.social.email, color: '#EA4335' },
  { name: 'WhatsApp', icon: SiWhatsapp, href: personal.social.whatsapp, color: '#25D366' },
] as const;

/* ---------- Hero component ---------- */
const Hero = memo(function Hero() {
  const typedText = useTypingEffect(personal.roles);

  const scrollToProjects = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      {/* Content layer — sits above 3D scene */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32
                   text-center md:px-12 md:text-left lg:px-20"
      >
        {/* Greeting */}
        <motion.p
          variants={childVariants}
          className="text-lg text-slate-400 font-medium tracking-wide"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={childVariants}
          className="mt-3 text-4xl sm:text-5xl md:text-7xl font-bold leading-tight font-heading break-words"
        >
          <span
            className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400
                       bg-clip-text text-transparent"
          >
            {personal.name}
          </span>
        </motion.h1>

        {/* Typing effect */}
        <motion.div
          variants={childVariants}
          className="mt-4 flex items-center justify-center md:justify-start"
        >
          <span className="text-xl md:text-2xl font-semibold text-cyan-400 font-heading">
            {typedText}
          </span>
          <span className="ml-0.5 inline-block w-[3px] h-7 bg-cyan-400 animate-blink" />
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={childVariants}
          className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400
                     mx-auto md:mx-0"
        >
          {personal.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={childVariants}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 md:justify-start"
        >
          {/* Download CV */}
          <motion.a
            href={personal.resumeUrl}
            download="Farag_Sherif_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139,92,246,0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex w-full items-center justify-center gap-2 rounded-xl
                       bg-gradient-to-r from-violet-600 to-cyan-500
                       px-7 py-3.5 text-sm font-semibold text-white
                       shadow-lg shadow-violet-500/25 transition-shadow sm:w-auto"
          >
            <HiArrowDownTray className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
            Download CV
          </motion.a>

          {/* View Projects */}
          <motion.a
            href="#projects"
            onClick={scrollToProjects}
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(139,92,246,0.15)',
              boxShadow: '0 0 25px rgba(139,92,246,0.2)',
            }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2.5 rounded-full
                       border border-violet-500/40 bg-transparent
                       px-7 py-3.5 text-sm font-semibold text-slate-200
                       transition-colors hover:text-white w-full sm:w-auto"
          >
            View Projects
          </motion.a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          variants={childVariants}
          className="mt-10 flex items-center justify-center gap-4 md:justify-start"
        >
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              whileHover={{
                scale: 1.2,
                y: -3,
                boxShadow: `0 0 20px ${social.color}40`,
              }}
              whileTap={{ scale: 0.9 }}
              className="group flex h-12 w-12 items-center justify-center
                         rounded-full border border-white/10 bg-white/[0.04]
                         backdrop-blur-sm transition-colors
                         hover:border-white/20 hover:bg-white/[0.08]"
            >
              <social.icon
                className="h-5 w-5 text-slate-400 transition-colors"
                style={{ '--hover-color': social.color } as React.CSSProperties}
                onMouseEnter={(e: React.MouseEvent<SVGElement>) => {
                  (e.currentTarget as SVGElement).style.color = social.color;
                }}
                onMouseLeave={(e: React.MouseEvent<SVGElement>) => {
                  (e.currentTarget as SVGElement).style.color = '';
                }}
              />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-slate-500 transition-colors hover:text-violet-400"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <HiChevronDown className="h-5 w-5" />
        </motion.a>
      </motion.div>

      {/* Blink keyframe — injected once */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
      `}</style>
    </section>
  );
});

export default Hero;
