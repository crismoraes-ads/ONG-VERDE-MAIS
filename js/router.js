// js/router.js
// SPA leve: carrega o <main> de outras páginas .html via fetch e injeta aqui.
// Intercepta links do menu (internos) e usa history API.

function initRouter() {
  console.log("🔗 Router inicializado");

  const main = document.querySelector("main");
  if (!main) {
    console.warn("router: <main> não encontrado. SPA não ativado.");
    return;
  }

  // Captura cliques em links internos (delegação)
  document.addEventListener("click", function (e) {
    let node = e.target;
    while (node && node.tagName !== "A") node = node.parentElement;
    if (!node) return;

    const href = node.getAttribute("href");
    if (!href) return;

    // Ignora links externos, mailto, tel e anchors
    if (href.startsWith("http") && !href.includes(location.hostname)) return;
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) return;
    if (href.endsWith(".pdf")) return;

    // Intercepta páginas html locais
    if (href.endsWith(".html") || href === "/" || href.startsWith(location.origin) || !href.includes("://")) {
      e.preventDefault();
      const url = new URL(href, location.href).href;
      navigateTo(url);
    }
  }, true);

  // Handle back/forward
  window.addEventListener("popstate", () => {
    navigateTo(location.href, { pushState: false });
  });

  async function navigateTo(url, opts = { pushState: true }) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed: " + res.status);
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const newMain = doc.querySelector("main");
      if (newMain) {
        main.innerHTML = newMain.innerHTML;
      } else {
        // fallback: replace body
        main.innerHTML = doc.body.innerHTML;
      }

      // atualiza título
      const newTitle = doc.querySelector("title");
      if (newTitle) document.title = newTitle.textContent;

      if (opts.pushState !== false) {
        try { history.pushState({}, "", url); } catch (e) { /* some browsers may restrict */ }
      }

      // re-inicializa comportamentos (masks, forms, templates, menu)
      if (typeof initPageEnhancements === "function") initPageEnhancements();
      if (typeof initTemplates === "function") initTemplates();
      if (typeof initFormValidation === "function") initFormValidation();

      // scroll topo
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("router navigate error:", err);
      // fallback: navegação completa
      window.location.href = url;
    }
  }
}
