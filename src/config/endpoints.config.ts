import { env } from "./env.config";

const API_VERSION = env.APP_VERSION;

const buildUrl = (path: string): string => {
  return `${env.API_BASE_URL}/${API_VERSION}${path}`;
};

export const USERS_ENDPOINTS = {
  ME: buildUrl("/admins/me"),
} as const;

export const PHONES_ENDPOINTS = {
  PARTS: {
    LIST_PARTS: buildUrl(`/parts`),
    FIELDS: buildUrl(`/parts/fields`),
    ADD_PART: buildUrl(`/parts`),
    UPDATE_PART: (id: string) => buildUrl(`/parts/${id}`),
    REMOVE_PART: (id: string) => buildUrl(`/parts/${id}`),
  },
};
