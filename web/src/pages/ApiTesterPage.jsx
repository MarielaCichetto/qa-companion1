import { useState } from 'react';
import apiClient from '../services/apiClient';

const ApiTesterPage = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('/health');
  const [body, setBody] = useState('{}');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const requestConfig = {
        url,
        method,
        headers: { 'Content-Type': 'application/json' }
      };
      if (method !== 'GET') {
        try {
          requestConfig.data = JSON.parse(body);
        } catch (parseError) {
          setResponse({ error: 'Body inválido, usa JSON válido', details: parseError.message });
          setLoading(false);
          return;
        }
      }
      const { data, status } = await apiClient(requestConfig);
      setResponse({ data, status });
    } catch (error) {
      setResponse({ error: error.message, status: error.response?.status });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-3xl font-semibold text-slate-900">API Tester</h2>
        <p className="text-slate-500">
          Envía requests simples. Extiende con colección de requests y entornos en próximas versiones.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 space-y-4">
        <div className="flex space-x-4">
          <select value={method} onChange={(event) => setMethod(event.target.value)} className="border rounded px-3 py-2">
            {['GET', 'POST', 'PUT', 'DELETE'].map((verb) => (
              <option key={verb} value={verb}>
                {verb}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="border rounded flex-1 px-3 py-2"
            placeholder="/api/resource"
          />
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
        {method !== 'GET' && (
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            className="border rounded px-3 py-2 w-full"
            rows={5}
          />
        )}
      </form>
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold text-lg">Respuesta</h3>
        <pre className="bg-slate-900 text-slate-100 mt-2 p-4 rounded text-xs overflow-x-auto">
          {response ? JSON.stringify(response, null, 2) : 'Aún no se envió una request.'}
        </pre>
      </div>
    </section>
  );
};

export default ApiTesterPage;
