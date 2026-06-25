import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  HiCodeBracket,
  HiPaintBrush,
  HiClipboardDocumentList,
} from 'react-icons/hi2';
import { experiences, services, type Service, type Experience as ExperienceType } from '../../data/experience';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';

/* ─── Service icon map ─── */
const serviceIcons: Record<Service['icon'], React.ReactNode> = {
  code: <HiCodeBracket className="text-4xl" />,
  design: <HiPaintBrush className="text-4xl" />,
  management: <HiClipboardDocumentList className="text-4xl" />,
};

/* ─── Service Card ─── */
const ServiceCard = memo(function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <GlassCard className="group p-8 text-center h-full">
      {/* Icon */}
      <div
        className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl
                   bg-gradient-to-br from-violet-500/20 to-cyan-500/20
                   text-violet-400 transition-colors duration-300
                   group-hover:from-violet-500/30 group-hover:to-cyan-500/30
                   group-hover:text-violet-300"
      >
        {serviceIcons[service.icon]}
      </div>

      <h3 className="mb-2 font-heading text-xl font-bold text-white">
        {service.title}
      </h3>
      <p className="text-sm leading-relaxed text-slate-400 font-body">
        {service.description}
      </p>

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0
                   transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139,92,246,0.1), transparent 60%)',
        }}
      />
      </GlassCard>
    </motion.div>
  );
});

/* ─── Timeline Node ─── */
const TimelineNode = memo(function TimelineNode({
  exp,
  index,
}: {
  exp: ExperienceType;
  index: number;
}) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className={`relative flex w-full items-start gap-8
        ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}
        flex-col md:items-center`}
    >
      {/* Card */}
      <div className="w-full md:w-[calc(50%-2rem)]">
        <GlassCard className="p-6" hover>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h3 className="font-heading text-xl font-bold text-white">
              {exp.role}
            </h3>
            <span
              className="rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20
                         border border-violet-500/30 px-3 py-0.5 text-xs font-semibold text-violet-300"
            >
              {exp.type}
            </span>
          </div>
          <p className="mb-1 text-lg font-semibold text-violet-400 font-heading">
            {exp.company}
          </p>
          <p className="mb-3 text-sm text-slate-400 font-body">
            {exp.startDate} — {exp.endDate}
          </p>
          <p className="text-sm leading-relaxed text-slate-400 font-body">
            {exp.description}
          </p>
        </GlassCard>
      </div>

      {/* Center dot */}
      <div className="absolute -left-10 top-6 z-10 md:left-1/2 md:-translate-x-1/2">
        <div className="relative flex h-5 w-5 items-center justify-center">
          <div className="absolute h-5 w-5 animate-ping rounded-full bg-violet-500/40" />
          <div className="h-3 w-3 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 shadow-lg shadow-violet-500/50" />
        </div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden w-[calc(50%-2rem)] md:block" />
    </motion.div>
  );
});

/* ─── Experience Section ─── */
const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="My Journey" title="Professional Experience" />

        {/* Service Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute left-0 top-0 hidden h-full w-0.5 origin-top
                       bg-gradient-to-b from-violet-500 via-purple-500 to-cyan-500
                       md:left-1/2 md:block md:-translate-x-1/2"
          />
          {/* Mobile left line */}
          <div
            className="absolute left-[9px] top-0 h-full w-0.5
                       bg-gradient-to-b from-violet-500 via-purple-500 to-cyan-500
                       md:hidden"
          />

          {/* Timeline nodes */}
          <div className="space-y-12 pl-10 md:space-y-16 md:pl-0">
            {experiences.map((exp, i) => (
              <TimelineNode key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
