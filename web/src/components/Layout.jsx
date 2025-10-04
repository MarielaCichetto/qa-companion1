import Sidebar from './Sidebar';

const Layout = ({ children }) => (
  <div className="flex min-h-screen bg-midnight">
    <Sidebar />
    <main className="relative flex-1 overflow-y-auto bg-transparent">
      <div
        className="pointer-events-none absolute inset-x-10 top-10 hidden h-72 rounded-3xl bg-gradient-to-r from-aurora/40 via-blossom/40 to-ocean/40 blur-3xl lg:block"
        aria-hidden
      />
      <div className="relative min-h-screen px-6 pb-16 pt-10 text-slate-100 sm:px-10">
        <header className="flex flex-col gap-6 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-slate-300">QA Companion</p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
              Panel de control de calidad moderno
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              Visualiza métricas, colabora con tu equipo y acelera la resolución de bugs desde un entorno
              diseñado para analistas QA.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:w-80">
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm text-white/80">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-aurora/20 text-aurora">
                ★
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-300">Sprint actual</p>
                <p className="text-sm font-semibold text-white">QA Sprint 12 · 78% completado</p>
              </div>
            </div>
            <button className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-aurora via-blossom to-ocean px-5 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-lg hover:shadow-aurora/40">
              Crear nuevo reporte
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium">⌘ + R</span>
            </button>
          </div>
        </header>
        <div className="mt-10 space-y-10 lg:space-y-12">{children}</div>
      </div>
    </main>
  </div>
);

export default Layout;
