import { BaseApiService } from "@/services/api.service";
import type { BrandsData, UpsertBrand } from "./types";
import type { PaginatedData, QueryParams } from "@/types/common";
import { BRANDS_ENDPOINTS } from "./endpoints.constant";
import { router } from "@/main";
import { toast } from "sonner";

export class BrandsService extends BaseApiService {
  async fetch(params: QueryParams) {
    const [res, err] = await this.apiCallWrapper<PaginatedData<BrandsData>>({
      path: BRANDS_ENDPOINTS.LIST_BRANDS,
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

  async add(data: UpsertBrand): Promise<BrandsData> {
    const [res, err] = await this.apiCallWrapper<BrandsData>({
      path: BRANDS_ENDPOINTS.ADD_BRAND,
      method: "post",
      data,
    });

    if (err) {
      toast.error(err.message);
      throw err;
    }
    router.invalidate();
    toast.success("Brand added successfully");
    return res.data;
  }

  async update(id: string, data: UpsertBrand): Promise<BrandsData> {
    const [res, err] = await this.apiCallWrapper<BrandsData>({
      path: BRANDS_ENDPOINTS.UPDATE_BRAND(id),
      method: "patch",
      data,
    });

    if (err) {
      toast.error(err.message);
      throw err;
    }
    router.invalidate();
    toast.success("Brand updated successfully");
    return res.data;
  }

  async delete(id: string) {
    const [, err] = await this.apiCallWrapper({
      path: BRANDS_ENDPOINTS.REMOVE_BRAND(id),
      method: "delete",
    });

    if (err) {
      toast.error(err.message);
      throw err;
    }
    router.invalidate();
    toast.success("Brand deleted successfully");
  }
}
