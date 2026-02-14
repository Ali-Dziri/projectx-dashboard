export const MODELS = {
  LIST_MODELS: `/models`,
  FIELDS: `/models/fields`,
  ADD_MODEL: `/models`,
  UPDATE_MODEL: (id: string) => `/models/${id}`,
  REMOVE_MODEL: (id: string) => `/models/${id}`,
} as const;
