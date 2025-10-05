import { NavLink } from 'react-router-dom';
import { navigationItems } from '../config/navigation';
import { getNavigationIcon } from '../config/navigationIcons';
import { useTranslation } from '../hooks/useTranslation';

const badgeStyle = {
  cobalt: 'bg-cobalt/25 text-cobalt',
  magenta: 'bg-magenta/25 text-magenta',
  neon: 'bg-neon/25 text-cyan-200',
  lime: 'bg-lime/25 text-lime-200',
  rose: 'bg-rose-400/25 text-rose-200',
  slate: 'bg-slate-700/40 text-slate-200'
};

const MobileNav = () => {
  const { t } = useTranslation();

  return (
    <nav className="fixed inset-x-0 bottom-5 z-40 mx-auto flex w-[92%] max-w-3xl items-center justify-between rounded-3xl border border-white/10 bg-carbonLight/90 px-4 py-3 shadow-[0_25px_55px_-20px_rgba(15,23,42,0.95)] backdrop-blur-xl lg:hidden">
      {navigationItems.map((item) => {
        const Icon = getNavigationIcon(item.key);
        const label = t(item.label);
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold uppercase tracking-wide transition-all',
                isActive ? 'text-white' : 'text-slate-300 hover:text-white'
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-all ${
                    isActive ? 'scale-105 border-white/30 bg-gradient-to-br from-white/10 to-white/20 shadow-lg shadow-cobalt/30' : ''
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-[10px] font-medium leading-tight text-white/80">{label.split(' ')[0]}</span>
                {isActive && (
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${badgeStyle[item.accent] ?? 'bg-white/10 text-white/70'}`}>
                    {t('Activo')}
                  </span>
                )}
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default MobileNav;
