"use client";

import { Button } from "@/components/ui/button";
import axios from "@/app/config/axios.config";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      router.replace("/auth/signin");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={handleLogout} className="font-poppins text-red-500">
        Logout
      </Button>
    </div>
  );
};

export default Page;
