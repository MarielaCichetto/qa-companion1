import { useState } from 'react';
import StatusPill from '../components/StatusPill';

const sampleResults = [
  { id: 1, testCase: 'TC-001', status: 'Passed', owner: 'Lucía' },
  { id: 2, testCase: 'TC-002', status: 'Failed', owner: 'Marco' },
  { id: 3, testCase: 'TC-005', status: 'Blocked', owner: 'Valen' }
];

const SqlQueriesPage = () => {
  const [query, setQuery] = useState('SELECT id, title, status FROM test_cases LIMIT 10;');
  const [results, setResults] = useState(sampleResults);
  const [executions, setExecutions] = useState(0);

  const runQuery = (event) => {
    event.preventDefault();
    setExecutions((prev) => prev + 1);
    setResults(sampleResults);
  };

  return (
    <section className="space-y-8">
      <header className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold text-white">Mini SQL Client</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          Ejecuta consultas SELECT de forma segura contra entornos de prueba. Próximamente podrás crear vistas guardadas y compartir snippets con tu equipo.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
        <form onSubmit={runQuery} className="space-y-5 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/60">Consulta activa</p>
              <h3 className="text-lg font-semibold text-white">Exploración de test cases</h3>
            </div>
            <StatusPill label={`Execuciones ${executions}`} variant="info" />
          </div>
          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            rows={6}
            className="w-full rounded-3xl border border-white/10 bg-[#0b1227]/80 px-5 py-4 font-mono text-sm text-slate-100 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-aurora/40"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-white/70">
              Usa solo SELECT para mantener la base segura. Integra un proxy backend para queries parametrizadas en futuras versiones.
            </div>
            <button className="rounded-2xl bg-gradient-to-r from-emerald-400 via-aurora to-ocean px-6 py-2 text-sm font-semibold text-white shadow-glow transition hover:shadow-lg">
              Ejecutar consulta
            </button>
          </div>
        </form>

        <aside className="space-y-4 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Resultados</h3>
            <StatusPill label={`${results.length} filas`} variant="success" />
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-sm text-slate-100">
              <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-300">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">ID</th>
                  <th className="px-4 py-3 text-left font-medium">Test Case</th>
                  <th className="px-4 py-3 text-left font-medium">Estado</th>
                  <th className="px-4 py-3 text-left font-medium">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {results.map((row) => (
                  <tr key={row.id} className="transition hover:bg-white/5">
                    <td className="px-4 py-3">{row.id}</td>
                    <td className="px-4 py-3">{row.testCase}</td>
                    <td className="px-4 py-3">
                      <StatusPill
                        label={row.status}
                        variant={row.status === 'Passed' ? 'success' : row.status === 'Failed' ? 'danger' : 'warning'}
                      />
                    </td>
                    <td className="px-4 py-3 text-slate-200">{row.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
            <p className="font-semibold text-white">Siguiente iteración</p>
            <ul className="mt-2 list-disc space-y-2 pl-4">
              <li>Historial de queries con favoritos.</li>
              <li>Visualización tipo tabla dinámica y exportación directa.</li>
              <li>Validaciones automáticas de resultados clave.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default SqlQueriesPage;
