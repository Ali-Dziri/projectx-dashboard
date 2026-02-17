export interface CategoriesData {
  id: string;
  name: string;
  description: string;
}

export type UpsertCategory = {
  name: string;
  description?: string;
};
