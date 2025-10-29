// Ativa menu hambúrguer
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("nav ul");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // --- Modo escuro acessível ---
  const modeToggle = document.createElement("button");
  modeToggle.className = "btn-toggle-mode";
  modeToggle.textContent = "🌓 Modo Escuro";
  modeToggle.style.position = "fixed";
  modeToggle.style.left = "16px";
  modeToggle.style.bottom = "16px";
  modeToggle.style.zIndex = "1200";
  modeToggle.style.padding = "8px 14px";
  modeToggle.style.borderRadius = "8px";
  modeToggle.style.border = "none";
  modeToggle.style.background = "#0077ff";
  modeToggle.style.color = "#fff";
  modeToggle.style.cursor = "pointer";
  modeToggle.setAttribute("aria-label", "Alternar modo escuro/claro");

  document.body.appendChild(modeToggle);

  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    modeToggle.textContent = document.body.classList.contains("dark-mode")
      ? "☀️ Modo Claro"
      : "🌓 Modo Escuro";
  });

  // --- Toast de feedback ---
  const toast = document.createElement("div");
  toast.classList.add("toast");
  document.body.appendChild(toast);

  window.showToast = (msg) => {
    toast.textContent = msg;
    toast.style.display = "block";
    setTimeout(() => (toast.style.display = "none"), 3000);
  };
});
