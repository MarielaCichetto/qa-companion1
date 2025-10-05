const variants = {
  success: 'border-lime/40 bg-lime/10 text-lime-200',
  warning: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
  danger: 'border-rose-400/40 bg-rose-400/10 text-rose-200',
  info: 'border-neon/40 bg-neon/10 text-neon/80',
  neutral: 'border-white/10 bg-white/5 text-slate-200'
};

const StatusPill = ({ label, variant = 'neutral' }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase ${
      variants[variant] || variants.neutral
    }`}
  >
    {label}
  </span>
);

export default StatusPill;
