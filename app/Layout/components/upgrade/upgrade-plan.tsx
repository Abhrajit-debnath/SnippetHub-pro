"use client";

import { Crown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import axios from "@/app/config/axios.config";
import { useAuthStore } from "@/app/store/authStore";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function UpgradePlanCard() {
  const { fetchUser } = useAuthStore();
  const handleUpgrade = async () => {
    try {
      const { data: order } = await axios.post("/razorpay/order");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order: order.amount,
        currency: order.currency,
        name: "SnippetHub Pro",
        description: "Pro Plan Upgrade",
        order_id: order.id,

        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            const res = await axios.post("/razorpay/verifySignature", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (res.data.success) {
              await fetchUser();
              toast.success("You have upgraded to Pro 🚀");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
          }
        },

        theme: {
          color: "#6F3DFF",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.log("Full error response:", error?.response?.data);
      console.log("Status:", error?.response?.status);
    }
  };
  return (
    <>
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      ;
      <div
        className="
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

        {/* Price */}
        <div className="mt-6">
          <span className="text-3xl font-bold text-white">₹100</span>
          <span className="ml-1 text-sm text-zinc-400">one time</span>
        </div>

        {/* Features */}
        <ul className="mt-6 space-y-3 text-sm">
          {[
            "Unlimited snippets",
            "Private snippets",
            "Advanced syntax highlighting",
            "Tags & language filters",
            "Priority updates",
          ].map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-zinc-300">
              <Check className="h-4 w-4 text-buttonColor" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          onClick={handleUpgrade}
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
    </>
  );
}
