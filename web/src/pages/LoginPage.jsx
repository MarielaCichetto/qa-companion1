import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-midnight via-[#15173a] to-twilight px-6 py-12">
      <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-aurora/20 blur-3xl" aria-hidden />
      <div className="absolute right-10 bottom-10 h-80 w-80 rounded-full bg-blossom/20 blur-3xl" aria-hidden />
      <div className="relative grid w-full max-w-5xl gap-8 rounded-[2.5rem] border border-white/10 bg-white/10 p-8 backdrop-blur-2xl lg:grid-cols-2 lg:p-12">
        <section className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 text-white">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
              QA Companion
            </span>
            <h1 className="mt-6 text-4xl font-semibold">Revoluciona tu flujo de pruebas</h1>
            <p className="mt-4 text-sm text-white/80">
              Centraliza casos de prueba, seguimiento de bugs y checklists en una sola experiencia visual, moderna y accesible.
            </p>
          </div>
          <div className="mt-8 space-y-4 text-sm text-white/80">
            <p className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-aurora/30 text-aurora">1</span>
              Diseña suites smoke y regresión con plantillas reusables.
            </p>
            <p className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blossom/30 text-blossom">2</span>
              Ejecuta requests API y queries SQL sin salir de la app.
            </p>
            <p className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ocean/30 text-ocean">3</span>
              Exporta reportes elegantes en segundos.
            </p>
          </div>
        </section>
        <section className="flex flex-col justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-white">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">Inicia sesión</h2>
            <p className="mt-2 text-sm text-white/70">Accede a tu espacio colaborativo de QA.</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70">Email</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-aurora/40"
                placeholder="qa.analyst@equipo.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-blossom/40"
                placeholder="••••••••"
                required
              />
            </div>
            <button className="w-full rounded-2xl bg-gradient-to-r from-aurora via-blossom to-ocean px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:shadow-lg">
              Entrar al dashboard
            </button>
            <p className="text-xs text-white/60">
              * Próximamente: autenticación federada y soporte para biometría en mobile.
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
