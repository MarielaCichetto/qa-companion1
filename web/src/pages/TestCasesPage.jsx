import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ListBulletIcon, PlayIcon } from '@heroicons/react/24/outline';
import StatusPill from '../components/StatusPill';
import { useQAStore } from '../store/useQAStore';

const statusVariants = {
  Passed: 'success',
  Failed: 'danger',
  Blocked: 'warning',
  'In Progress': 'info'
};

const TestCasesPage = () => {
  const { testCases, userStories, addTestCase, updateTestCaseStatus } = useQAStore((state) => ({
    testCases: state.testCases,
    userStories: state.userStories,
    addTestCase: state.addTestCase,
    updateTestCaseStatus: state.updateTestCaseStatus
  }));

  const [filters, setFilters] = useState({ status: 'all', sprint: 'all', story: 'all' });
  const [form, setForm] = useState({ title: '', description: '', sprint: '', expectedResult: '', userStory: '' });

  const sprints = Array.from(new Set(testCases.map((testCase) => testCase.sprint)));

  const filteredCases = useMemo(() =>
    testCases.filter((testCase) => {
      const matchesStatus = filters.status === 'all' || testCase.status === filters.status;
      const matchesSprint = filters.sprint === 'all' || testCase.sprint === filters.sprint;
      const matchesStory = filters.story === 'all' || testCase.userStory === filters.story;
      return matchesStatus && matchesSprint && matchesStory;
    }),
  [filters, testCases]);

  const handleStatusChange = (id, status) => updateTestCaseStatus(id, status);

  const handleCreate = (event) => {
    event.preventDefault();
    if (!form.title || !form.userStory) return;
    addTestCase({
      title: form.title,
      description: form.description,
      sprint: form.sprint || 'S-13',
      userStory: form.userStory,
      expectedResult: form.expectedResult,
      status: 'In Progress',
      priority: 'Media',
      steps: ['Definir pasos', 'Ejecutar', 'Registrar resultado']
    });
    setForm({ title: '', description: '', sprint: '', expectedResult: '', userStory: '' });
  };

  return (
    <section className="space-y-10">
      <div className="section-heading">
        <div>
          <h2 className="section-title">Gestor de Test Cases</h2>
          <p className="text-sm text-slate-300">
            Planifica, ejecuta y monitorea los casos alineados a cada historia de usuario con seguimiento visual en tiempo real.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-slate-300">
          <span className="rounded-2xl border border-white/10 px-3 py-2">{testCases.length} casos</span>
          <span className="rounded-2xl border border-white/10 px-3 py-2">{userStories.length} historias</span>
        </div>
      </div>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Filtros rápidos</h3>
            <p className="text-sm text-slate-300">Refina por estado, sprint o historia de usuario.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <select
              value={filters.status}
              onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value }))}
              className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-neon/40 focus:outline-none"
            >
              <option value="all">Estado · Todos</option>
              {Object.keys(statusVariants).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <select
              value={filters.sprint}
              onChange={(event) => setFilters((prev) => ({ ...prev, sprint: event.target.value }))}
              className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-neon/40 focus:outline-none"
            >
              <option value="all">Sprint · Todos</option>
              {sprints.map((sprint) => (
                <option key={sprint} value={sprint}>
                  {sprint}
                </option>
              ))}
            </select>
            <select
              value={filters.story}
              onChange={(event) => setFilters((prev) => ({ ...prev, story: event.target.value }))}
              className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-neon/40 focus:outline-none"
            >
              <option value="all">Historia · Todas</option>
              {userStories.map((story) => (
                <option key={story.id} value={story.id}>
                  {story.id}
                </option>
              ))}
            </select>
          </div>
        </header>
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/5">
          <table className="min-w-full divide-y divide-white/5 text-sm">
            <thead className="bg-white/5 uppercase tracking-[0.2em] text-xs text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Descripción</th>
                <th className="px-4 py-3 text-left">Historia</th>
                <th className="px-4 py-3 text-left">Sprint</th>
                <th className="px-4 py-3 text-left">Estado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-white/5/50">
              {filteredCases.map((testCase) => (
                <tr key={testCase.id} className="transition hover:bg-white/10">
                  <td className="px-4 py-3 font-semibold text-white">{testCase.id}</td>
                  <td className="px-4 py-3 text-slate-200">
                    <p className="font-medium text-white/90">{testCase.title}</p>
                    <p className="mt-1 text-xs text-slate-400">{testCase.description}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{testCase.userStory}</td>
                  <td className="px-4 py-3 text-slate-300">{testCase.sprint}</td>
                  <td className="px-4 py-3">
                    <StatusPill label={testCase.status} variant={statusVariants[testCase.status] ?? 'neutral'} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <select
                      value={testCase.status}
                      onChange={(event) => handleStatusChange(testCase.id, event.target.value)}
                      className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.25em] text-white focus:border-magenta/40 focus:outline-none"
                    >
                      {Object.keys(statusVariants).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.article initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel lg:col-span-2">
          <header className="flex items-center gap-3">
            <ListBulletIcon className="h-6 w-6 text-neon" />
            <div>
              <h3 className="text-lg font-semibold text-white">Detalle de pasos</h3>
              <p className="text-sm text-slate-300">Selecciona un caso para visualizar pasos y resultado esperado.</p>
            </div>
          </header>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {filteredCases.slice(0, 4).map((testCase) => (
              <div key={testCase.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{testCase.title}</p>
                  <StatusPill label={testCase.status} variant={statusVariants[testCase.status] ?? 'neutral'} />
                </div>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  {testCase.steps.map((step, index) => (
                    <li key={step} className="flex gap-2">
                      <span className="text-neon">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-slate-400">
                  Resultado esperado: <span className="text-slate-200">{testCase.expectedResult}</span>
                </p>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.aside initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
          <h3 className="text-lg font-semibold text-white">Crear nuevo test case</h3>
          <p className="mt-2 text-sm text-slate-300">Completa los campos esenciales y vincula una historia de usuario.</p>
          <form className="mt-4 space-y-4" onSubmit={handleCreate}>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Título</label>
              <input
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
                placeholder="Validar login con MFA"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Descripción</label>
              <textarea
                value={form.description}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                className="h-20 w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
                placeholder="Detalle breve del objetivo del caso"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Historia</label>
              <select
                value={form.userStory}
                onChange={(event) => setForm((prev) => ({ ...prev, userStory: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-neon/40 focus:outline-none"
              >
                <option value="">Selecciona una historia</option>
                {userStories.map((story) => (
                  <option key={story.id} value={story.id}>
                    {story.id} · {story.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Sprint</label>
              <input
                value={form.sprint}
                onChange={(event) => setForm((prev) => ({ ...prev, sprint: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
                placeholder="S-13"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Resultado esperado</label>
              <input
                value={form.expectedResult}
                onChange={(event) => setForm((prev) => ({ ...prev, expectedResult: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-neon/40 focus:outline-none"
                placeholder="El usuario accede al dashboard"
              />
            </div>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cobalt via-magenta to-neon px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:shadow-lg">
              <PlayIcon className="h-4 w-4" /> Guardar y ejecutar
            </button>
          </form>
        </motion.aside>
      </div>
    </section>
  );
};

export default TestCasesPage;
