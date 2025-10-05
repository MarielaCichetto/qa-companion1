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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-carbon via-carbonLight to-obsidian px-6 py-12">
      <div className="absolute -left-36 top-10 h-96 w-96 rounded-full bg-cobalt/30 blur-3xl" aria-hidden />
      <div className="absolute right-16 bottom-10 h-80 w-80 rounded-full bg-magenta/25 blur-3xl" aria-hidden />
      <div className="absolute inset-x-0 top-10 mx-auto h-72 w-[60%] max-w-4xl rounded-full bg-neon/10 blur-3xl" aria-hidden />
      <div className="relative grid w-full max-w-5xl gap-8 rounded-[2.5rem] border border-white/10 bg-white/10 p-8 shadow-[0_55px_85px_-45px_rgba(15,23,42,0.85)] backdrop-blur-2xl lg:grid-cols-2 lg:p-12">
        <section className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 text-white">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
              QA Companion
            </span>
            <h1 className="mt-6 text-4xl font-semibold">Controla tu universo QA</h1>
            <p className="mt-4 text-sm text-white/80">
              Gestiona backlog, test cases y bugs desde una cockpit moderna diseñada para squads ágiles con obsesión por la calidad.
            </p>
          </div>
          <div className="mt-8 space-y-4 text-sm text-white/80">
            <p className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cobalt/20 text-cobalt">1</span>
              Diseña suites smoke y regresión con insights automáticos.
            </p>
            <p className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-magenta/20 text-magenta">2</span>
              Orquesta bugs estilo Jira con métricas vivas.
            </p>
            <p className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neon/20 text-neon">3</span>
              Exporta reportes premium en segundos.
            </p>
          </div>
        </section>
        <section className="flex flex-col justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-white">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">Inicia sesión</h2>
            <p className="mt-2 text-sm text-white/70">Ingresa con tus credenciales del squad QA.</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70">Email</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-neon/50 focus:outline-none focus:ring-2 focus:ring-neon/40"
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
                className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-magenta/50 focus:outline-none focus:ring-2 focus:ring-magenta/40"
                placeholder="••••••••"
                required
              />
            </div>
            <button className="w-full rounded-2xl bg-gradient-to-r from-cobalt via-magenta to-neon px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:shadow-lg">
              Entrar al dashboard
            </button>
            <p className="text-xs text-white/60">Próximamente: autenticación federada y biometría en mobile.</p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
