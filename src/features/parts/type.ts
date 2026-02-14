export type PartsData = {
  id: string;
  name: string;
  model: {
    id: string;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  compatible_models: Array<{ id: string; name: string }>;
};

export type PartsFormData = {
  name: string;
  modelId: string;
  categoryId: string;
  compatible_models: (string | undefined)[] | undefined;
};

export type PartsFields = {
  models: Array<{ id: string; name: string }>;
  categories: Array<{ id: string; name: string }>;
};
