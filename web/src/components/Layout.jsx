import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';
import { useQAStore } from '../store/useQAStore';
import { useThemeStore } from '../store/useThemeStore';

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

  useEffect(() => {
    const timer = setTimeout(() => {
      initialize();
    }, 600);

    return () => clearTimeout(timer);
  }, [initialize]);

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
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cobalt">QA Companion</p>
              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Mission Control Center</h1>
              <p className="mt-2 max-w-xl text-sm text-slate-300">
                Monitorea tu pipeline QA, orquesta test cases y convierte datos en decisiones rápidas con una interfaz diseñada
                para squads de alto rendimiento.
              </p>
            </div>
            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:items-end">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cobalt via-magenta to-neon px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cobalt/30"
              >
                Generar reporte instantáneo
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white/90">PDF & CSV</span>
              </motion.button>
            </div>
          </motion.header>
          <div className="mt-10 space-y-10 lg:space-y-12">{loading ? <SkeletonShell /> : children}</div>
        </div>
        <MobileNav />
      </main>
    </div>
  );
};

export default Layout;
