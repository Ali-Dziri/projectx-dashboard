import { getService } from "@/services/service-factory";
import { ModelsService } from "./models.service";
import { columns } from "./columns";

class ModelsModule {
  readonly service = getService(ModelsService);
  readonly columns = columns;
}

export const modelsModule = new ModelsModule();
export { ModelsPage } from "./index";
export type { ModelDataType, Fields } from "./types";
