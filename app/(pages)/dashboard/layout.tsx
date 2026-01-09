"use client";

import { useState } from "react";
import DashboardHeader from "@/app/auth/components/dashboard-header";
import Sidebar from "@/app/Layout/components/sidebar/sidebar";
import { AppSidebar } from "@/app/Layout/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import AuthProvider from "@/app/providers/auth-provider";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

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
        <Toaster  className=""/>

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
          <main className="flex-1 px-4 py-3 bg-backgroundBg h-screen overflow-y-auto">
            <div className="lg:hidden">
              <DashboardHeader
                toggleSidebar={toggleSidebar}
                setToggleSidebar={setToggleSidebar}
              />
            </div>

            {children}
          </main>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default DashboardLayout;
