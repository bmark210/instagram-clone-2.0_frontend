export function getPreferredTheme() {
  const isDarkThemePreferred =
    window.matchMedia && (window.matchMedia("(prefers-color-scheme: dark)").matches as boolean);
  return isDarkThemePreferred ? "dark" : "light";
}
