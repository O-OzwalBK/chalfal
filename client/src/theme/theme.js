export const toggleTheme = () => {
  const html = document.documentElement;
  html.classList.toggle("dark");

  const theme = html.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
};

export const initTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  }
};
