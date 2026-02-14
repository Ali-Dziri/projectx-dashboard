import type { PaginatedData } from "@/types/common";

export type BrandsData = {
  id: string;
  name: string;
  website: string;
  countryOfOrigin: string;
};

export type BrandsPageProps = PaginatedData<BrandsData>;
