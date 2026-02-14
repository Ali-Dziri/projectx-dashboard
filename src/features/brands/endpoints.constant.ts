export const BRANDS_ENDPOINTS = {
  LIST_BRANDS: "/brands",
  ADD_BRAND: "/brands",
  UPDATE_BRAND: (id: string) => `/brands/${id}`,
  REMOVE_BRAND: (id: string) => `/brands/${id}`,
} as const;
