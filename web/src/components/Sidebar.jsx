import { NavLink } from 'react-router-dom';
import {
  Squares2x2Icon,
  ClipboardDocumentCheckIcon,
  BugAntIcon,
  ClipboardDocumentListIcon,
  CloudArrowUpIcon,
  CircleStackIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const accentStyles = {
  indigo: {
    active: 'from-aurora/30 to-indigo-400/30',
    icon: 'from-aurora to-indigo-400',
    dot: 'bg-aurora'
  },
  violet: {
    active: 'from-blossom/30 to-purple-400/30',
    icon: 'from-blossom to-purple-400',
    dot: 'bg-blossom'
  },
  cyan: {
    active: 'from-ocean/30 to-cyan-400/30',
    icon: 'from-ocean to-cyan-400',
    dot: 'bg-ocean'
  },
  emerald: {
    active: 'from-emerald-400/30 to-teal-400/30',
    icon: 'from-emerald-400 to-teal-400',
    dot: 'bg-emerald-400'
  },
  amber: {
    active: 'from-amber-400/30 to-orange-400/30',
    icon: 'from-amber-400 to-orange-400',
    dot: 'bg-amber-400'
  },
  rose: {
    active: 'from-rose-400/30 to-pink-400/30',
    icon: 'from-rose-400 to-pink-400',
    dot: 'bg-rose-400'
  }
};

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: Squares2x2Icon, accent: 'indigo' },
  { to: '/test-cases', label: 'Casos de Prueba', icon: ClipboardDocumentCheckIcon, accent: 'violet' },
  { to: '/bugs', label: 'Bugs', icon: BugAntIcon, accent: 'rose' },
  { to: '/checklists', label: 'Checklists', icon: ClipboardDocumentListIcon, accent: 'emerald' },
  { to: '/api-tester', label: 'API Tester', icon: CloudArrowUpIcon, accent: 'cyan' },
  { to: '/sql-queries', label: 'SQL Queries', icon: CircleStackIcon, accent: 'amber' },
  { to: '/reports', label: 'Reportes', icon: ChartBarIcon, accent: 'indigo' }
];

const Sidebar = () => (
  <aside className="hidden w-72 shrink-0 flex-col justify-between border-r border-white/5 bg-gradient-to-b from-midnight via-[#0f1a33] to-twilight px-6 py-8 lg:flex">
    <div>
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-aurora via-blossom to-ocean text-lg font-semibold text-white shadow-glow">
          QA
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Companion</p>
          <p className="text-lg font-semibold text-white">Control centralizado</p>
        </div>
      </div>
      <nav className="space-y-2 text-sm">
        {links.map((link) => {
          const Icon = link.icon;
          const accent = accentStyles[link.accent] ?? accentStyles.indigo;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  'group relative flex items-center gap-4 rounded-2xl px-4 py-3 font-medium text-slate-300 transition-all duration-300 hover:bg-white/5',
                  isActive ? `bg-gradient-to-r text-white shadow-lg shadow-aurora/20 ${accent.active}` : ''
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
                    <span className="text-base font-semibold">{link.label}</span>
                    <span className="text-xs uppercase tracking-wide text-slate-400 group-hover:text-slate-200">
                      {link.label === 'Reportes' ? 'Insights y exportación' : 'Gestión y seguimiento'}
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
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
      <p className="font-semibold text-white">Mejoras planificadas</p>
      <p className="mt-2 leading-relaxed">
        Próximamente: dashboards en tiempo real, sincronización con Jira y notificaciones automáticas para tu
        squad QA.
      </p>
    </div>
  </aside>
);

export default Sidebar;
