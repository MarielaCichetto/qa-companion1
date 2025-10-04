import { useMemo, useState } from 'react';
import StatusPill from '../components/StatusPill';
import { bugsSeed } from '../data/bugs';

const severityVariant = {
  High: 'danger',
  Medium: 'warning',
  Low: 'success'
};

const priorities = ['P1', 'P2', 'P3', 'P4'];
const severities = ['High', 'Medium', 'Low'];

const BugsPage = () => {
  const [bugs, setBugs] = useState(bugsSeed);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ severity: 'Todos', priority: 'Todas' });
  const [draft, setDraft] = useState({ title: '', severity: 'Medium', priority: 'P3', description: '' });

  const filteredBugs = useMemo(() => {
    return bugs.filter((bug) => {
      const matchesSearch = bug.title.toLowerCase().includes(search.toLowerCase());
      const matchesSeverity = filters.severity === 'Todos' || bug.severity === filters.severity;
      const matchesPriority = filters.priority === 'Todas' || bug.priority === filters.priority;
      return matchesSearch && matchesSeverity && matchesPriority;
    });
  }, [bugs, filters, search]);

  const handleCreate = (event) => {
    event.preventDefault();
    if (!draft.title.trim()) return;
    setBugs((prev) => [
      {
        id: `BUG-${Math.floor(Math.random() * 10000)}`,
        title: draft.title,
        severity: draft.severity,
        priority: draft.priority,
        description: draft.description || 'Descripción pendiente',
        status: 'Open'
      },
      ...prev
    ]);
    setDraft({ title: '', severity: 'Medium', priority: 'P3', description: '' });
  };

  return (
    <section className="space-y-8">
      <article className="grid gap-6 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg lg:grid-cols-[1fr,1fr]">
        <div>
          <h2 className="text-2xl font-semibold text-white">Registro de bugs moderno</h2>
          <p className="mt-2 text-sm text-slate-300">
            Documenta incidencias con contexto visual. Añade capturas, pasos y expectativas para agilizar la resolución.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleCreate}>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70">Título</label>
              <input
                type="text"
                value={draft.title}
                onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-aurora/40"
                placeholder="Checkout - error en validación de cupón"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-white/70">Severidad</label>
                <select
                  value={draft.severity}
                  onChange={(event) => setDraft((prev) => ({ ...prev, severity: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
                >
                  {severities.map((severity) => (
                    <option key={severity} value={severity} className="text-slate-800">
                      {severity}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-white/70">Prioridad</label>
                <select
                  value={draft.priority}
                  onChange={(event) => setDraft((prev) => ({ ...prev, priority: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority} className="text-slate-800">
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70">Descripción</label>
              <textarea
                value={draft.description}
                onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
                rows={3}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-ocean/40"
                placeholder="Pasos para reproducir, resultado actual y esperado"
              />
            </div>
            <button className="w-full rounded-2xl bg-gradient-to-r from-rose-500 via-blossom to-aurora px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:shadow-lg">
              Registrar bug
            </button>
            <p className="text-xs text-white/60">
              * Próximamente: subida de capturas, asignación automática y enlaces a historias de usuario.
            </p>
          </form>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">Filtros inteligentes</h3>
          <p className="mt-2 text-sm text-slate-300">
            Encuentra rápidamente incidencias según criticidad y foco de trabajo.
          </p>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70">Buscar</label>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-ocean/40"
                placeholder="Buscar por título"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70">Severidad</label>
              <div className="flex flex-wrap gap-2">
                {['Todos', ...severities].map((severity) => (
                  <button
                    key={severity}
                    onClick={() => setFilters((prev) => ({ ...prev, severity }))}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                      filters.severity === severity
                        ? 'border-rose-400/60 bg-rose-500/20 text-white'
                        : 'border-white/10 bg-white/5 text-slate-200 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {severity}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70">Prioridad</label>
              <div className="flex flex-wrap gap-2">
                {['Todas', ...priorities].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setFilters((prev) => ({ ...prev, priority }))}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                      filters.priority === priority
                        ? 'border-amber-400/60 bg-amber-500/20 text-white'
                        : 'border-white/10 bg-white/5 text-slate-200 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-rose-500/20 via-blossom/20 to-aurora/20 p-4 text-sm text-white/80">
              <p className="font-semibold text-white">Tips</p>
              <ul className="mt-2 space-y-2 text-xs">
                <li>• Añade etiquetas en futuras versiones para agrupar por módulo.</li>
                <li>• Sincroniza con Jira para mantener estados alineados.</li>
                <li>• Activa recordatorios automáticos para revisiones críticas.</li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-sm text-slate-100">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-300">
              <tr>
                <th className="px-6 py-4 text-left font-medium">Bug</th>
                <th className="px-6 py-4 text-left font-medium">Severidad</th>
                <th className="px-6 py-4 text-left font-medium">Prioridad</th>
                <th className="px-6 py-4 text-left font-medium">Estado</th>
                <th className="px-6 py-4 text-left font-medium">Descripción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredBugs.map((bug) => (
                <tr key={bug.id} className="transition hover:bg-white/5">
                  <td className="px-6 py-5 align-top">
                    <div className="font-semibold text-white">{bug.title}</div>
                    <p className="text-xs text-slate-400">{bug.id}</p>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <StatusPill label={bug.severity} variant={severityVariant[bug.severity]} />
                  </td>
                  <td className="px-6 py-5 align-top">
                    <span className="inline-flex items-center rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-200">
                      {bug.priority}
                    </span>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <StatusPill label={bug.status ?? 'Open'} variant={bug.status === 'Closed' ? 'success' : 'info'} />
                  </td>
                  <td className="px-6 py-5 align-top text-xs text-slate-300">{bug.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BugsPage;
