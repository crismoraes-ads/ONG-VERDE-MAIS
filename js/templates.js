// js/templates.js
// Funções para montar / atualizar conteúdo dinâmico (cards, listas etc.)
// Mantém seu HTML estático, mas pode ser usado para injetar templates no futuro.
function initTemplates() {
  console.log("🎨 Templates iniciais verificados");

  // Exemplo simples: contar cards
  const cards = document.querySelectorAll(".card");
  if (cards.length) {
    // apenas log — não altera DOM
    console.log("cards encontrados:", cards.length);
  }
}
