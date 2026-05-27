import { Outlet, Navigate } from "react-router";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "../components/ui/sidebar";

import { AppSidebar } from "../components/app-sidebar";
import { Separator } from "../components/ui/separator";
import { SessionProvider } from "../components/session-provider";

const Private = () => {

  // CHECK TOKEN
  const token = localStorage.getItem("authToken");

  // IF NO TOKEN → REDIRECT TO LOGIN
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SessionProvider>

      <SidebarProvider>

        <AppSidebar />

        <SidebarInset>

          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">

            <div className="flex items-center gap-2">

              <SidebarTrigger className="-ml-1" />

              <Separator orientation="vertical" className="mr-2 h-4" />

              <div className="flex items-center gap-2">

                <span className="text-sm font-medium text-muted-foreground">
                  Build Your Application
                </span>

                <span className="text-sm font-medium text-muted-foreground">
                  /
                </span>

                <span className="text-sm font-medium">
                  Dashboard
                </span>

              </div>
            </div>

          </header>

          <div className="flex flex-1 flex-col gap-4 p-4">
            <Outlet />
          </div>

        </SidebarInset>

      </SidebarProvider>

    </SessionProvider>
  );
};

export default Private;