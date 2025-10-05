import { useMemo } from 'react';
import { translations } from '../i18n/translations';
import { useI18nStore } from '../store/useI18nStore';

export const useTranslation = () => {
  const language = useI18nStore((state) => state.language);

  return useMemo(
    () => ({
      language,
      t: (key, fallback) => {
        if (!key) return '';
        const value = translations[language]?.[key];
        if (value !== undefined) return value;
        const englishFallback = translations.en?.[key];
        if (englishFallback !== undefined) return englishFallback;
        if (fallback !== undefined) return fallback;
        return key;
      }
    }),
    [language]
  );
};
