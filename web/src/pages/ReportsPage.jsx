import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownCircleIcon, ChartBarSquareIcon, CloudArrowDownIcon } from '@heroicons/react/24/outline';
import StatusPill from '../components/StatusPill';
import { useQAStore } from '../store/useQAStore';

const templates = [
  {
    title: 'Reporte de regresión',
    description: 'Historial de casos, severidad y asignaciones por sprint',
    accent: 'from-cobalt/30 to-sky-500/30'
  },
  {
    title: 'Salud del release',
    description: 'KPIs clave, bloqueos abiertos y cobertura',
    accent: 'from-lime/30 to-emerald-400/30'
  },
  {
    title: 'Incidentes críticos',
    description: 'Bugs de alta severidad listos para escalación',
    accent: 'from-rose-500/30 to-magenta/30'
  },
  {
    title: 'Cobertura automatización',
    description: 'Comparativa entre suites automatizadas y manuales',
    accent: 'from-neon/30 to-cyan-400/30'
  }
];

const ReportsPage = () => {
  const { reports, testCases, bugs } = useQAStore((state) => ({
    reports: state.reports,
    testCases: state.testCases,
    bugs: state.bugs
  }));

  const stats = useMemo(() => {
    const executions = testCases.length;
    const passed = testCases.filter((tc) => tc.status === 'Passed').length;
    return {
      executions,
      bugs: bugs.length,
      coverage: executions ? Math.round((passed / executions) * 100) : 0
    };
  }, [bugs.length, testCases]);

  return (
    <section className="space-y-10">
      <div className="section-heading">
        <div>
          <h2 className="section-title">Reportes & exportaciones</h2>
          <p className="text-sm text-slate-300">
            Prepara informes ejecutivos, descargas masivas y plantillas listas para compartir con stakeholders.
          </p>
        </div>
        <StatusPill label="PDF · CSV" variant="info" />
      </div>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cobalt/30 to-sky-500/30 p-6 text-white shadow-inner">
            <h3 className="text-lg font-semibold">Resumen ejecutivo</h3>
            <p className="mt-3 text-sm text-white/80">
              {stats.executions} casos ejecutados · {stats.bugs} bugs registrados · Cobertura {stats.coverage}%.
            </p>
            <button className="mt-6 flex items-center justify-between rounded-2xl border border-white/30 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/15">
              Exportar PDF
              <CloudArrowDownIcon className="h-5 w-5" />
            </button>
            <p className="mt-4 text-xs text-white/70">Formato listo para dirección, incluye gráficos y próximos pasos.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-magenta/30 to-fuchsia-500/20 p-6 text-white shadow-inner">
            <h3 className="text-lg font-semibold">Detalle de ejecución</h3>
            <p className="mt-3 text-sm text-white/80">
              Exporta resultados con pasos, evidencias y responsables por caso de prueba.
            </p>
            <button className="mt-6 flex items-center justify-between rounded-2xl border border-white/30 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/15">
              Exportar CSV
              <ArrowDownCircleIcon className="h-5 w-5" />
            </button>
            <p className="mt-4 text-xs text-white/70">Compatible con BI tools y seguimiento semanal.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-lime/30 to-emerald-500/20 p-6 text-white shadow-inner">
            <h3 className="text-lg font-semibold">Dashboards automatizados</h3>
            <p className="mt-3 text-sm text-white/80">
              Conecta tu data warehouse para actualizar métricas en vivo y notificar al squad.
            </p>
            <button className="mt-6 flex items-center justify-between rounded-2xl border border-white/30 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/15">
              Agendar demo
              <ChartBarSquareIcon className="h-5 w-5" />
            </button>
            <p className="mt-4 text-xs text-white/70">Incluye widgets configurables y alertas automáticas.</p>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">Plantillas recomendadas</h3>
            <StatusPill label="beta" variant="neutral" />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {templates.map((template) => (
              <div
                key={template.title}
                className={`rounded-2xl border border-white/10 bg-gradient-to-br ${template.accent} p-4 text-sm text-white/80`}
              >
                <p className="text-base font-semibold text-white">{template.title}</p>
                <p className="mt-2 text-xs">{template.description}</p>
              </div>
            ))}
          </div>
        </motion.section>
        <motion.aside initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
          <h3 className="text-lg font-semibold text-white">Historial de exportaciones</h3>
          <p className="mt-2 text-sm text-slate-300">Registra qué reportes se descargaron y quién los generó.</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            {reports.map((report) => (
              <li key={report.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{report.name}</p>
                  <StatusPill label={report.type} variant={report.type === 'PDF' ? 'info' : 'neutral'} />
                </div>
                <p className="mt-1 text-xs text-slate-400">{new Date(report.createdAt).toLocaleString()}</p>
                <p className="text-xs text-slate-400">Owner: {report.owner}</p>
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>
    </section>
  );
};

export default ReportsPage;
