import { useState } from 'react';

const demoResults = [
  { id: 1, testCase: 'TC-001', status: 'Passed' },
  { id: 2, testCase: 'TC-002', status: 'Failed' }
];

const SqlQueriesPage = () => {
  const [query, setQuery] = useState('SELECT * FROM test_cases LIMIT 10;');
  const [results, setResults] = useState(demoResults);

  const runQuery = (event) => {
    event.preventDefault();
    // TODO: Connect to backend SQL proxy that executes read-only queries.
    setResults(demoResults);
  };

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-3xl font-semibold text-slate-900">Mini SQL Client</h2>
        <p className="text-slate-500">
          Ejecuta consultas SELECT simples contra la base de prueba. Implementa sandbox y seguridad más adelante.
        </p>
      </header>
      <form onSubmit={runQuery} className="bg-white rounded shadow p-4 space-y-3">
        <textarea
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="border rounded px-3 py-2 w-full"
          rows={4}
        />
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded self-end">
          Ejecutar
        </button>
      </form>
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold text-lg">Resultados</h3>
        <table className="min-w-full text-left text-sm mt-3">
          <thead>
            <tr className="text-slate-500 uppercase">
              <th className="py-2">ID</th>
              <th className="py-2">Test Case</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="py-2">{row.id}</td>
                <td className="py-2">{row.testCase}</td>
                <td className="py-2">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SqlQueriesPage;
