import { useState } from 'react';
import StatusPill from '../components/StatusPill';
import { useTranslation } from '../hooks/useTranslation';

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const ApiTesterPage = () => {
  const { t } = useTranslation();
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.qa-companion.dev/v1/test-cases');
  const [body, setBody] = useState('{\n  "status": "passed"\n}');
  const [response, setResponse] = useState('');
  const [statusCode, setStatusCode] = useState(null);

  const handleSend = (event) => {
    event.preventDefault();
    setStatusCode(200);
    setResponse(JSON.stringify({ message: `${t('Simulación')} ${method} → ${url}`, body }, null, 2));
  };

  const displayedResponse = response || t('Aún no se envió una request.');

  return (
    <section className="space-y-8">
      <header className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold text-white">{t('API Tester estilo Postman')}</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          {t('Ejecuta peticiones REST sin salir del dashboard. Guarda presets, añade headers y visualiza respuestas formateadas.')}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <form
          onSubmit={handleSend}
          className="space-y-5 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg"
        >
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/10 p-2 text-xs font-semibold uppercase tracking-wide text-white/70">
              {methods.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMethod(option)}
                  className={`rounded-2xl px-4 py-2 transition ${
                    method === option
                      ? 'bg-gradient-to-r from-aurora to-indigo-500 text-white shadow shadow-aurora/30'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              className="flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-ocean/40"
              placeholder="https://api..."
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70">{t('Headers (JSON)')}</label>
              <textarea
                rows={6}
                defaultValue={JSON.stringify({ 'Content-Type': 'application/json' }, null, 2)}
                className="h-full w-full rounded-2xl border border-white/10 bg-[#0f172a]/60 px-4 py-3 font-mono text-xs text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-aurora/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70">{t('Body')}</label>
              <textarea
                rows={6}
                value={body}
                onChange={(event) => setBody(event.target.value)}
                className="h-full w-full rounded-2xl border border-white/10 bg-[#0f172a]/60 px-4 py-3 font-mono text-xs text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-blossom/40"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs text-white/70">
              <StatusPill label={t('Ambiente: Staging')} variant="info" />
              <StatusPill label={t('Auth pendiente')} variant="warning" />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="rounded-2xl border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/70 transition hover:border-white/30 hover:text-white"
              >
                {t('Guardar preset')}
              </button>
              <button className="rounded-2xl bg-gradient-to-r from-ocean via-aurora to-blossom px-6 py-2 text-sm font-semibold text-white shadow-glow transition hover:shadow-lg">
                {t('Ejecutar request')}
              </button>
            </div>
          </div>
        </form>

        <aside className="space-y-4 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">{t('Respuesta')}</h3>
            {statusCode ? (
              <StatusPill label={`${t('Status')} ${statusCode}`} variant={statusCode >= 400 ? 'danger' : 'success'} />
            ) : (
              <StatusPill label={t('Pendiente')} variant="info" />
            )}
          </div>
          <pre className="max-h-96 overflow-auto rounded-2xl border border-white/10 bg-[#0a1224]/80 p-5 text-xs text-emerald-100">
{displayedResponse}
          </pre>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
            <p className="font-semibold text-white">{t('Roadmap')}</p>
            <ul className="mt-2 space-y-2 list-disc pl-4">
              <li>{t('Historial de requests con etiquetas.')}</li>
              <li>{t('Autenticación con tokens seguros y variables de entorno.')}</li>
              <li>{t('Comparación visual de respuestas entre ambientes.')}</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ApiTesterPage;
