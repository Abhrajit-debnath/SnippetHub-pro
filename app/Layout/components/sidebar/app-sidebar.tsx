"use client";

import { User2, ChevronUp } from "lucide-react";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import axios from "@/app/config/axios.config";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import Menu from "../menus/nav-menu";

export function AppSidebar() {
  const router = useRouter();
  const { user, clearUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      clearUser();
      router.replace("/auth/signin");
    }
  };

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-sidebarBg">
      <Menu />

      <SidebarFooter className="border-t border-zinc-700">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className="
      py-5 bg-transparent cursor-pointer
      hover:bg-transparent focus:bg-transparent
      active:bg-transparent focus-visible:ring-0
    "
                >
                  <div className="w-full flex items-center">
                    <User2 className="w-5 h-5 text-white" />

                    <span className="ml-3 flex flex-col text-left text-sm">
                      <span className="font-poppins text-white">
                        {user?.username}
                      </span>
                      <span className="text-xs text-muted-foreground font-inter">
                        {user?.isSubscribed ? "Pro Plan" : "Free Plan"}
                      </span>
                    </span>

                    <ChevronUp className="ml-auto w-4 h-4 text-white" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                className="bg-sidebarBg fixed bottom-3 -left-2 w-full space-y-1 border border-zinc-600 p-2"
              >
                <DropdownMenuItem className="focus:bg-zinc-800">
                  <Link
                    href="/dashboard/settings"
                    className="w-full text-white font-poppins"
                  >
                    Account
                  </Link>
                </DropdownMenuItem>

                {!user?.isSubscribed && (
                  <DropdownMenuItem className="focus:bg-zinc-800">
                    <Link
                      href="/dashboard/upgrade"
                      className="w-full text-white font-poppins"
                    >
                      Billing
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  className="focus:bg-zinc-800 cursor-pointer text-red-500 focus:text-red-500 font-medium"
                  onClick={handleLogout}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </aside>
  );
}
