"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {


  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2000,
        style: {
          background:  "#ffffff",
          color:  "#0f172a" ,
          fontFamily: "poppins",
        },
      }}
    />
  );
}
