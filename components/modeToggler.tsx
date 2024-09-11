"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ModeToggler() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="hover:text-foreground duration-300 ease-in-out w-full h-full flex items-center gap-3"
    >
      {theme === "light" ? (
        <>
          <Moon /> Dark{" "}
        </>
      ) : (
        <>
          <Sun /> Light
        </>
      )}
    </button>
  );
}
