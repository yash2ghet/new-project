"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  ChevronsUpDownIcon,
  SparklesIcon,
  BadgeCheckIcon,
  CreditCardIcon,
  BellIcon,
  LogOutIcon,
} from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { useSession } from "./session-provider"

import { getAccronym } from "@/lib/utils"

import { useState } from "react"

import { toast } from "sonner";

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {

  const { isMobile } = useSidebar()

  const { session } = useSession()

  const accronym = session
    ? getAccronym(`${session.firstName} ${session.lastName}`)
    : ""

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
  setLogoutLoading(true);
  try {
    // Perform logout logic here
    const token = localStorage.getItem("authToken");

    const logoutAPIUrl = "http://localhost:4000/api/v1/auth/logout"; // Update with your backend URL

    await fetch(logoutAPIUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error during logout:", error);
    toast.error("Failed to log out. Please try again.");
  } finally {
    setLogoutLoading(false);
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // Redirect to login page after logout
  }
};

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>

            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >

                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                  />

                  <AvatarFallback className="rounded-lg">
                    {accronym}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.name}
                  </span>

                  <span className="truncate text-xs">
                    {user.email}
                  </span>
                </div>

                <ChevronsUpDownIcon className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >

              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">

                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user.avatar}
                      alt={user.name}
                    />

                    <AvatarFallback className="rounded-lg">
                      {accronym}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user.name}
                    </span>

                    <span className="truncate text-xs">
                      {user.email}
                    </span>
                  </div>

                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <SparklesIcon />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>

                <DropdownMenuItem>
                  <BadgeCheckIcon />
                  Account
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <CreditCardIcon />
                  Billing
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <BellIcon />
                  Notifications
                </DropdownMenuItem>

              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() =>
                  setShowLogoutDialog(true)
                }
                disabled={logoutLoading}
              >
                <LogOutIcon />
                Log out
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <AlertDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
      >

        <AlertDialogContent>

          <AlertDialogHeader>

            <AlertDialogTitle style={{ color: "#4b5563" }}>
              Are you absolutely sure?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action will log you out from your account.
            </AlertDialogDescription>

          </AlertDialogHeader>

          <AlertDialogFooter>

            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleLogout}
              disabled = {logoutLoading}
            >
              Yes, log me out
            </AlertDialogAction>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>
    </>
  )
}