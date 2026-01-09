"use client";

import SignInComponent from "@/app/auth/components/sign-in-form";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-backgroundBg">
      
      <SignInComponent />
    </div>
  );
};

export default page;
