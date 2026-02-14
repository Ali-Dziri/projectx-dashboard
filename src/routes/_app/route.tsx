import { createFileRoute, redirect } from "@tanstack/react-router";
import RootLayout from "@/layouts/root-layout";
import CustomErrorComponent from "@/components/errors/custom-error-component";
import { tokenManager } from "@/utils/token-manipulation";

export const Route = createFileRoute("/_app")({
  beforeLoad: ({ location }) => {
    if (!tokenManager.getCsrfToken()) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RootLayout,
  errorComponent: CustomErrorComponent,
});
