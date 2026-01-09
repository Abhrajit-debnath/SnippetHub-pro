"use client";

import {
  LayoutDashboard,
  SquareDashedBottomCode,
  Settings,
  Crown,
  User2,
  ChevronUp,
} from "lucide-react";

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
import Logo from "@/app/auth/components/logo";

const items = [
  { title: "Home", url: "/dashboard/home", icon: LayoutDashboard },
  {
    title: "Snippets",
    url: "/dashboard/snippets",
    icon: SquareDashedBottomCode,
  },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Upgrade to Pro", url: "/dashboard/upgrade", icon: Crown },
];

export function AppSidebar() {
  const pathname = usePathname();
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

  const menuItems = user?.isSubscribed
    ? items.filter((item) => item.title !== "Upgrade to Pro")
    : items;

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-sidebarBg">
      <nav className="flex-1 p-4 space-y-3">
        <Link href="/dashboard/home">
          <Logo className="lg:text-lg pb-5" />
        </Link>

        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.url);

          return (
            <Link
              key={item.url}
              href={item.url}
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2
                text-sm font-poppins font-medium transition-all duration-150

                ${
                  isActive
                    ? "bg-zinc-800 text-white"
                    : item.title === "Upgrade to Pro"
                    ? "text-white"
                    : "text-zinc-300"
                }

                hover:text-white
                focus-visible:outline-none focus-visible:ring-0

                ${
                  item.title === "Upgrade to Pro"
                    ? "mt-3 justify-center bg-buttonColor py-3 hover:bg-buttonColorHover"
                    : "hover:bg-zinc-800"
                }
              `}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

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
