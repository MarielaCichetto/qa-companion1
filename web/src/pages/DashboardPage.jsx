import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { ArrowDownTrayIcon, ArrowUpTrayIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import StatusPill from '../components/StatusPill';
import { useQAStore } from '../store/useQAStore';

const gradientMap = {
  cobalt: 'from-cobalt/30 to-sky-500/20',
  magenta: 'from-magenta/30 to-fuchsia-500/20',
  neon: 'from-neon/30 to-cyan-400/20',
  lime: 'from-lime/30 to-emerald-400/20'
};

const DashboardPage = () => {
  const { kpis, velocityTrend, coverage, qualityPulse, bugs, testCases, reports, addReport } = useQAStore((state) => ({
    kpis: state.kpis,
    velocityTrend: state.velocityTrend,
    coverage: state.coverage,
    qualityPulse: state.qualityPulse,
    bugs: state.bugs,
    testCases: state.testCases,
    reports: state.reports,
    addReport: state.addReport
  }));

  const bugSummary = useMemo(() => {
    const total = bugs.length;
    const critical = bugs.filter((bug) => bug.severity === 'Alta').length;
    const inProgress = bugs.filter((bug) => bug.status.toLowerCase().includes('progreso')).length;
    const resolved = bugs.filter((bug) => bug.status.toLowerCase().includes('resuelto')).length;

    const byProject = bugs.reduce((acc, bug) => {
      acc[bug.project] = (acc[bug.project] || 0) + 1;
      return acc;
    }, {});

    return { total, critical, inProgress, resolved, byProject };
  }, [bugs]);

  const executionRate = useMemo(() => {
    const passed = testCases.filter((tc) => tc.status === 'Passed').length;
    const failed = testCases.filter((tc) => tc.status === 'Failed').length;
    const blocked = testCases.filter((tc) => tc.status === 'Blocked').length;
    const executed = passed + failed + blocked;
    return {
      passed,
      failed,
      blocked,
      executed,
      success: executed ? Math.round((passed / executed) * 100) : 0
    };
  }, [testCases]);

  const radialData = useMemo(() => qualityPulse.map((item) => ({ ...item, fill: item.color })), [qualityPulse]);

  const handleExportCSV = () => {
    const header = 'Sprint,Ejecutados,Aprobados\n';
    const rows = velocityTrend.map((row) => `${row.sprint},${row.executed},${row.passed}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `dashboard_metrics_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    addReport({ name: 'Export CSV Dashboard', type: 'CSV', createdAt: new Date().toISOString(), owner: 'Auto' });
    toast.success('Reporte CSV exportado');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('QA Companion · Dashboard', 14, 22);
    doc.setFontSize(12);
    doc.text(`Test cases ejecutados: ${executionRate.executed}`, 14, 36);
    doc.text(`Éxito: ${executionRate.success}%`, 14, 44);
    doc.text(`Bugs críticos: ${bugSummary.critical}`, 14, 52);
    doc.text('Historial de velocidad:', 14, 66);
    velocityTrend.forEach((row, index) => {
      doc.text(`${row.sprint} · Ejecutados ${row.executed} · Passed ${row.passed}`, 16, 74 + index * 8);
    });
    doc.save(`dashboard_${Date.now()}.pdf`);
    addReport({ name: 'Export PDF Dashboard', type: 'PDF', createdAt: new Date().toISOString(), owner: 'Auto' });
    toast.success('Reporte PDF exportado');
  };

  return (
    <section className="space-y-10">
      <div className="section-heading">
        <div>
          <h2 className="section-title">Radiografía del sprint</h2>
          <p className="text-sm text-slate-300">
            Seguimiento integral de ejecución, calidad y salud del backlog inspirado en la experiencia de Jira Xray.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 transition hover:border-white/30 hover:bg-white/10"
          >
            <ArrowDownTrayIcon className="h-4 w-4" /> CSV
          </button>
          <button
            type="button"
            onClick={handleExportPDF}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 transition hover:border-white/30 hover:bg-white/10"
          >
            <ArrowUpTrayIcon className="h-4 w-4" /> PDF
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        {kpis.map((metric, index) => (
          <motion.article
            key={metric.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner backdrop-blur-xl"
          >
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradientMap[metric.accent] ?? gradientMap.cobalt}`} aria-hidden />
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-400">
              <span>{metric.title}</span>
              <StatusPill label="live" variant="info" />
            </div>
            <p className="mt-6 text-3xl font-semibold text-white">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-300">{metric.delta}</p>
          </motion.article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel xl:col-span-2"
        >
          <header className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Ejecución por sprint</h3>
              <p className="text-sm text-slate-300">Análisis histórico de ejecución vs éxitos en los últimos sprints.</p>
            </div>
            <StatusPill label={`Success ${executionRate.success}%`} variant="success" />
          </header>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={velocityTrend}>
                <defs>
                  <linearGradient id="colorExecuted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPassed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
                <XAxis dataKey="sprint" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip cursor={{ stroke: '#6366f1', strokeOpacity: 0.2 }} contentStyle={{ background: '#111827', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' }} />
                <Area type="monotone" dataKey="executed" stroke="#6366f1" fillOpacity={1} fill="url(#colorExecuted)" strokeWidth={3} />
                <Area type="monotone" dataKey="passed" stroke="#22d3ee" fillOpacity={1} fill="url(#colorPassed)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-panel"
        >
          <h3 className="text-lg font-semibold text-white">Pulso de calidad</h3>
          <p className="mt-2 text-sm text-slate-300">Bloqueos, críticos y reabiertos que requieren seguimiento inmediato.</p>
          <div className="mt-6 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <RadialBarChart innerRadius="40%" outerRadius="80%" data={radialData}>
                <RadialBar background dataKey="value" cornerRadius={12} />
                <Tooltip contentStyle={{ background: '#111827', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            {radialData.map((item) => (
              <li key={item.label} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-2">
                <span>{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel lg:col-span-2"
        >
          <header className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Cobertura por módulo</h3>
              <p className="text-sm text-slate-300">Visión rápida de cobertura funcional y puntos de mejora.</p>
            </div>
          </header>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coverage}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
                <XAxis dataKey="module" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#111827', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' }} />
                <Bar dataKey="coverage" fill="#a855f7" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.article>

        <motion.aside
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-panel flex flex-col gap-4"
        >
          <div>
            <h3 className="text-lg font-semibold text-white">Radar de bugs</h3>
            <p className="text-sm text-slate-300">{bugSummary.total} incidencias activas · {bugSummary.critical} críticas.</p>
          </div>
          <div className="grid gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">En progreso</span>
              <span className="text-lg font-semibold text-white">{bugSummary.inProgress}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">Resueltos</span>
              <span className="text-lg font-semibold text-white">{bugSummary.resolved}</span>
            </div>
          </div>
          <ul className="space-y-3 text-sm text-slate-200">
            {Object.entries(bugSummary.byProject).map(([project, quantity]) => (
              <li key={project} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-2">
                <span>{project}</span>
                <StatusPill label={`${quantity} bugs`} variant={quantity > 2 ? 'danger' : 'warning'} />
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
      >
        <header className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Reportes recientes</h3>
            <p className="text-sm text-slate-300">Historial rápido de exportaciones realizadas desde el dashboard.</p>
          </div>
        </header>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/5">
          <table className="min-w-full divide-y divide-white/5 text-sm">
            <thead className="bg-white/5 uppercase tracking-[0.2em] text-xs text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">Reporte</th>
                <th className="px-4 py-3 text-left">Tipo</th>
                <th className="px-4 py-3 text-left">Fecha</th>
                <th className="px-4 py-3 text-left">Owner</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-white/5/40">
              {reports.map((report) => (
                <tr key={report.id} className="transition hover:bg-white/10">
                  <td className="px-4 py-3 text-white">{report.name}</td>
                  <td className="px-4 py-3 text-slate-300">{report.type}</td>
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-slate-200">{report.owner}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-200 transition hover:border-white/30 hover:bg-white/10">
                      <DocumentArrowDownIcon className="h-4 w-4" />
                      Descargar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </section>
  );
};

export default DashboardPage;
