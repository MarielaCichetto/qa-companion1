import { useMemo, useState } from 'react';
import { testCasesSeed } from '../data/testCases';

const statuses = ['Passed', 'Failed', 'Blocked'];

const TestCasesPage = () => {
  const [testCases, setTestCases] = useState(testCasesSeed);
  const [filter, setFilter] = useState('All');

  const filteredCases = useMemo(() => {
    if (filter === 'All') return testCases;
    return testCases.filter((testCase) => testCase.status === filter);
  }, [filter, testCases]);

  const handleStatusChange = (id, status) => {
    setTestCases((prev) => prev.map((tc) => (tc.id === id ? { ...tc, status } : tc)));
  };

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Test Cases</h2>
          <p className="text-slate-500">
            Gestiona tus casos de prueba. Conecta con backend para persistencia colaborativa.
          </p>
        </div>
        <div className="space-x-2">
          {['All', ...statuses].map((status) => (
            <button
              key={status}
              className={`px-3 py-1 rounded border text-sm ${
                filter === status ? 'bg-indigo-500 text-white border-indigo-500' : 'border-slate-300'
              }`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </header>
      <div className="space-y-4">
        {filteredCases.map((testCase) => (
          <div key={testCase.id} className="bg-white rounded shadow p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{testCase.title}</h3>
                <p className="text-sm text-slate-500">
                  {testCase.id} · {testCase.testSet} · {testCase.userStory}
                </p>
              </div>
              <select
                value={testCase.status}
                onChange={(event) => handleStatusChange(testCase.id, event.target.value)}
                className="border rounded px-2 py-1"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Pasos:</p>
              <ol className="list-decimal list-inside text-sm text-slate-500 space-y-1">
                {testCase.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestCasesPage;
