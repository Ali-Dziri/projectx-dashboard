import { BaseApiService } from "@/services/api.service";
import type { QueryParams, PaginatedData } from "@/shared/types/common";
import { MODELS } from "./endpoints.constant";
import type { ModelDataType, Fields, UpsertModel } from "./types";

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

  async add(data: UpsertModel) {
    const [res, err] = await this.apiCallWrapper<ModelDataType>({
      path: MODELS.ADD_MODEL,
      method: "post",
      data,
    });

    if (err) {
      throw err;
    }
    return res.data;
  }

  async update(id: string, data: UpsertModel) {
    const [res, err] = await this.apiCallWrapper<ModelDataType>({
      path: MODELS.UPDATE_MODEL(id),
      method: "patch",
      data,
    });

    if (err) {
      throw err;
    }
    return res.data;
  }

  async delete(id: string) {
    const [, err] = await this.apiCallWrapper({
      path: MODELS.REMOVE_MODEL(id),
      method: "delete",
    });

    if (err) {
      throw err;
    }
  }
}
