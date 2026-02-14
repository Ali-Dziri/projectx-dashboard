import { Outlet } from "@tanstack/react-router";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import ToggleTheme from "@/components/toggle-theme";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout() {
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
          <Outlet />
        </main>
      </SidebarInset>
      <Toaster position="top-center" />
    </SidebarProvider>
  );
}
