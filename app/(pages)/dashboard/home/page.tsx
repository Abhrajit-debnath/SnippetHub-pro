"use client";

import { useAuthStore } from "@/app/store/authStore";
import DashboardView from "@/app/Layout/components/home/dashboard-view";
import RecentActivityView from "@/app/Layout/components/home/recent-activity-view";
import SnippetAnalysisView from "@/app/Layout/components/home/snippet-analysis-card";
import Logo from "@/app/auth/components/logo";

const page = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="">
      <h1 className="text-white text-2xl pt-8 lg:pt-0">
        Welcome Back {user?.username} 
      </h1>
      <DashboardView />
      <div className="flex flex-col md:flex-row  mt-10 items-center gap-5">
        <RecentActivityView />
        <SnippetAnalysisView />
      </div>
    </div>
  );
};

export default page;
