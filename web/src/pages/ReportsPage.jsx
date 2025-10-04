import StatusPill from '../components/StatusPill';
import { testCasesSeed } from '../data/testCases';
import { bugsSeed } from '../data/bugs';

const ReportsPage = () => {
  return (
    <section className="space-y-8">
      <header className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold text-white">Reportes y exportaciones</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          Construye reportes para stakeholders con datos claros y un diseño listo para compartir. Exporta métricas en CSV, PDF y próximamente dashboards interactivos.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-aurora/20 via-indigo-500/20 to-ocean/20 p-6 backdrop-blur-lg">
          <h3 className="text-xl font-semibold text-white">Resumen ejecutivo</h3>
          <p className="mt-3 text-sm text-white/80">
            {testCasesSeed.length} casos ejecutados · {bugsSeed.length} bugs detectados · Exporta progreso por squad.
          </p>
          <button className="mt-6 w-full rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
            Exportar PDF
          </button>
          <p className="mt-3 text-xs text-white/70">Incluye métricas de velocidad, bloqueos y tendencias por sprint.</p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/20 via-aurora/20 to-blossom/20 p-6 backdrop-blur-lg">
          <h3 className="text-xl font-semibold text-white">Detalle de ejecución</h3>
          <p className="mt-3 text-sm text-white/80">
            Exporta resultados de cada test case con sus pasos, evidencias y responsables.
          </p>
          <button className="mt-6 w-full rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
            Exportar CSV
          </button>
          <p className="mt-3 text-xs text-white/70">Ideal para importarlo en BI o compartir con líderes técnicos.</p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-rose-500/20 via-blossom/20 to-indigo-500/20 p-6 backdrop-blur-lg">
          <h3 className="text-xl font-semibold text-white">Tableros automatizados</h3>
          <p className="mt-3 text-sm text-white/80">
            Prototipo de dashboard interactivo con métricas en vivo. Integra webhooks y data warehouses.
          </p>
          <button className="mt-6 w-full rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/40">
            Agendar demo
          </button>
          <p className="mt-3 text-xs text-white/70">Solicita una vista previa conectada a tus pipelines CI/CD.</p>
        </article>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
        <section className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-white">Plantillas listas para usar</h3>
            <StatusPill label="Próximamente" variant="info" />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              {
                title: 'Reporte de regresión',
                description: 'Historial de casos, severidad y asignaciones por sprint',
                accent: 'from-aurora/30 to-indigo-500/30'
              },
              {
                title: 'Salud del release',
                description: 'Visión general de KPIs clave y bloqueos abiertos',
                accent: 'from-emerald-400/30 to-teal-400/30'
              },
              {
                title: 'Incidentes críticos',
                description: 'Listado priorizado de bugs de alta severidad',
                accent: 'from-rose-500/30 to-pink-500/30'
              },
              {
                title: 'Cobertura automatización',
                description: 'Detalle de suites automatizadas vs manuales',
                accent: 'from-ocean/30 to-sky-400/30'
              }
            ].map((template) => (
              <div
                key={template.title}
                className={`rounded-2xl border border-white/10 bg-gradient-to-br ${template.accent} p-4 text-sm text-white/80`}
              >
                <p className="text-base font-semibold text-white">{template.title}</p>
                <p className="mt-2 text-xs">{template.description}</p>
              </div>
            ))}
          </div>
        </section>
        <aside className="space-y-4 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
          <h3 className="text-xl font-semibold text-white">Próximas integraciones</h3>
          <ul className="space-y-4 text-sm text-slate-200">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-aurora" />
              Envío automático de reportes a Slack y Teams.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              Sincronización con Google Sheets y Notion.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
              Publicación en dashboards PowerBI/Tableau.
            </li>
          </ul>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-aurora/20 via-blossom/20 to-ocean/20 p-4 text-xs text-white/70">
            <p className="font-semibold text-white">Roadmap</p>
            <p className="mt-2">
              Implementar programador de exportaciones, guardado de filtros personalizados y firma digital de reportes.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ReportsPage;
