import { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import {
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiPaperAirplane,
  HiUser,
  HiChatBubbleBottomCenterText,
} from 'react-icons/hi2';
import { SiGithub, SiFacebook, SiWhatsapp } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { personal } from '../../data/personal';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';

/* ─── Contact info items ─── */
const contactItems = [
  {
    icon: <HiEnvelope className="text-xl" />,
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: <HiPhone className="text-xl" />,
    label: 'Phone / WhatsApp',
    value: personal.phone,
    href: `tel:${personal.phone}`,
  },
  {
    icon: <HiMapPin className="text-xl" />,
    label: 'Location',
    value: personal.location,
    href: undefined,
  },
] as const;

/* ─── Social links ─── */
const socialLinks = [
  { icon: FaLinkedin, href: personal.social.linkedin, label: 'LinkedIn', color: '#0A66C2' },
  { icon: SiGithub, href: personal.social.github, label: 'GitHub', color: '#FFFFFF' },
  { icon: SiFacebook, href: personal.social.facebook, label: 'Facebook', color: '#1877F2' },
  { icon: SiWhatsapp, href: personal.social.whatsapp, label: 'WhatsApp', color: '#25D366' },
] as const;

/* ─── Form field icons ─── */
const fieldIcons = {
  name: <HiUser className="text-lg text-slate-500" />,
  email: <HiEnvelope className="text-lg text-slate-500" />,
  message: <HiChatBubbleBottomCenterText className="text-lg text-slate-500" />,
};

/* ─── Social Icon Button ─── */
const SocialButton = memo(function SocialButton({
  icon: Icon,
  href,
  label,
  color,
}: {
  icon: IconType;
  href: string;
  label: string;
  color: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.15, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="group flex h-12 w-12 items-center justify-center rounded-full
                 border border-white/10 bg-white/5 backdrop-blur-sm
                 transition-colors duration-300 hover:border-white/20 hover:bg-white/10"
    >
      <Icon
        className="text-xl text-slate-400 transition-colors duration-300"
        style={{ '--hover-color': color } as React.CSSProperties}
        onMouseEnter={(e: React.MouseEvent<SVGElement>) => {
          (e.currentTarget as SVGElement).style.color = color;
        }}
        onMouseLeave={(e: React.MouseEvent<SVGElement>) => {
          (e.currentTarget as SVGElement).style.color = '';
        }}
      />
    </motion.a>
  );
});

/* ─── Contact Section ─── */
const Contact: React.FC = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleFocus = useCallback((field: string) => setFocusedField(field), []);
  const handleBlur = useCallback(() => setFocusedField(null), []);

  const inputClasses = (field: string) =>
    `w-full rounded-xl border bg-white/5 px-4 py-3.5 pl-11 text-sm text-white
     placeholder:text-slate-500 backdrop-blur-sm outline-none
     transition-all duration-300 font-body
     ${
       focusedField === field
         ? 'border-violet-500/60 ring-2 ring-violet-500/20 bg-white/[0.07]'
         : 'border-white/10 hover:border-white/20'
     }`;

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Contact Me"
          title="Get In Touch"
          description="Don't hesitate to reach out to me. I'm always open to new opportunities and collaborations."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* ─── Left: Contact Info ─── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="h-full p-8" hover={false}>
              <h3 className="mb-3 font-heading text-2xl font-bold text-white">
                Contact Information
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-slate-400 font-body">
                {personal.contactText}
              </p>

              {/* Contact details */}
              <div className="mb-8 space-y-5">
                {contactItems.map((item) => {
                  const Wrapper = item.href ? 'a' : 'div';
                  const linkProps = item.href
                    ? { href: item.href, target: '_blank' as const, rel: 'noopener noreferrer' }
                    : {};

                  return (
                    <Wrapper
                      key={item.label}
                      {...linkProps}
                      className="group flex items-center gap-4 transition-colors duration-200"
                    >
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                                   bg-gradient-to-br from-violet-500/20 to-cyan-500/20
                                   text-violet-400 transition-colors duration-300
                                   group-hover:from-violet-500/30 group-hover:to-cyan-500/30"
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-200">
                          {item.value}
                        </p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>

              {/* Social links */}
              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Follow me
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <SocialButton key={social.label} {...social} />
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* ─── Right: Contact Form ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <GlassCard className="h-full p-8" hover={false}>
              <form
                action={personal.formAction}
                method="POST"
                className="flex h-full flex-col"
              >
                {/* Hidden formsubmit fields */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                {/* Name */}
                <div className="mb-5">
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                      {fieldIcons.name}
                    </div>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className={inputClasses('name')}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-5">
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                      {fieldIcons.email}
                    </div>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className={inputClasses('email')}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6 flex-1">
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute left-3.5 top-4">
                      {fieldIcons.message}
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className={`${inputClasses('message')} resize-none pt-3.5`}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2.5
                             rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500
                             py-3.5 text-sm font-bold text-white
                             shadow-lg shadow-violet-500/25
                             transition-shadow duration-300 hover:shadow-xl hover:shadow-violet-500/30"
                >
                  <HiPaperAirplane className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                  Send Message
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
