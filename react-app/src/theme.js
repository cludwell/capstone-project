const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");

const useTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

const iconToggle = () => {
  moonIcon.classList.toggle("hidden");
  sunIcon.classList.toggle("hidden");
};

const themeCheck = () => {
  if (useTheme === "dark" || (!useTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    return moonIcon.classList.add("hidden");
  }
  sunIcon.classList.add("hidden");
};

const themeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    return iconToggle();
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  iconToggle();
};
[sunIcon, moonIcon].forEach((icon) =>
  icon.addEventListener("click", (e) => themeSwitch())
);

themeCheck();
