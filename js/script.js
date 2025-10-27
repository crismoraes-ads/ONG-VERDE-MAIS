document.addEventListener("DOMContentLoaded", () => {
  // menu hamburguer
  const hamburger = document.getElementById("menu-toggle");
  const navMenu = document.querySelector("nav ul");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  // dropdown
  document.querySelectorAll(".nav-item > a").forEach(link => {
    link.addEventListener("click", (e) => {
      const parent = link.parentElement;
      parent.classList.toggle("show");
      e.preventDefault();
    });
  });
});
