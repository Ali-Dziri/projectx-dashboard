export type ModelDataType = {
  id: string;
  name: string;
  brand: {
    id: string;
    name: string;
  };
  slug: string;
  release_date: Date;
};

export type Fields = {
  brands: Array<{ id: string; name: string }>;
};

export type UpsertModel = {
  name: string;
  brand: string;
  release_date?: Date;
};
