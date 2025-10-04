import { useState } from 'react';
import { bugsSeed } from '../data/bugs';

const severities = ['Low', 'Medium', 'High', 'Critical'];

const BugsPage = () => {
  const [bugs, setBugs] = useState(bugsSeed);
  const [newBug, setNewBug] = useState({
    title: '',
    severity: 'Medium',
    priority: 'P3',
    description: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const created = {
      id: `BUG-${Math.floor(Math.random() * 10000)}`,
      status: 'Open',
      stepsToReproduce: [],
      expectedResult: '',
      actualResult: '',
      ...newBug
    };
    setBugs((prev) => [created, ...prev]);
    setNewBug({ title: '', severity: 'Medium', priority: 'P3', description: '' });
  };

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-3xl font-semibold text-slate-900">Bugs</h2>
        <p className="text-slate-500">Registra incidencias rápidamente y adjunta evidencia en futuras iteraciones.</p>
      </header>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Título</label>
          <input
            type="text"
            className="border rounded px-3 py-2"
            value={newBug.title}
            onChange={(event) => setNewBug((prev) => ({ ...prev, title: event.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Severidad</label>
          <select
            className="border rounded px-3 py-2"
            value={newBug.severity}
            onChange={(event) => setNewBug((prev) => ({ ...prev, severity: event.target.value }))}
          >
            {severities.map((severity) => (
              <option key={severity} value={severity}>
                {severity}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Prioridad</label>
          <select
            className="border rounded px-3 py-2"
            value={newBug.priority}
            onChange={(event) => setNewBug((prev) => ({ ...prev, priority: event.target.value }))}
          >
            {['P1', 'P2', 'P3', 'P4'].map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-600">Descripción</label>
          <textarea
            className="border rounded px-3 py-2"
            rows={3}
            value={newBug.description}
            onChange={(event) => setNewBug((prev) => ({ ...prev, description: event.target.value }))}
            placeholder="Pasos, resultado actual, resultado esperado..."
          />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded">
            Crear Bug
          </button>
        </div>
      </form>
      <div className="space-y-4">
        {bugs.map((bug) => (
          <article key={bug.id} className="bg-white rounded shadow p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{bug.title}</h3>
                <p className="text-sm text-slate-500">
                  {bug.id} · {bug.severity} · {bug.priority}
                </p>
              </div>
              <span className="text-xs uppercase bg-red-100 text-red-600 px-2 py-1 rounded">
                {bug.status}
              </span>
            </div>
            <p className="text-sm text-slate-600">{bug.description || 'Descripción pendiente'}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BugsPage;
