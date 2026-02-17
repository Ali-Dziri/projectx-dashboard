import { AUTH_ENDPOINTS } from "./endpoints.constant";
import { BaseApiService } from "@/services/api.service";
import type { LoginFormValues } from "./types";
import { toast } from "sonner";
import { tokenManager } from "@/utils/token-manipulation";
import { router } from "@/main";

export class AuthService extends BaseApiService {
  login = async (values: LoginFormValues) => {
    const [response, error] = await this.apiCallWrapper<string>({
      path: AUTH_ENDPOINTS.LOGIN,
      method: "post",
      data: values,
    });

    if (error) {
      toast.error(error.message);
      throw error;
    }
    tokenManager.setCsrfToken(response.data);
    toast.success("Login successful");
    router.navigate({
      to: "/",
    });
  };

  logout = async (): Promise<void> => {
    const [, error] = await this.apiCallWrapper({
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
  };
}
