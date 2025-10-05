import { useState } from 'react';
import { motion } from 'framer-motion';
import { AdjustmentsHorizontalIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import ThemeToggle from '../components/ThemeToggle';
import { useAuthStore } from '../store/useAuthStore';
import { useTranslation } from '../hooks/useTranslation';
import { supportedLanguages } from '../i18n/translations';

const SettingsPage = () => {
  const { t } = useTranslation();
  const { user, updateLanguage } = useAuthStore((state) => ({ user: state.user, updateLanguage: state.updateLanguage }));
  const [preferences, setPreferences] = useState({ notifications: true, autoExports: false, compactMode: false });
  const [language, setLanguage] = useState(user?.language || 'es');
  const [updatingLanguage, setUpdatingLanguage] = useState(false);

  const preferenceOptions = [
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
  ];

  const integrations = [
    { title: 'Webhook Jira', description: 'Sincroniza automáticamente incidencias y comentarios bidireccionales.' },
    { title: 'Slack Alerts', description: 'Envía notificaciones a canales de QA cuando un caso cambia de estado.' },
    { title: 'Data Lake', description: 'Conecta Snowflake/BigQuery para dashboards avanzados.' },
    { title: 'Sentry QA', description: 'Correlaciona errores de producción con test cases afectados.' }
  ];

  const handleLanguageUpdate = async (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    if (!user) return;
    setUpdatingLanguage(true);
    try {
      await updateLanguage(newLanguage);
      toast.success(t('Idioma actualizado para la sesión actual.'));
    } catch (error) {
      toast.error(t('No se pudo actualizar el idioma.'));
    } finally {
      setUpdatingLanguage(false);
    }
  };

  return (
    <section className="space-y-10">
      <div className="section-heading">
        <div>
          <h2 className="section-title">{t('Preferencias del workspace')}</h2>
          <p className="text-sm text-slate-300">{t('Personaliza la experiencia visual, automatizaciones y notificaciones para tu squad QA.')}</p>
        </div>
        <ThemeToggle />
      </div>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
        <header className="flex items-center gap-3">
          <AdjustmentsHorizontalIcon className="h-6 w-6 text-neon" />
          <div>
            <h3 className="text-lg font-semibold text-white">{t('Ajustes generales')}</h3>
            <p className="text-sm text-slate-300">{t('Configura opciones de notificación y productividad.')}</p>
          </div>
        </header>
        <div className="mt-6 space-y-5 text-sm text-slate-200">
          {preferenceOptions.map((option) => (
            <label key={option.key} className="flex items-start justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div>
                <p className="text-base font-semibold text-white">{t(option.title)}</p>
                <p className="mt-1 text-xs text-slate-300">{t(option.description)}</p>
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
        <header className="flex items-center gap-3">
          <GlobeAltIcon className="h-6 w-6 text-cobalt" />
          <div>
            <h3 className="text-lg font-semibold text-white">{t('Idioma de la interfaz')}</h3>
            <p className="text-sm text-slate-300">{t('Elige el idioma predilecto para menús, botones y reportes.')}</p>
          </div>
        </header>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {supportedLanguages.map((lang) => (
            <label
              key={lang.code}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition ${
                language === lang.code ? 'border-neon/50 bg-neon/10 text-white' : 'border-white/10 bg-white/5 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <div>
                  <p className="text-sm font-semibold">{lang.label}</p>
                  <p className="text-xs text-slate-300">{t('Aplicar a toda la plataforma')}</p>
                </div>
              </div>
              <input
                type="radio"
                name="language"
                value={lang.code}
                checked={language === lang.code}
                onChange={handleLanguageUpdate}
                className="h-4 w-4 border-white/20 text-neon focus:ring-0"
              />
            </label>
          ))}
        </div>
        {updatingLanguage && <p className="mt-3 text-xs text-neon">{t('Guardando preferencia de idioma...')}</p>}
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
        <h3 className="text-lg font-semibold text-white">{t('Integraciones próximas')}</h3>
        <p className="mt-2 text-sm text-slate-300">{t('Activa pilots de integraciones antes de su release general.')}</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {integrations.map((integration) => (
            <div key={integration.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              <p className="text-base font-semibold text-white">{t(integration.title)}</p>
              <p className="mt-2 text-xs text-slate-400">{t(integration.description)}</p>
              <button className="mt-3 rounded-xl border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-neon hover:border-neon/40 hover:bg-white/10">
                {t('Solicitar acceso beta')}
              </button>
            </div>
          ))}
        </div>
      </motion.section>
    </section>
  );
};

export default SettingsPage;
