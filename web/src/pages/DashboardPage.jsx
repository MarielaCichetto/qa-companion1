import StatusPill from '../components/StatusPill';
import { testCasesSeed } from '../data/testCases';
import { bugsSeed } from '../data/bugs';

const DashboardPage = () => {
  const metrics = [
    {
      label: 'Casos ejecutados',
      value: testCasesSeed.length,
      trend: '+12% vs sprint anterior',
      accent: 'from-aurora/20 via-indigo-500/20 to-indigo-400/20'
    },
    {
      label: 'Bugs abiertos',
      value: bugsSeed.filter((bug) => bug.status !== 'Closed').length,
      trend: '-5% semana',
      accent: 'from-rose-400/20 via-rose-500/20 to-pink-400/20'
    },
    {
      label: 'Bloqueados',
      value: testCasesSeed.filter((testCase) => testCase.status === 'Blocked').length,
      trend: '2 nuevos',
      accent: 'from-amber-400/20 via-amber-500/20 to-orange-400/20'
    },
    {
      label: 'Tasa de éxito',
      value: '86%',
      trend: 'Objetivo ≥ 90%',
      accent: 'from-emerald-400/20 via-emerald-500/20 to-teal-400/20'
    }
  ];

  const activity = [
    {
      title: 'Nuevo bug crítico registrado',
      detail: 'BUG-2458 · Checkout regresión',
      time: 'Hace 12 min',
      variant: 'danger'
    },
    {
      title: 'Caso TC-104 marcado como Passed',
      detail: 'Historia: Pago con cupones',
      time: 'Hace 25 min',
      variant: 'success'
    },
    {
      title: 'Checklist Smoke listo para revisión',
      detail: '10/12 tareas completadas',
      time: 'Hace 1 h',
      variant: 'info'
    },
    {
      title: 'Reporte de ejecución exportado',
      detail: 'Sprint 12 · Equipo Web',
      time: 'Hace 3 h',
      variant: 'neutral'
    }
  ];

  const quickActions = [
    { label: 'Nuevo Test Case', helper: 'Plantilla regresión', accent: 'from-aurora to-indigo-500' },
    { label: 'Registrar Bug', helper: 'Alta, media o baja severidad', accent: 'from-rose-500 to-rose-400' },
    { label: 'Iniciar checklist', helper: 'Smoke suite', accent: 'from-emerald-500 to-teal-400' },
    { label: 'Enviar API request', helper: 'POST · /v2/orders', accent: 'from-ocean to-sky-400' }
  ];

  return (
    <section className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-4">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg transition-all hover:-translate-y-1 hover:border-white/30 hover:bg-white/20 hover:shadow-xl"
          >
            <div className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${metric.accent}`} aria-hidden />
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-wider text-white/70">{metric.label}</p>
              <StatusPill label="Realtime" variant="info" />
            </div>
            <p className="mt-4 text-4xl font-semibold text-white">{metric.value}</p>
            <p className="mt-3 text-sm text-white/80">{metric.trend}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="space-y-6 xl:col-span-2">
          <article className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
            <header className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Actividades recientes</h2>
                <p className="text-sm text-slate-300">Sigue los eventos clave del squad en tiempo real.</p>
              </div>
              <button className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-white/40 hover:bg-white/10">
                Ver historial
              </button>
            </header>
            <ul className="mt-6 space-y-4">
              {activity.map((event, index) => (
                <li key={event.title} className="relative flex gap-4 rounded-2xl bg-white/5 p-4">
                  <span className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-white/10 via-white/30 to-transparent" aria-hidden />
                  <StatusPill label={event.time} variant={event.variant} />
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-white">{event.title}</p>
                    <p className="text-sm text-slate-300">{event.detail}</p>
                  </div>
                  <span className="ml-auto self-start text-xs text-white/60">#{index + 1}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="grid gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-white">Salud del sprint</h2>
              <p className="mt-2 text-sm text-slate-300">
                Visualización rápida de bloqueos y focos de revisión en curso.
              </p>
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>Automatización</span>
                    <span>65%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-aurora to-indigo-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>Regresión web</span>
                    <span>80%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>Mobile smoke</span>
                    <span>42%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-rose-400 to-pink-500" />
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">Notas rápidas</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                  Validar rollback en staging tras fix #2458.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-aurora" />
                  Preparar set de datos para API Tester (auth tokens renovados).
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-400" />
                  Coordinar pairing QA/Dev para reproducir bug en iOS 17.
                </li>
              </ul>
            </div>
          </article>
        </section>

        <aside className="space-y-6">
          <article className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
            <h2 className="text-xl font-semibold text-white">Acciones rápidas</h2>
            <p className="mt-2 text-sm text-slate-300">Inicia flujos frecuentes con plantillas listas.</p>
            <div className="mt-5 space-y-4">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className={`w-full rounded-2xl bg-gradient-to-r ${action.accent} px-4 py-3 text-left text-sm font-semibold text-white transition hover:scale-[1.01]`}
                >
                  <span className="block text-base">{action.label}</span>
                  <span className="text-xs font-normal text-white/80">{action.helper}</span>
                </button>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
            <h2 className="text-xl font-semibold text-white">Resumen de bugs</h2>
            <p className="mt-3 text-sm text-slate-300">
              {bugsSeed.length} registros totales · {bugsSeed.filter((bug) => bug.severity === 'High').length} críticos.
            </p>
            <ul className="mt-5 space-y-4 text-sm text-slate-200">
              {bugsSeed.slice(0, 3).map((bug) => (
                <li key={bug.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white">{bug.title}</p>
                    <StatusPill
                      label={bug.severity}
                      variant={bug.severity === 'High' ? 'danger' : bug.severity === 'Medium' ? 'warning' : 'success'}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-400">Prioridad {bug.priority} · {bug.id}</p>
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </div>
    </section>
  );
};

export default DashboardPage;
