import { getService } from "@/services/service-factory";
import { PartsService } from "./parts.service";
import { columns } from "./columns";

class PartsModule {
  readonly service = getService(PartsService);
  readonly columns = columns;
}

export const partsModule = new PartsModule();

export { PartsPage } from "./index";
export type { PartsData, UpsertParts, PartsFields } from "./type";
