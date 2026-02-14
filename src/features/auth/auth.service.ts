import { AUTH_ENDPOINTS } from "./endpoints.constant";
import { BaseApiService } from "@/services/api.service";
import type { LoginFormValues, LoginResponse } from "./types";
import { toast } from "sonner";
import { tokenManager } from "@/utils/token-manipulation";
import { router } from "@/main";

export class AuthService extends BaseApiService {
  async login(values: LoginFormValues) {
    const [response, error] = await this.apiCallWrapper<LoginResponse>({
      path: AUTH_ENDPOINTS.LOGIN,
      method: "post",
      data: values,
    });

    if (error) {
      toast.error(error.message);
      throw error;
    }
    tokenManager.setCsrfToken(response.data.csrfToken);
    toast.success("Login successful");
    router.navigate({
      to: "/",
    });
  }

  async logout(): Promise<void> {
    const [res, error] = await this.apiCallWrapper({
      path: AUTH_ENDPOINTS.LOGOUT,
      method: "post",
    });

    if (error) {
      tokenManager.clearCsrfToken();
      toast.error(error.message);
      router.navigate({
        to: "/login",
      });
    }
    tokenManager.clearCsrfToken();
    toast.success("Logout successful");
    router.navigate({
      to: "/login",
    });
  }
}
