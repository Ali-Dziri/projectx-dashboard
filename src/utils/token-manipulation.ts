import env from "@/config/env.config";

const CSRF_TOKEN_KEY = env.CSRF_TOKEN_KEY;

export const tokenManager = {
  getCsrfToken: (): string | null => {
    return localStorage.getItem(CSRF_TOKEN_KEY);
  },

  setCsrfToken: (token: string): void => {
    localStorage.setItem(CSRF_TOKEN_KEY, token);
  },

  clearCsrfToken: (): void => {
    localStorage.removeItem(CSRF_TOKEN_KEY);
  },
};
