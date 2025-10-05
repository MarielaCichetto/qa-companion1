import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';
import { useQAStore } from '../store/useQAStore';
import { useThemeStore } from '../store/useThemeStore';
import { useTranslation } from '../hooks/useTranslation';

const SkeletonShell = () => (
  <div className="space-y-8">
    {[1, 2, 3].map((section) => (
      <div
        key={section}
        className="glass-panel flex flex-col gap-4 border-white/5 bg-white/5 p-6 text-slate-200 shadow-none backdrop-blur-xl"
      >
        <div className="h-6 w-48 animate-pulse rounded-full bg-white/10" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-24 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

const Layout = ({ children }) => {
  const { loading, initialize } = useQAStore((state) => ({ loading: state.loading, initialize: state.initialize }));
  const theme = useThemeStore((state) => state.theme);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      initialize();
    }, 600);

    return () => clearTimeout(timer);
  }, [initialize]);

  const renderedContent = loading ? <SkeletonShell /> : children ?? <Outlet />;

  return (
    <div className={`flex min-h-screen ${theme === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-carbon text-slate-100'}`}>
      <Sidebar />
      <main className="relative flex-1 overflow-y-auto bg-transparent pb-28 lg:pb-0">
        <div className="pointer-events-none absolute inset-x-10 top-0 hidden h-80 rounded-3xl bg-gradient-to-r from-cobalt/20 via-magenta/25 to-neon/20 blur-3xl lg:block" />
        <div className="relative min-h-screen px-5 pb-16 pt-10 sm:px-10">
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-panel flex flex-col gap-6 border-white/10 bg-white/10 text-slate-100 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cobalt via-magenta to-neon text-lg font-semibold text-white shadow-glow">
                QA
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cobalt">{t('QA Companion')}</p>
                <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{t('Mission Control Center')}</h1>
                <p className="mt-2 max-w-xl text-sm text-slate-300">
                  {t(
                    'Monitorea tu pipeline QA, orquesta test cases y convierte datos en decisiones rápidas con una interfaz diseñada para squads de alto rendimiento.'
                  )}
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:items-end">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cobalt via-magenta to-neon px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cobalt/30"
              >
                {t('Generar reporte instantáneo')}
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white/90">PDF &amp; CSV</span>
              </motion.button>
            </div>
          </motion.header>
          <div className="mt-10 space-y-10 lg:space-y-12">{renderedContent}</div>
        </div>
        <MobileNav />
      </main>
    </div>
  );
};

export default Layout;
