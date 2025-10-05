import { create } from 'zustand';

const prefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const useThemeStore = create((set) => ({
  theme: prefersDark() ? 'dark' : 'light',
  initialized: false,
  initializeTheme: () => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('qa-theme') : null;
    const theme = stored || (prefersDark() ? 'dark' : 'light');
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.body.classList.toggle('light', theme === 'light');
    }
    set({ theme, initialized: true });
  },
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', nextTheme === 'dark');
        document.body.classList.toggle('light', nextTheme === 'light');
      }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('qa-theme', nextTheme);
      }
      return { theme: nextTheme };
    })
}));
