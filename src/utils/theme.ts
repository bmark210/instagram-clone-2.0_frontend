// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

function setDarkTheme(): void {
  document.documentElement.classList.add("dark");
  localStorage.theme = "dark";
}

function setLightTheme(): void {
  document.documentElement.classList.remove("dark");
  localStorage.theme = "light";
}

function onThemeSwitcherItemClick(event: MouseEvent): void {
  const theme = (event.target as HTMLElement).dataset.theme;

  if (theme === "system") {
    localStorage.removeItem("theme");
    setSystemTheme();
  } else if (theme === "dark") {
    setDarkTheme();
  } else {
    setLightTheme();
  }
}

const themeSwitcherItems = document.querySelectorAll<HTMLElement>("#theme-switcher");
themeSwitcherItems.forEach(item => {
  item.addEventListener("click", onThemeSwitcherItemClick);
});

function setSystemTheme(): void {
  // Implement your system theme logic here
}
