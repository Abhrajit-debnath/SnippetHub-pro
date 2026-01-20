"use client";

import { useEffect, useRef, useState } from "react";
import DashboardHeader from "@/app/auth/components/dashboard-header";
import Sidebar from "@/app/Layout/components/sidebar/sidebar";
import { AppSidebar } from "@/app/Layout/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import AuthProvider from "@/app/providers/auth-provider";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // <SidebarProvider>
    //   <Toaster
    //     className="font-poppins"
    //     position="top-right"
    //     toastOptions={{
    //       className: "font-poppins max-w-sm w-full",
    //     }}
    //   />
    //   <div className="hidden lg:block">
    //     <AppSidebar />
    //   </div>
    //   <div className="flex min-h-screen w-full">
    //     {/* Sidebar */}
    //     <Sidebar
    //       toggleSidebar={toggleSidebar}
    //       setToggleSidebar={setToggleSidebar}
    //     />

    //     {/* Main Content */}
    //     <main className="flex-1 px-4 py-3 bg-backgroundBg min-h-screen">
    //       <div className="lg:hidden">
    //         <DashboardHeader
    //           toggleSidebar={toggleSidebar}
    //           setToggleSidebar={setToggleSidebar}
    //         />
    //       </div>
    //       <div className="hidden lg:block">
    //         <SidebarTrigger />
    //       </div>
    //       {children}
    //     </main>
    //   </div>
    // </SidebarProvider>
    <AuthProvider>
      <SidebarProvider>
        <Toaster className="" />

        <div className="flex min-h-screen w-full bg-backgroundBg overflow-auto">
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <AppSidebar />
          </div>

          {/* Mobile sidebar */}
          <Sidebar
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
          />

          {/* Main */}

          <div
            className={`lg:hidden fixed top-0 w-full px-4 py-3 transition-colors duration-200 ${
              isScrolled ? "bg-sidebarBg shadow-md" : "bg-transparent"
            }`}
          >
            <DashboardHeader
              toggleSidebar={toggleSidebar}
              setToggleSidebar={setToggleSidebar}
            />
          </div>
          <main
            ref={mainRef}
            className="flex-1 px-4 py-3 bg-backgroundBg h-screen overflow-y-auto"
          >
            {children}
          </main>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default DashboardLayout;
