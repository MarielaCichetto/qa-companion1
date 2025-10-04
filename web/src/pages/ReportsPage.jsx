import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { testCasesSeed } from '../data/testCases';

const ReportsPage = () => {
  const [format, setFormat] = useState('csv');

  const handleExport = () => {
    // TODO: Integrate PDF export using pdfmake or jsPDF in future iterations.
  };

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-3xl font-semibold text-slate-900">Reportes</h2>
        <p className="text-slate-500">Genera reportes ejecutivos de tus pruebas.</p>
      </header>
      <div className="bg-white rounded shadow p-4 space-y-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-slate-600">Formato</label>
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
          </select>
        </div>
        {format === 'csv' ? (
          <CSVLink
            data={testCasesSeed}
            filename="qa-companion-test-cases.csv"
            className="inline-block bg-indigo-500 text-white px-4 py-2 rounded"
          >
            Exportar CSV
          </CSVLink>
        ) : (
          <button onClick={handleExport} className="bg-indigo-500 text-white px-4 py-2 rounded">
            Exportar PDF (placeholder)
          </button>
        )}
      </div>
    </section>
  );
};

export default ReportsPage;
