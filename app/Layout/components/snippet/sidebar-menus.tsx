"use client";
import Link from "next/link";
import {
  Settings,
  SquareDashedBottomCode,
  LayoutDashboard,
  Crown,
} from "lucide-react";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import axios from "@/app/config/axios.config";
import { User2, ChevronUp } from "lucide-react";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import Logo from "@/app/auth/components/logo";

const SidebarMenus = () => {
  const { user, clearUser } = useAuthStore();
  const router = useRouter();

  // Logout Function

  const handleLogout = async () => {
    await axios.post("/auth/logout");
    clearUser();
    router.replace("/auth/signin");
  };

  // Menu options

  const items = [
    {
      title: "Home",
      url: "/dashboard/home",
      icon: LayoutDashboard,
    },
    {
      title: "Snippets",
      url: "/dashboard/snippets",
      icon: SquareDashedBottomCode,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Upgrade to Pro",
      url: "/dashboard/upgrade",
      icon: Crown,
    },
  ];

  const menuItems = user?.isSubscribed
    ? items.filter((item) => item.title !== "Upgrade to Pro")
    : items;

  return (
    <div className="flex flex-col h-full">
      <nav className="flex flex-col space-y-4 flex-1 p-4">
        <Link href="/dashboard/home">
          <Logo className="" />
        </Link>
        {menuItems.map(({ url, title, icon: Icon }) => (
          <Link
            key={url}
            href={url}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-300
                      hover:bg-zinc-800 hover:text-white
                     transition-all duration-200 ${
                       title === "Upgrade to Pro"
                         ? "bg-buttonColor py-3 flex items-center justify-center"
                         : ""
                     }`}
          >
            <Icon className="w-5 h-5" />
            <span className="capitalize font-medium font-poppins text-sm">
              {title}
            </span>
          </Link>
        ))}
      </nav>

      <SidebarFooter className="border-t border-zinc-700">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="py-5 ">
                  <User2 className="w-5 h-5 text-zinc-800text-white" />
                  <span className="flex flex-col text-left text-sm">
                    <span className="font-poppins text-white">
                      {user?.username}
                    </span>
                    <span className="text-xs text-muted-foreground font-inter">
                      {user?.isSubscribed ? "Pro Plan" : "Free Plan"}
                    </span>
                  </span>
                  <ChevronUp className="ml-auto w-4 h-4 text-white" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                className="bg-sidebarBg w-full fixed bottom-3 p-2 -left-2 space-y-1 border-zinc-600"
              >
                <DropdownMenuItem
                  className="text-white font-poppins
             focus:bg-zinc-800 focus:text-white
             data-highlighted:bg-zinc-800"
                >
                  <Link
                    href="/dashboard/settings"
                    className="xl:text-[15px] font-poppins text-white"
                  >
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-white font-poppins
             focus:bg-zinc-800 focus:text-white
             data-highlighted:bg-zinc-800"
                >
                  <Link
                    href="/dashboard/upgrade"
                    className="xl:text-[15px] font-poppins text-white hover:bg-none"
                  >
                    Billing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="xl:text-[15px] font-poppins text-red-500
             focus:bg-zinc-800 focus:text-white
             data-highlighted:bg-zinc-800"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </div>
  );
};

export default SidebarMenus;
