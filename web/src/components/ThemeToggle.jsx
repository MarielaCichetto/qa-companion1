import { useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useThemeStore } from '../store/useThemeStore';

const ThemeToggle = () => {
  const { theme, toggleTheme, initializeTheme, initialized } = useThemeStore();

  useEffect(() => {
    if (!initialized) {
      initializeTheme();
    }
  }, [initializeTheme, initialized]);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 transition-all hover:border-white/30 hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <MoonIcon className="h-4 w-4 text-cobalt transition-all group-hover:rotate-6" />
      ) : (
        <SunIcon className="h-4 w-4 text-amber-400 transition-all group-hover:rotate-6" />
      )}
      <span>{theme === 'dark' ? 'DARK' : 'LIGHT'}</span>
    </button>
  );
};

export default ThemeToggle;
