const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const icon = toggle.querySelector("i");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");

  // Save theme preference
  const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
  localStorage.setItem("theme", theme);
});

// Load theme preference on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    toggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
  }
});
