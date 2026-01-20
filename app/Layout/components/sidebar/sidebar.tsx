"use client";

import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import SidebarMenus from "@/app/Layout/components/snippet/sidebar-menus";

type SidebarProps = {
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ toggleSidebar, setToggleSidebar }: SidebarProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside
      className={`fixed top-0 left-0 z-20 h-screen w-64 lg:hidden
       bg-sidebarBg
        text-white
        transform transition-transform duration-300 ease-in-out
        ${toggleSidebar ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <button
        type="button"
        className="rotate-45 fixed right-5 top-4"
        onClick={() => setToggleSidebar(false)}
      >
        <Plus className="text-white" />
      </button>

      <SidebarMenus setToggleSidebar={setToggleSidebar}/>
    </aside>
  );
};

export default Sidebar;
