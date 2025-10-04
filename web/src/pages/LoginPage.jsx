import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Integrate with backend auth provider when available.
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 rounded-lg p-8 shadow-lg space-y-6 w-full max-w-md"
      >
        <div>
          <h1 className="text-2xl font-semibold">QA Companion</h1>
          <p className="text-sm text-slate-400">Inicia sesión para gestionar tus pruebas.</p>
        </div>
        <div className="space-y-2">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            className="w-full rounded bg-slate-700 border border-slate-600 px-3 py-2 focus:outline-none"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm">Password</label>
          <input
            type="password"
            className="w-full rounded bg-slate-700 border border-slate-600 px-3 py-2 focus:outline-none"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 transition rounded px-3 py-2 font-medium"
        >
          Entrar
        </button>
        <p className="text-xs text-slate-500">
          * Autenticación básica pendiente. Considera OAuth/JWT en versiones futuras.
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
