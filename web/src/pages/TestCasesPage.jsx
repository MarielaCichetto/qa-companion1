import { useMemo, useState } from 'react';
import StatusPill from '../components/StatusPill';
import { testCasesSeed } from '../data/testCases';

const statuses = ['Passed', 'Failed', 'Blocked'];

const statusVariant = {
  Passed: 'success',
  Failed: 'danger',
  Blocked: 'warning'
};

const TestCasesPage = () => {
  const [testCases, setTestCases] = useState(testCasesSeed);
  const [filter, setFilter] = useState('Todos');

  const filteredCases = useMemo(() => {
    if (filter === 'Todos') return testCases;
    return testCases.filter((testCase) => testCase.status === filter);
  }, [filter, testCases]);

  const handleStatusChange = (id, status) => {
    setTestCases((prev) => prev.map((tc) => (tc.id === id ? { ...tc, status } : tc)));
  };

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Gestión de Test Cases</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Centraliza la ejecución por historia de usuario, asigna estados visuales y prepara suites para exportar al backend en próximas iteraciones.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {['Todos', ...statuses].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                filter === status
                  ? 'border-white/40 bg-white/20 text-white shadow-lg shadow-aurora/20'
                  : 'border-white/10 bg-white/5 text-slate-200 hover:border-white/30 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </header>

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-sm text-slate-100">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-300">
              <tr>
                <th className="px-6 py-4 text-left font-medium">Test Case</th>
                <th className="px-6 py-4 text-left font-medium">Historia / Set</th>
                <th className="px-6 py-4 text-left font-medium">Pasos clave</th>
                <th className="px-6 py-4 text-left font-medium">Estado</th>
                <th className="px-6 py-4 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCases.map((testCase) => (
                <tr key={testCase.id} className="transition hover:bg-white/5">
                  <td className="px-6 py-5 align-top">
                    <div className="font-semibold text-white">{testCase.title}</div>
                    <p className="text-xs text-slate-400">{testCase.id}</p>
                  </td>
                  <td className="px-6 py-5 align-top text-xs text-slate-300">
                    <p className="font-medium text-white/80">{testCase.userStory}</p>
                    <p className="text-slate-400">{testCase.testSet}</p>
                  </td>
                  <td className="px-6 py-5 align-top text-xs text-slate-300">
                    <ol className="space-y-1">
                      {testCase.steps.slice(0, 3).map((step, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="mt-0.5 h-2 w-2 rounded-full bg-aurora/60" />
                          <span>{step}</span>
                        </li>
                      ))}
                      {testCase.steps.length > 3 && <li className="text-white/50">…</li>}
                    </ol>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <StatusPill label={testCase.status} variant={statusVariant[testCase.status]} />
                  </td>
                  <td className="px-6 py-5 align-top text-right">
                    <div className="flex justify-end gap-2">
                      {statuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(testCase.id, status)}
                          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                            testCase.status === status
                              ? 'bg-aurora text-white shadow shadow-aurora/40'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
          <h3 className="text-lg font-semibold text-white">Plantillas sugeridas</h3>
          <p className="mt-2 text-sm text-slate-300">
            Itera en futuras versiones con versiones de test parametrizadas y ejecución paralela.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate-200 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-aurora/20 to-indigo-500/20 p-4">
              <p className="font-semibold text-white">Regresión Checkout</p>
              <p className="text-xs text-white/70">22 casos · Alta prioridad</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-ocean/20 to-sky-400/20 p-4">
              <p className="font-semibold text-white">API Smoke v2</p>
              <p className="text-xs text-white/70">12 endpoints · Tokens rotativos</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blossom/20 to-fuchsia-400/20 p-4">
              <p className="font-semibold text-white">Mobile UX</p>
              <p className="text-xs text-white/70">Centrado en journeys críticos</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 p-4">
              <p className="font-semibold text-white">Accesibilidad</p>
              <p className="text-xs text-white/70">WCAG 2.1 AA</p>
            </div>
          </div>
        </article>
        <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
          <h3 className="text-lg font-semibold text-white">Próximos pasos</h3>
          <ul className="mt-4 space-y-4 text-sm text-slate-200">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              Conectar estos estados con notificaciones de Slack para alertar bloqueos automáticamente.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-aurora" />
              Agregar asignación de responsables y tiempos estimados por caso.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-rose-400" />
              Sincronizar con herramientas de gestión (Jira, Azure DevOps) mediante webhooks.
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default TestCasesPage;
