import { memo, type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = memo(function GlassCard({
  children,
  className = '',
  hover = true,
}: GlassCardProps) {
  const baseClasses =
    'rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]';

  const hoverClasses = hover
    ? 'hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_8px_32px_rgba(139,92,246,0.08)] transition-all duration-500'
    : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
});

export default GlassCard;
