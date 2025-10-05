import { useState } from 'react';
import { motion } from 'framer-motion';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import ThemeToggle from '../components/ThemeToggle';

const SettingsPage = () => {
  const [preferences, setPreferences] = useState({ notifications: true, autoExports: false, compactMode: false });

  return (
    <section className="space-y-10">
      <div className="section-heading">
        <div>
          <h2 className="section-title">Preferencias del workspace</h2>
          <p className="text-sm text-slate-300">
            Personaliza la experiencia visual, automatizaciones y notificaciones para tu squad QA.
          </p>
        </div>
        <ThemeToggle />
      </div>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
        <header className="flex items-center gap-3">
          <AdjustmentsHorizontalIcon className="h-6 w-6 text-neon" />
          <div>
            <h3 className="text-lg font-semibold text-white">Ajustes generales</h3>
            <p className="text-sm text-slate-300">Configura opciones de notificación y productividad.</p>
          </div>
        </header>
        <div className="mt-6 space-y-5 text-sm text-slate-200">
          {[
            {
              key: 'notifications',
              title: 'Notificaciones en tiempo real',
              description: 'Recibe alertas cuando un bug crítico cambia de estado o se exporta un reporte.'
            },
            {
              key: 'autoExports',
              title: 'Programar exportaciones automáticas',
              description: 'Envía reportes semanales al correo del squad los lunes a las 9 AM.'
            },
            {
              key: 'compactMode',
              title: 'Modo compacto',
              description: 'Reduce la densidad de las tarjetas para pantallas pequeñas o revisiones rápidas.'
            }
          ].map((option) => (
            <label key={option.key} className="flex items-start justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div>
                <p className="text-base font-semibold text-white">{option.title}</p>
                <p className="mt-1 text-xs text-slate-300">{option.description}</p>
              </div>
              <input
                type="checkbox"
                checked={preferences[option.key]}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    [option.key]: event.target.checked
                  }))
                }
                className="h-6 w-12 cursor-pointer rounded-full border-2 border-white/20 bg-white/10 text-cobalt transition focus:ring-0"
              />
            </label>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
        <h3 className="text-lg font-semibold text-white">Integraciones próximas</h3>
        <p className="mt-2 text-sm text-slate-300">Activa pilots de integraciones antes de su release general.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            {
              title: 'Webhook Jira',
              description: 'Sincroniza automáticamente incidencias y comentarios bidireccionales.'
            },
            {
              title: 'Slack Alerts',
              description: 'Envía notificaciones a canales de QA cuando un caso cambia de estado.'
            },
            {
              title: 'Data Lake',
              description: 'Conecta Snowflake/BigQuery para dashboards avanzados.'
            },
            {
              title: 'Sentry QA',
              description: 'Correlaciona errores de producción con test cases afectados.'
            }
          ].map((integration) => (
            <div key={integration.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              <p className="text-base font-semibold text-white">{integration.title}</p>
              <p className="mt-2 text-xs text-slate-400">{integration.description}</p>
              <button className="mt-3 rounded-xl border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-neon hover:border-neon/40 hover:bg-white/10">
                Solicitar acceso beta
              </button>
            </div>
          ))}
        </div>
      </motion.section>
    </section>
  );
};

export default SettingsPage;
