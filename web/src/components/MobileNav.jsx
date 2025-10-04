import { NavLink } from 'react-router-dom';
import { navigationItems } from '../config/navigation';
import { getNavigationIcon } from '../config/navigationIcons';

const badgeStyle = {
  indigo: 'bg-aurora/30 text-aurora',
  violet: 'bg-blossom/30 text-blossom',
  rose: 'bg-rose-400/30 text-rose-300',
  emerald: 'bg-emerald-400/30 text-emerald-200',
  cyan: 'bg-ocean/30 text-cyan-200',
  amber: 'bg-amber-300/30 text-amber-200'
};

const MobileNav = () => (
  <nav className="fixed inset-x-0 bottom-5 z-40 mx-auto flex w-[92%] max-w-3xl items-center justify-between rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-[0_20px_45px_-20px_rgba(15,23,42,0.9)] backdrop-blur-xl lg:hidden">
    {navigationItems.map((item) => {
      const Icon = getNavigationIcon(item.key);
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
                  isActive ? 'scale-105 border-white/30 bg-gradient-to-br from-white/10 to-white/20 shadow-lg shadow-aurora/30' : ''
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-[10px] font-medium leading-tight text-white/80">{item.label.split(' ')[0]}</span>
              {isActive && (
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${badgeStyle[item.accent] ?? 'bg-white/10 text-white/70'}`}>
                  Activo
                </span>
              )}
            </>
          )}
        </NavLink>
      );
    })}
  </nav>
);

export default MobileNav;
