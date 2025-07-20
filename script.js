const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  // We are toggling 'light-theme' on the body
  document.body.classList.toggle("light-theme");
  const icon = toggle.querySelector("i");
  
  // Icon toggling logic
  if (document.body.classList.contains("light-theme")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }

  // Save theme preference
  const theme = document.body.classList.contains("light-theme") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});

// Load theme preference on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  // Set default to light if nothing is saved
  if (savedTheme === "dark") {
    document.body.classList.add("light-theme");
    const icon = toggle.querySelector("i");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
});
