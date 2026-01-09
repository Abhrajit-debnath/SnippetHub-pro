"use client";

import UpgradePlanCard from "@/app/Layout/components/upgrade/upgrade-plan";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const page = () => {
  const { user, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.isSubscribed) {
      router.refresh()
      router.replace("/dashboard/home");
    }
  }, [user, loading, router]);

  if (loading || user?.isSubscribed) return null;

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full h-full flex justify-center items-center">
  
        <UpgradePlanCard />
      </div>
    </div>
  );
};

export default page;
