import { renderSections } from './ui.js';

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkToggle");
  const icon = document.getElementById("darkIcon");
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const searchInput = document.getElementById("searchInput");
  const refreshBtn = document.getElementById("refreshBtn");

  // Apply saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) document.body.setAttribute("data-theme", savedTheme);

  renderSections();

  toggle.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    icon.textContent = newTheme === "dark" ? "🌙" : "🌞";
  });

  menuToggle?.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  searchInput?.addEventListener("input", (e) => {
    renderSections(e.target.value);
  });

  refreshBtn?.addEventListener("click", () => {
    location.reload(); // refresh entire data
  });
});
