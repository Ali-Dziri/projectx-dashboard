import { router } from "@/main";
import { BaseApiService } from "@/services/api.service";
import type { PaginatedData, QueryParams } from "@/types/common";
import { toast } from "sonner";
import type { CategoriesData, UpsertCategory } from "./types";

const CATEGORIES = {
  LIST_CATEGORIES: "/categories",
  ADD_CATEGORY: "/categories",
  UPDATE_CATEGORY: (id: string) => `/categories/${id}`,
  REMOVE_CATEGORY: (id: string) => `/categories/${id}`,
};

export class CategoriesService extends BaseApiService {
  async fetch(params: QueryParams) {
    const [res, err] = await this.apiCallWrapper<PaginatedData<CategoriesData>>(
      {
        path: CATEGORIES.LIST_CATEGORIES,
        method: "get",
        config: {
          params,
        },
      },
    );

    if (err) {
      throw err;
    }
    return res;
  }

  async add(data: UpsertCategory) {
    const [res, err] = await this.apiCallWrapper<CategoriesData>({
      path: CATEGORIES.ADD_CATEGORY,
      method: "post",
      data,
    });

    if (err) {
      toast.error(err.message);
      throw err;
    }
    router.invalidate();
    toast.success("Category added successfully");
    return res.data;
  }

  async update(id: string, data: UpsertCategory) {
    const [res, err] = await this.apiCallWrapper<CategoriesData>({
      path: CATEGORIES.UPDATE_CATEGORY(id),
      method: "patch",
      data,
    });

    if (err) {
      toast.error(err.message);
      throw err;
    }
    router.invalidate();
    toast.success("Category updated successfully");
    return res.data;
  }

  async delete(id: string) {
    const [, err] = await this.apiCallWrapper({
      path: CATEGORIES.REMOVE_CATEGORY(id),
      method: "delete",
    });

    if (err) {
      toast.error(err.message);
      throw err;
    }
    router.invalidate();
    toast.success("Category deleted successfully");
  }
}
