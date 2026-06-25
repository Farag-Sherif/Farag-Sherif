import { memo } from 'react';
import { motion } from 'framer-motion';
import { SiGithub, SiWhatsapp } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { HiEnvelope } from 'react-icons/hi2';

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/farag-mohammed-sherif-679780298',
    icon: <FaLinkedin className="w-5 h-5" />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Farag-Sherif',
    icon: <SiGithub className="w-5 h-5" />,
  },
  {
    label: 'Email',
    href: 'mailto:farag.sherif500@gmail.com',
    icon: <HiEnvelope className="w-5 h-5" />,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/+201032195380',
    icon: <SiWhatsapp className="w-5 h-5" />,
  },
];

const Footer = memo(function Footer() {
  return (
    <footer className="relative mt-auto">
      {/* Gradient border top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-[Space_Grotesk,sans-serif] tracking-tight"
          >
            Farag Sherif
          </motion.span>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm text-slate-500 text-center order-3 md:order-2"
          >
            © {new Date().getFullYear()} Farag Sherif. All rights reserved.
          </motion.p>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 order-2 md:order-3"
          >
            {SOCIAL_LINKS.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{
                  scale: 1.2,
                  y: -2,
                }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-violet-500/30 transition-all duration-300"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
