import { useMemo } from 'react';
import StatsCard from '../components/StatsCard';
import { testCasesSeed } from '../data/testCases';
import { bugsSeed } from '../data/bugs';

const DashboardPage = () => {
  const metrics = useMemo(() => {
    const executed = testCasesSeed.length;
    const passed = testCasesSeed.filter((tc) => tc.status === 'Passed').length;
    const failed = testCasesSeed.filter((tc) => tc.status === 'Failed').length;
    return {
      executed,
      passed,
      failed,
      bugs: bugsSeed.length
    };
  }, []);

  return (
    <section className="space-y-8">
      <header>
        <h2 className="text-3xl font-semibold text-slate-900">Dashboard</h2>
        <p className="text-slate-500">
          Resumen rápido de ejecución y seguimiento de bugs. Conecta con backend para métricas en
          tiempo real en futuras versiones.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Casos ejecutados" value={metrics.executed} />
        <StatsCard title="Casos aprobados" value={metrics.passed} />
        <StatsCard title="Casos fallidos" value={metrics.failed} />
        <StatsCard title="Bugs abiertos" value={metrics.bugs} />
      </div>
    </section>
  );
};

export default DashboardPage;
