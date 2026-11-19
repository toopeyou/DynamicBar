"use client";
import { useEffect, useState } from "react";
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const dark = savedTheme === "dark";
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark",nextTheme);
    localStorage.setItem("theme",
      nextTheme ? "dark" : "light"
    );
  };
  return (
    <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
      onClick={toggleTheme}
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
