// js/app.js
// Inicializador principal — conecta módulos do projeto
document.addEventListener("DOMContentLoaded", () => {
  console.log("🌱 ONG MAIS VERDE - App iniciado");

  // Inicializações (se as funções existirem)
  if (typeof initPageEnhancements === "function") initPageEnhancements();
  if (typeof initRouter === "function") initRouter();
  if (typeof initTemplates === "function") initTemplates();
  if (typeof initFormValidation === "function") initFormValidation();
});
