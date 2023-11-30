import { useEffect } from "react";
import IconSun from "../components/IconSun";

export const useDarkMode = () => {
  useEffect(() => {
    const useTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (useTheme === "dark" || (!useTheme && systemTheme)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const isDarkMode = document.documentElement.classList.contains("dark");

    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return { toggleTheme };
};

const ThemeToggleButton = () => {
  const { toggleTheme } = useDarkMode();

  console.log('TOGGLETHEME', toggleTheme)
  return (
    <button onClick={toggleTheme} className="">
        <IconSun />
    </button>
  );
};

export default ThemeToggleButton;
