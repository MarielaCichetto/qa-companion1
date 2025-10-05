import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AtSymbolIcon, LockClosedIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/useAuthStore';
import { useTranslation } from '../hooks/useTranslation';
import { supportedLanguages } from '../i18n/translations';

const GoogleGlyph = () => (
  <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.23 3.6l6.9-6.9C35.67 2.02 30.3 0 24 0 14.62 0 6.51 5.38 2.56 13.16l7.98 6.2C12.33 13.15 17.67 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.1 24.5c0-1.6-.14-3.13-.41-4.6H24v9.03h12.46c-.54 2.9-2.18 5.36-4.64 7.02l7.43 5.77C43.86 37.68 46.1 31.58 46.1 24.5z" />
    <path fill="#FBBC05" d="M10.54 28.96a14.5 14.5 0 0 1-.76-4.46c0-1.54.27-3.02.74-4.4L2.54 13.9A23.93 23.93 0 0 0 0 24.5c0 3.9.93 7.58 2.56 10.84l7.98-6.38z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.92-2.13 15.89-5.79l-7.43-5.77c-2.06 1.4-4.72 2.21-8.46 2.21-6.33 0-11.68-4.22-13.6-9.9l-8.02 6.4C6.54 42.37 14.66 48 24 48z" />
    <path fill="none" d="M0 0h48v48H0z" />
  </svg>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, login, register, loginWithGoogle, status } = useAuthStore((state) => ({
    user: state.user,
    login: state.login,
    register: state.register,
    loginWithGoogle: state.loginWithGoogle,
    status: state.status
  }));

  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: true });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', language: 'es' });
  const [googleForm, setGoogleForm] = useState({ email: '', name: '', language: 'es' });
  const [showGoogleForm, setShowGoogleForm] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const isLoading = useMemo(() => status === 'loading', [status]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(loginForm);
      navigate('/dashboard', { replace: true });
    } catch (authError) {
      setError(authError.message);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await register(registerForm);
      navigate('/dashboard', { replace: true });
    } catch (authError) {
      setError(authError.message);
    }
  };

  const handleGoogle = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await loginWithGoogle(googleForm);
      navigate('/dashboard', { replace: true });
    } catch (authError) {
      setError(authError.message);
    }
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
              {t('QA Companion')}
            </span>
            <h1 className="mt-6 text-4xl font-semibold">{t('Controla tu universo QA')}</h1>
            <p className="mt-4 text-sm text-white/80">
              {t('Gestiona backlog, test cases y bugs desde una cockpit moderna diseñada para squads ágiles con obsesión por la calidad.')}
            </p>
          </div>
          <div className="mt-8 space-y-4 text-sm text-white/80">
            <p className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cobalt/20 text-cobalt">1</span>
              {t('Diseña suites smoke y regresión con insights automáticos.')}
            </p>
            <p className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-magenta/20 text-magenta">2</span>
              {t('Orquesta bugs estilo Jira con métricas vivas.')}
            </p>
            <p className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neon/20 text-neon">3</span>
              {t('Exporta reportes premium en segundos.')}
            </p>
          </div>
        </section>
        <section className="flex flex-col justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-white">
          <div className="mb-6 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 p-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`flex-1 rounded-xl px-4 py-2 transition ${mode === 'login' ? 'bg-white/20 text-white shadow-inner shadow-cobalt/20' : ''}`}
            >
              {t('Iniciar sesión')}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError('');
              }}
              className={`flex-1 rounded-xl px-4 py-2 transition ${mode === 'register' ? 'bg-white/20 text-white shadow-inner shadow-magenta/20' : ''}`}
            >
              {t('Crear cuenta')}
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {t(error)}
            </div>
          )}

          {mode === 'login' ? (
            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-white/70" htmlFor="login-email">
                  {t('Email')}
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
                  <AtSymbolIcon className="h-5 w-5 text-white/40" />
                  <input
                    id="login-email"
                    type="email"
                    value={loginForm.email}
                    onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                    placeholder={t('qa.analyst@equipo.com')}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-white/70" htmlFor="login-password">
                  {t('Password')}
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
                  <LockClosedIcon className="h-5 w-5 text-white/40" />
                  <input
                    id="login-password"
                    type="password"
                    value={loginForm.password}
                    onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                    placeholder="••••••••"
                    minLength={6}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-white/70">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={loginForm.remember}
                    onChange={(event) => setLoginForm((prev) => ({ ...prev, remember: event.target.checked }))}
                    className="h-4 w-4 rounded border-white/20 bg-transparent text-cobalt focus:ring-0"
                  />
                  {t('Mantener sesión iniciada')}
                </label>
                <span className="text-white/40">{t('Credenciales protegidas con cifrado SHA-256')}</span>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cobalt via-magenta to-neon px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:shadow-lg disabled:opacity-70"
              >
                {isLoading ? t('Procesando...') : t('Entrar al dashboard')}
              </button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleRegister}>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-white/70" htmlFor="register-name">
                  {t('Nombre completo')}
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
                  <UserCircleIcon className="h-5 w-5 text-white/40" />
                  <input
                    id="register-name"
                    value={registerForm.name}
                    onChange={(event) => setRegisterForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                    placeholder={t('Ej: Lucía QA Leader')}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-white/70" htmlFor="register-email">
                  {t('Email')}
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
                  <AtSymbolIcon className="h-5 w-5 text-white/40" />
                  <input
                    id="register-email"
                    type="email"
                    value={registerForm.email}
                    onChange={(event) => setRegisterForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                    placeholder={t('qa.analyst@equipo.com')}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-white/70" htmlFor="register-password">
                  {t('Password')}
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
                  <LockClosedIcon className="h-5 w-5 text-white/40" />
                  <input
                    id="register-password"
                    type="password"
                    value={registerForm.password}
                    onChange={(event) => setRegisterForm((prev) => ({ ...prev, password: event.target.value }))}
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                    placeholder="••••••••"
                    minLength={6}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-white/70" htmlFor="register-language">
                  {t('Idioma preferido')}
                </label>
                <select
                  id="register-language"
                  value={registerForm.language}
                  onChange={(event) => setRegisterForm((prev) => ({ ...prev, language: event.target.value }))}
                  className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white focus:border-neon/40 focus:outline-none"
                >
                  {supportedLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="text-slate-900">
                      {lang.flag} {lang.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-magenta via-neon to-cobalt px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:shadow-lg disabled:opacity-70"
              >
                {isLoading ? t('Procesando...') : t('Crear cuenta QA')}
              </button>
            </form>
          )}

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => {
                setShowGoogleForm((prev) => !prev);
                setError('');
              }}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/15"
            >
              <GoogleGlyph />
              {t('Iniciar sesión con Google')}
            </button>
            {showGoogleForm && (
              <form className="space-y-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4" onSubmit={handleGoogle}>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{t('Acceso rápido Google')}</p>
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wide text-white/60" htmlFor="google-email">
                    {t('Email Gmail')}
                  </label>
                  <input
                    id="google-email"
                    type="email"
                    value={googleForm.email}
                    onChange={(event) => setGoogleForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-neon/40 focus:outline-none"
                    placeholder="user@gmail.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wide text-white/60" htmlFor="google-name">
                    {t('Nombre a mostrar')}
                  </label>
                  <input
                    id="google-name"
                    value={googleForm.name}
                    onChange={(event) => setGoogleForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-neon/40 focus:outline-none"
                    placeholder={t('Ej: Marcus Lead')}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wide text-white/60" htmlFor="google-language">
                    {t('Idioma preferido')}
                  </label>
                  <select
                    id="google-language"
                    value={googleForm.language}
                    onChange={(event) => setGoogleForm((prev) => ({ ...prev, language: event.target.value }))}
                    className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-neon/40 focus:outline-none"
                  >
                    {supportedLanguages.map((lang) => (
                      <option key={lang.code} value={lang.code} className="text-slate-900">
                        {lang.flag} {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-white/10 via-neon/40 to-cobalt/40 px-4 py-2 text-sm font-semibold text-white transition hover:from-white/20 hover:to-cobalt/50 disabled:opacity-60"
                >
                  {isLoading ? t('Procesando...') : t('Conectar cuenta Google')}
                </button>
              </form>
            )}
          </div>
          <p className="mt-6 text-[11px] text-white/50">{t('Tus datos se almacenan en SQLite cifrado y puedes actualizar tu idioma en cualquier momento desde Settings → Preferences.')}</p>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
