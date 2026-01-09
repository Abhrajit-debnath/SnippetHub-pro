import React from "react";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

type upgradeModalProps = {
  setOpenUpgradeModalForm: React.Dispatch<React.SetStateAction<boolean>>;
};
const UpgradeModal = ({ setOpenUpgradeModalForm }: upgradeModalProps) => {
  const router = useRouter();

  return (
    <div
      className=" relative
        w-full max-w-sm
        rounded-2xl
        border border-zinc-700
        bg-sidebarBg
        p-6
        shadow-lg
        transition-all duration-200
        hover:border-buttonColor
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-buttonColor/20">
          <Crown className="h-5 w-5 text-buttonColor" />
        </div>

        <div>
          <h3 className="text-lg font-poppins font-semibold text-white">
            Pro Plan
          </h3>
          <p className="text-sm text-zinc-400 font-inter">
            Unlock all premium features
          </p>
        </div>
      </div>
      <div className="absolute top-5 right-5">
        <button onClick={() => setOpenUpgradeModalForm(false)}>
          <X className="text-white cursor-pointer" />
        </button>
      </div>

      <Button
        onClick={() => router.replace("/dashboard/upgrade")}
        className="
          mt-6 w-full
          bg-buttonColor
          text-white
          font-poppins
          hover:bg-buttonColorHover
          transition-colors cursor-pointer
        "
      >
        Upgrade to Pro
      </Button>
    </div>
  );
};

export default UpgradeModal;
