import React from "react";
import { useState, useEffect } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import {WiSolarEclipse} from "react-icons/wi";

function TogleDarkMode() {
  const [theme, setTheme] = useState(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const Actions = () => {
    handleThemeSwitch();
    setEnabled(!enabled);
  };

  return (
    <div>
      <div className="flex self-center">
        <button
          className="flex items-center justify-center w-8 h-8 text-white rounded-full hover:text-gray-300 focus:outline-none focus:shadow-outline"
          onClick={Actions}
        >
          {enabled ? <MdOutlineDarkMode className="text-[30px] dark:text-blue-500 color-1 rounded-full bg-opacity-80" /> : <WiSolarEclipse  className="text-[30px] dark:text-white text-blue-500 rounded-full bg-opacity-100"/>}
        </button>
      </div>
    </div>
  );
}

export default TogleDarkMode;
