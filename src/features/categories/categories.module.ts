import { getService } from "@/services/service-factory";
import { CategoriesService } from "./categories.service";
import { columns } from "./columns";

class CategoriesModule {
  readonly service = getService(CategoriesService);
  readonly columns = columns;
}

export const categoriesModule = new CategoriesModule();
export { CategoriesPage } from "./index";
export type { CategoriesData } from "./types";
