"use client";

import { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";

export default function ToastProvider() {
  const { theme, systemTheme } = useTheme();

  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2000,
        style: {
          background: isDark ? "#ffffff" : "#0f172a",
          color: isDark ? "#0f172a" : "#ffffff",
          fontFamily: "poppins",
        },
      }}
    />
  );
}
