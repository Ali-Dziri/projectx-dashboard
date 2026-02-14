export const PARTS = {
  LIST_PARTS: `/parts`,
  FIELDS: `/parts/fields`,
  ADD_PART: `/parts`,
  UPDATE_PART: (id: string) => `/parts/${id}`,
  REMOVE_PART: (id: string) => `/parts/${id}`,
} as const;
