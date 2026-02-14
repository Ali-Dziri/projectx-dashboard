import { BaseApiService } from "@/services/api.service";
import type { QueryParams, PaginatedData } from "@/types/common";
import { MODELS } from "./endpoints.constant";
import { router } from "@/main";
import { toast } from "sonner";
import type { ModelDataType } from "./types";

type Fields = {
  brands: Array<{ id: string; name: string }>;
};

export class ModelsService extends BaseApiService {
  async fetch(params: QueryParams) {
    const [res, err] = await this.apiCallWrapper<PaginatedData<ModelDataType>>({
      path: MODELS.LIST_MODELS,
      method: "get",
      config: {
        params,
      },
    });

    if (err) {
      throw err;
    }
    return res;
  }

  async fields() {
    const [res, err] = await this.apiCallWrapper<Fields>({
      path: MODELS.FIELDS,
      method: "get",
    });

    if (err) {
      throw err;
    }
    return res;
  }

  async add(data: { name: string; brand: string; release_date?: Date }) {
    const [res, err] = await this.apiCallWrapper<ModelDataType>({
      path: MODELS.ADD_MODEL,
      method: "post",
      data,
    });

    if (err) {
      toast.error(err.message);
      throw err;
    }
    router.invalidate();
    toast.success("Model added successfully");
    return res.data;
  }

  async delete(id: string) {
    const [res, err] = await this.apiCallWrapper({
      path: MODELS.REMOVE_MODEL(id),
      method: "delete",
    });

    if (err) {
      toast.error(err.message);
      throw err;
    }
    router.invalidate();
    toast.success("Model deleted successfully");
    return res;
  }
}
