import { Outlet } from "@tanstack/react-router";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { AppSidebar } from "@/shared/components/app-sidebar";
import CustomBreadcrumb from "@/shared/components/custom-breadcrumb";
import ToggleTheme from "@/shared/components/toggle-theme";
import { Progress } from "@/shared/components/ui/progress";
import { router } from "@/main";
import { useState } from "react";

export default function RootLayout() {
  const [display, setDisplay] = useState(false);

  router.subscribe("onBeforeLoad", ({ pathChanged }) => {
    setDisplay(() => pathChanged && true);
  });
  router.subscribe("onResolved", () => {
    setDisplay(false);
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <CustomBreadcrumb />
          </div>
          <ToggleTheme />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          {display && <Progress indeterminate />}
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
