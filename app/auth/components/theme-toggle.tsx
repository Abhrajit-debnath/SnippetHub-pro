"use client";

import { useTheme } from "next-themes";
import { Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme,setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      className="fixed top-10 right-10 cursor-pointer "
      onClick={() => setTheme(theme === 'light' ? "dark" : "light")}
    >
      {theme == "dark" ? <SunMedium className="w-6 h-6 xl:w-7 xl:h-7"/> : <Moon className="w-6 h-6 xl:w-7 xl:h-7"/>}
    </button>
  );
}
