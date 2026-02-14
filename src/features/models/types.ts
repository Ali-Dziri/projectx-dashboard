export type ModelDataType = {
  id: string;
  name: string;
  brand: {
    id: number;
    name: string;
  };
  slug: string;
  release_date: Date;
};
