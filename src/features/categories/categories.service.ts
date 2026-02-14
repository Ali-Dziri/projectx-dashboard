import { router } from "@/main";
import { BaseApiService } from "@/services/api.service";
import type { PaginatedData, QueryParams } from "@/types/common";
import { toast } from "sonner";

const CATEGORIES = {
  LIST_CATEGORIES: "/categories",
  ADD_CATEGORY: "/categories",
  UPDATE_CATEGORY: (id: string) => `/categories/${id}`,
  REMOVE_CATEGORY: (id: string) => `/categories/${id}`,
};

interface CategoriesData {
  id: string;
  name: string;
  description: string;
}

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

  async add(data: { name: string; description?: string }) {
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

  async delete(id: string) {
    const [res, err] = await this.apiCallWrapper({
      path: CATEGORIES.REMOVE_CATEGORY(id),
      method: "delete",
    });

    if (err) {
      toast.error(err.message);
      throw err;
    }
    router.invalidate();
    toast.success("Category deleted successfully");
    return res;
  }
}
