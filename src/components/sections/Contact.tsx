import { motion } from 'framer-motion';
import { personal } from '../../data/personal';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub, SiWhatsapp, SiFacebook } from 'react-icons/si';
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiPaperAirplane,
} from 'react-icons/hi2';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-transparent text-zinc-100 py-24 lg:py-32 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-xs font-mono uppercase tracking-widest text-amber-400">
            05 // Contact &amp; Collaboration
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-white leading-tight">
            Let&apos;s build your next{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400">
              digital product.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-200 leading-relaxed">
            {personal.contactText}
          </p>
        </motion.div>

        {/* 2-Column Contact Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Cards & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            <a
              href={`mailto:${personal.email}`}
              className="glass-card rounded-2xl p-5 flex items-center gap-4 group block"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                <HiOutlineEnvelope className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Email Address
                </span>
                <span className="block text-sm sm:text-base font-semibold text-white group-hover:text-amber-400 transition-colors truncate">
                  {personal.email}
                </span>
              </div>
            </a>

            <a
              href={personal.social.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="glass-card rounded-2xl p-5 flex items-center gap-4 group block"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                <HiOutlinePhone className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Phone / WhatsApp
                </span>
                <span className="block text-sm sm:text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                  {personal.phone}
                </span>
              </div>
            </a>

            <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <HiOutlineMapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Location
                </span>
                <span className="block text-sm sm:text-base font-semibold text-white">
                  {personal.location}
                </span>
              </div>
            </div>

            {/* Social Links Strip */}
            <div className="glass-panel rounded-2xl p-5 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                Connect Online
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-amber-500/20 border border-white/[0.08] flex items-center justify-center text-zinc-200 hover:text-amber-400 transition-all"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-amber-500/20 border border-white/[0.08] flex items-center justify-center text-zinc-200 hover:text-amber-400 transition-all"
                >
                  <SiGithub className="w-4 h-4" />
                </a>
                <a
                  href={personal.social.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-orange-500/20 border border-white/[0.08] flex items-center justify-center text-zinc-200 hover:text-orange-400 transition-all"
                >
                  <SiWhatsapp className="w-4 h-4" />
                </a>
                <a
                  href={personal.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-red-500/20 border border-white/[0.08] flex items-center justify-center text-zinc-200 hover:text-red-400 transition-all"
                >
                  <SiFacebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Direct Message Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            action={personal.formAction}
            method="POST"
            className="lg:col-span-7 glass-panel rounded-3xl p-7 sm:p-9 space-y-5"
          >
            <h3 className="text-xl font-bold text-white">Send a Direct Message</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl bg-[#09080C] border border-white/[0.1] focus:border-amber-400/70 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@company.com"
                  className="w-full rounded-xl bg-[#09080C] border border-white/[0.1] focus:border-amber-400/70 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                Subject / Role
              </label>
              <input
                type="text"
                name="_subject"
                placeholder="Frontend Engineering Opportunity / Project Inquiry"
                className="w-full rounded-xl bg-[#09080C] border border-white/[0.1] focus:border-amber-400/70 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Tell me about your project, timeline, or role..."
                className="w-full rounded-xl bg-[#09080C] border border-white/[0.1] focus:border-amber-400/70 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 text-black font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:shadow-[0_0_35px_rgba(250,204,21,0.6)] transition-all cursor-pointer"
            >
              Send Message <HiPaperAirplane className="w-4 h-4" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
