import { NavLink } from 'react-router-dom';
import { navigationItems } from '../config/navigation';
import { getNavigationIcon } from '../config/navigationIcons';

const accentStyles = {
  cobalt: {
    active: 'from-cobalt/25 to-sky-500/30',
    icon: 'from-cobalt to-sky-500',
    dot: 'bg-cobalt'
  },
  magenta: {
    active: 'from-magenta/25 to-fuchsia-500/30',
    icon: 'from-magenta to-fuchsia-500',
    dot: 'bg-magenta'
  },
  neon: {
    active: 'from-neon/20 to-cyan-400/30',
    icon: 'from-neon to-cyan-400',
    dot: 'bg-neon'
  },
  lime: {
    active: 'from-lime/25 to-emerald-400/30',
    icon: 'from-lime to-emerald-400',
    dot: 'bg-lime'
  },
  rose: {
    active: 'from-rose-400/25 to-pink-500/30',
    icon: 'from-rose-500 to-pink-500',
    dot: 'bg-rose-400'
  },
  slate: {
    active: 'from-slate-600/30 to-slate-800/30',
    icon: 'from-slate-600 to-slate-800',
    dot: 'bg-slate-500'
  }
};

const Sidebar = () => (
  <aside className="hidden w-72 shrink-0 flex-col justify-between border-r border-white/10 bg-gradient-to-b from-carbon via-carbonLight/90 to-obsidian px-6 py-8 text-sm text-slate-300 shadow-inner shadow-black/40 lg:flex">
    <div>
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cobalt via-magenta to-neon text-lg font-semibold text-white shadow-glow">
          QA
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Companion</p>
          <p className="text-lg font-semibold text-white">Mission Control</p>
        </div>
      </div>
      <nav className="space-y-2 text-sm">
        {navigationItems.map((link) => {
          const Icon = getNavigationIcon(link.key);
          const accent = accentStyles[link.accent] ?? accentStyles.cobalt;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  'group relative flex items-center gap-4 rounded-2xl border border-transparent px-4 py-3 font-medium transition-all duration-300 hover:border-white/10 hover:bg-white/5',
                  isActive ? `bg-gradient-to-r text-white shadow-lg shadow-cobalt/20 ${accent.active}` : 'text-slate-300'
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-inner shadow-black/20 transition-transform duration-300 group-hover:scale-105 ${accent.icon}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="flex flex-1 flex-col">
                    <span className="text-base font-semibold tracking-tight">{link.label}</span>
                    <span className="text-xs uppercase tracking-wide text-slate-500 group-hover:text-slate-200">
                      {link.description}
                    </span>
                  </div>
                  <span
                    className={`absolute inset-y-3 right-3 w-1 rounded-full transition-all ${
                      isActive ? accent.dot : 'bg-white/10 opacity-0 group-hover:opacity-60'
                    }`}
                  />
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-xs text-slate-300">
      <p className="text-sm font-semibold text-white">Próximos releases</p>
      <p className="mt-2 leading-relaxed">
        Roadmap: Integración Jira bidireccional, métricas en tiempo real y automatizaciones de smoke nocturnas.
      </p>
    </div>
  </aside>
);

export default Sidebar;
