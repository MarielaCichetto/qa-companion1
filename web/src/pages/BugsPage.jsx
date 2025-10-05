import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BugAntIcon, ChatBubbleBottomCenterTextIcon, PlusIcon } from '@heroicons/react/24/outline';
import StatusPill from '../components/StatusPill';
import { useQAStore } from '../store/useQAStore';

const STATUS_COLUMNS = [
  { key: 'Abierto', title: 'To Do', accent: 'cobalt' },
  { key: 'Investigando', title: 'Investigating', accent: 'magenta' },
  { key: 'En progreso', title: 'In Progress', accent: 'neon' },
  { key: 'Resuelto', title: 'Done', accent: 'lime' }
];

const severityColor = {
  Alta: 'danger',
  Media: 'warning',
  Baja: 'info'
};

const BugsPage = () => {
  const { bugs, addBug, updateBugStatus, addBugComment } = useQAStore((state) => ({
    bugs: state.bugs,
    addBug: state.addBug,
    updateBugStatus: state.updateBugStatus,
    addBugComment: state.addBugComment
  }));

  const [comment, setComment] = useState('');
  const [form, setForm] = useState({ title: '', severity: 'Alta', project: 'QA Companion', description: '', priority: 'Crítica' });
  const [selectedBug, setSelectedBug] = useState(null);

  const groupedBugs = useMemo(() =>
    STATUS_COLUMNS.reduce((acc, column) => {
      acc[column.key] = bugs.filter((bug) => bug.status === column.key);
      return acc;
    }, {}),
  [bugs]);

  const handleStatusAdvance = (bug, statusKey) => {
    updateBugStatus(bug.id, statusKey);
  };

  const handleCreateBug = (event) => {
    event.preventDefault();
    if (!form.title) return;
    addBug({
      title: form.title,
      severity: form.severity,
      priority: form.priority,
      status: 'Abierto',
      project: form.project,
      reporter: 'QA Bot',
      assignee: 'Sin asignar',
      stepsToReproduce: ['Describir pasos', 'Adjuntar evidencia'],
      expectedResult: form.description,
      actualResult: 'Pendiente'
    });
    setForm({ title: '', severity: 'Alta', project: 'QA Companion', description: '', priority: 'Crítica' });
  };

  const handleComment = (bugId) => {
    if (!comment.trim()) return;
    addBugComment(bugId, comment.trim());
    setComment('');
    setSelectedBug(bugId);
  };

  return (
    <section className="space-y-10">
      <div className="section-heading">
        <div>
          <h2 className="section-title">Incidencias estilo Jira</h2>
          <p className="text-sm text-slate-300">
            Coordina la resolución de bugs con vista kanban, prioridades visibles y métricas de severidad por proyecto.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-300">
          <span className="rounded-2xl border border-white/10 px-3 py-2">{bugs.length} bugs</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {STATUS_COLUMNS.map((column, columnIndex) => (
          <motion.section
            key={column.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: columnIndex * 0.05 }}
            className="glass-panel flex min-h-[26rem] flex-col gap-4"
          >
            <header className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{column.title}</h3>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{groupedBugs[column.key]?.length ?? 0} items</p>
              </div>
              <BugAntIcon className="h-6 w-6 text-neon" />
            </header>
            <div className="space-y-4">
              {groupedBugs[column.key]?.map((bug) => (
                <article key={bug.id} className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{bug.title}</p>
                      <p className="text-xs text-slate-400">{bug.project}</p>
                    </div>
                    <StatusPill label={bug.severity} variant={severityColor[bug.severity] ?? 'info'} />
                  </div>
                  <p className="text-xs text-slate-300">Reportado por {bug.reporter} · Asignado a {bug.assignee}</p>
                  <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-400">
                    {bug.tags?.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{new Date(bug.createdAt).toLocaleDateString()}</span>
                    <button
                      type="button"
                      onClick={() => handleStatusAdvance(bug, column.key === 'Resuelto' ? 'Resuelto' : STATUS_COLUMNS[columnIndex + 1]?.key ?? column.key)}
                      className="rounded-xl border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-neon/40 hover:bg-white/10"
                    >
                      {column.key === 'Resuelto' ? 'Listo' : 'Mover'}
                    </button>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
                    <p className="text-xs text-slate-300">{bug.expectedResult}</p>
                  </div>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBug(selectedBug === bug.id ? null : bug.id)}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-neon"
                    >
                      <ChatBubbleBottomCenterTextIcon className="h-4 w-4" /> Notas
                    </button>
                    {selectedBug === bug.id && (
                      <div className="space-y-2">
                        <textarea
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                          className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-magenta/40 focus:outline-none"
                          placeholder="Agregar comentario de seguimiento"
                        />
                        <button
                          type="button"
                          onClick={() => handleComment(bug.id)}
                          className="w-full rounded-2xl bg-gradient-to-r from-cobalt via-magenta to-neon px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-glow"
                        >
                          Guardar comentario
                        </button>
                      </div>
                    )}
                    {bug.comments?.length ? (
                      <ul className="space-y-2 text-xs text-slate-300">
                        {bug.comments.map((entry) => (
                          <li key={entry.id} className="rounded-2xl border border-white/10 bg-white/5 p-2">
                            <span className="text-neon">{new Date(entry.createdAt).toLocaleTimeString()}</span> · {entry.message}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              ))}
              {!groupedBugs[column.key]?.length && (
                <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-xs text-slate-500">Sin registros</p>
              )}
            </div>
          </motion.section>
        ))}
      </div>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
        <header className="flex items-center gap-3">
          <PlusIcon className="h-6 w-6 text-neon" />
          <div>
            <h3 className="text-lg font-semibold text-white">Registrar nuevo bug</h3>
            <p className="text-sm text-slate-300">Documenta severidad, prioridad y contexto clave.</p>
          </div>
        </header>
        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleCreateBug}>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Título</label>
            <input
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
              placeholder="Error 500 al exportar CSV"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Severidad</label>
            <select
              value={form.severity}
              onChange={(event) => setForm((prev) => ({ ...prev, severity: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-neon/40 focus:outline-none"
            >
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Prioridad</label>
            <select
              value={form.priority}
              onChange={(event) => setForm((prev) => ({ ...prev, priority: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-neon/40 focus:outline-none"
            >
              <option value="Crítica">Crítica</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Proyecto</label>
            <input
              value={form.project}
              onChange={(event) => setForm((prev) => ({ ...prev, project: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
              placeholder="QA Companion"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Descripción</label>
            <textarea
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              className="h-24 w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
              placeholder="Detalle de impacto y resultado esperado"
            />
          </div>
          <button
            type="submit"
            className="md:col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cobalt via-magenta to-neon px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:shadow-lg"
          >
            Crear bug
          </button>
        </form>
      </motion.section>
    </section>
  );
};

export default BugsPage;
