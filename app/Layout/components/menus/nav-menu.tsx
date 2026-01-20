"use client";

import React from "react";
import {
  LayoutDashboard,
  SquareDashedBottomCode,
  Settings,
  Crown,
  BrainCircuit,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/app/auth/components/logo";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";

type MenuProps = {
  setToggleSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
};
const Menu = ({ setToggleSidebar }: MenuProps) => {
  const { user } = useAuthStore();
  const pathname = usePathname();

  const commonMenu = [
    { title: "Home", url: "/dashboard/home", icon: LayoutDashboard },
    {
      title: "Snippets",
      url: "/dashboard/snippets",
      icon: SquareDashedBottomCode,
    },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
  ];

  const proMenu = [
    {
      title: "Chat with Snippet AI",
      url: "/dashboard/chat-with-ai",
      icon: BrainCircuit,
    },
  ];

  const freeMenu = [
    {
      title: "Upgrade to Pro",
      url: "/dashboard/upgrade",
      icon: Crown,
    },
  ];

  return (
    <nav className="flex-1 p-4 space-y-3">
      <Link href="/dashboard/home">
        <Logo className="lg:text-lg pb-5" />
      </Link>

      {commonMenu.map((item) => {
        const isActive = pathname.startsWith(item.url);
        return (
          <Link
            onClick={() => setToggleSidebar?.(false)}
            key={item.url}
            href={item.url}
            className={`
                flex items-center gap-3 rounded-lg px-3 py-4
                text-sm font-poppins font-medium transition-all duration-150
${isActive ? "text-white bg-zinc-800 " : "text-zinc-300 hover:bg-zinc-800"}
                hover:text-white
                focus-visible:outline-none focus-visible:ring-0

             }
              `}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        );
      })}

       

      {!user?.isSubscribed
        ? freeMenu.map((item) => {
            const isActive = pathname.startsWith(item.url);
            return (
              <Link
                key={item.url}
                href={item.url}
                className={`
                flex items-center gap-3 rounded-lg px-3 
                text-sm font-poppins font-medium transition-all duration-150 text-white mt-3 justify-center bg-buttonColor py-3 hover:bg-buttonColorHover

       ${isActive ? "text-white" : "text-zinc-300 hover:bg-buttonColorHover"}
                

             }
              `}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            );
          })
       
        : proMenu.map((item) => {
            const isActive = pathname.startsWith(item.url);
            return (
              <Link
                onClick={() => setToggleSidebar?.(false)}
                key={item.url}
                href={item.url}
                className={`
                flex items-center gap-3 rounded-lg px-3 py-4
                text-sm font-poppins font-medium transition-all duration-150  hover:text-white ${
                  isActive
                    ? "text-white bg-zinc-800 "
                    : "text-zinc-300 hover:bg-zinc-800"
                }
                focus-visible:outline-none focus-visible:ring-0

                

             }
              `}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            );
          })}
    </nav>
  );
};

export default Menu;
