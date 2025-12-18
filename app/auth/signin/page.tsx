"use client";

import SignInComponent from "@/app/auth/components/sign-in-form";
import ThemeToggle from "@/app/auth/components/theme-toggle";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <ThemeToggle />
      <SignInComponent />
    </div>
  );
};

export default page;
