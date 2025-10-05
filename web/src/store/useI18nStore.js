import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useI18nStore = create(
  persist(
    (set) => ({
      language: 'es',
      setLanguage: (language) => set({ language })
    }),
    {
      name: 'qa-companion-i18n'
    }
  )
);
