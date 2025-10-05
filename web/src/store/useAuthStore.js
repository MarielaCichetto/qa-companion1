import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';
import { useI18nStore } from './useI18nStore';

const getErrorMessage = (error, fallback) => {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return fallback;
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      status: 'idle',
      error: null,
      hydrated: false,
      async login(payload) {
        set({ status: 'loading', error: null });
        try {
          const data = await authService.login(payload);
          set({ user: data.user, token: data.token, status: 'authenticated' });
          if (data.user?.language) {
            useI18nStore.getState().setLanguage(data.user.language);
          }
          return data.user;
        } catch (error) {
          const message = getErrorMessage(error, 'Unable to login');
          set({ error: message, status: 'error' });
          throw new Error(message);
        }
      },
      async register(payload) {
        set({ status: 'loading', error: null });
        try {
          const data = await authService.register(payload);
          set({ user: data.user, token: data.token, status: 'authenticated' });
          if (data.user?.language) {
            useI18nStore.getState().setLanguage(data.user.language);
          }
          return data.user;
        } catch (error) {
          const message = getErrorMessage(error, 'Unable to register');
          set({ error: message, status: 'error' });
          throw new Error(message);
        }
      },
      async loginWithGoogle(payload) {
        set({ status: 'loading', error: null });
        try {
          const data = await authService.loginWithGoogle(payload);
          set({ user: data.user, token: data.token, status: 'authenticated' });
          if (data.user?.language) {
            useI18nStore.getState().setLanguage(data.user.language);
          }
          return data.user;
        } catch (error) {
          const message = getErrorMessage(error, 'Unable to login with Google');
          set({ error: message, status: 'error' });
          throw new Error(message);
        }
      },
      async updateLanguage(language) {
        const state = get();
        if (!state.user) return;
        try {
          await authService.updateLanguage(state.user.id, language);
          set({ user: { ...state.user, language } });
          useI18nStore.getState().setLanguage(language);
        } catch (error) {
          const message = getErrorMessage(error, 'Unable to update language');
          set({ error: message });
          throw new Error(message);
        }
      },
      logout() {
        set({ user: null, token: null, status: 'idle', error: null });
      },
      markHydrated() {
        set({ hydrated: true });
        const { user } = get();
        if (user?.language) {
          useI18nStore.getState().setLanguage(user.language);
        }
      }
    }),
    {
      name: 'qa-companion-auth',
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated?.();
      }
    }
  )
);
