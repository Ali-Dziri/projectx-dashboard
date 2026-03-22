import { BaseApiService } from "@/services/api.service";
import type { QueryParams, PaginatedData } from "@/shared/types/common";
import { PARTS } from "./endpoints.constants";
import type { PartsData, PartsFields, UpsertParts } from "./type";

export class PartsService extends BaseApiService {
  async fetch(params: QueryParams) {
    const [res, err] = await this.apiCallWrapper<PaginatedData<PartsData>>({
      path: PARTS.LIST_PARTS,
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
    const [res, err] = await this.apiCallWrapper<PartsFields>({
      path: PARTS.FIELDS,
      method: "get",
    });

    if (err) {
      throw err;
    }
    return res;
  }

  async add(data: UpsertParts) {
    const [res, err] = await this.apiCallWrapper<PartsData>({
      path: PARTS.ADD_PART,
      method: "post",
      data,
    });

    if (err) {
      throw err;
    }
    return res.data;
  }

  async update(id: string, data: UpsertParts) {
    const [res, err] = await this.apiCallWrapper<PartsData>({
      path: PARTS.UPDATE_PART(id),
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
      path: PARTS.REMOVE_PART(id),
      method: "delete",
    });

    if (err) {
      throw err;
    }
  }
}
