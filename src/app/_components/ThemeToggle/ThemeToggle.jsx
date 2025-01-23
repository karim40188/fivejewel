"use client";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDarkMode)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
      } else {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-3 bg-gradient-to-r from-[#FFCA41] to-[#EE4135] dark:from-[#333333] dark:to-[#555555] rounded-full shadow-2xl hover:shadow-[0_0_20px_5px_rgba(255,202,65,0.4)] dark:hover:shadow-[0_0_20px_5px_rgba(51,51,51,0.6)] transition-all duration-500 ease-in-out flex items-center justify-center relative overflow-hidden group"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* تأثير إضاءة خلفية */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

      {/* الأيقونة */}
      {darkMode ? (
        <FaMoon
          size={20}
          className="text-white transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
        />
      ) : (
        <FaSun
          size={20}
          className="text-white transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
        />
      )}

      {/* تأثير تموج (Ripple Effect) */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute w-10 h-10 bg-white opacity-0 group-active:opacity-30 group-active:scale-150 transition-all duration-500 ease-out"></div>
      </div>
    </button>
  );
}