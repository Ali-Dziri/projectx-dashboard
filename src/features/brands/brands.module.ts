import { getService } from "@/services/service-factory";
import { BrandsService } from "./brands.service";
import { columns } from "./columns";

class BrandsModule {
  readonly service = getService(BrandsService);
  readonly column = columns;
}

export const brandsModule = new BrandsModule();
export { BrandsPage } from "./index";
export type { BrandsData, BrandsPageProps } from "./types";
