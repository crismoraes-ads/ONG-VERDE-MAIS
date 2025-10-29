// js/pageEnhancements.js
// Máscaras (CPF/telefone/CEP), menu hambúrguer, toasts e rebind de imagens
function initPageEnhancements() {
  console.log("✨ Melhorias de interface carregadas");

  // ---------- Hamburger menu ----------
  const hamburger = document.querySelector(".hamburger");
  const navUl = document.querySelector("nav ul");
  if (hamburger && navUl && !hamburger.dataset.enhanced) {
    hamburger.dataset.enhanced = "1";
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
      navUl.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!navUl.classList.contains("active")) return;
      if (hamburger.contains(e.target) || navUl.contains(e.target)) return;
      navUl.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  }

  // ---------- Image fallback helper (usa função já no HTML se existir) ----------
  window.handleImgError = window.handleImgError || function (imgEl, secondaryUrl, svgDataUrl) {
    try {
      if (imgEl._triedSecondary) {
        if (svgDataUrl) imgEl.src = svgDataUrl;
        else imgEl.src = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="#e6eef0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#7d8a8f" font-size="18">Imagem indisponível</text></svg>');
      } else if (secondaryUrl) {
        imgEl._triedSecondary = true;
        imgEl.src = secondaryUrl;
      } else {
        imgEl._triedSecondary = true;
        imgEl.src = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="#e6eef0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#7d8a8f" font-size="18">Imagem indisponível</text></svg>');
      }
    } catch (e) {
      console.error("handleImgError", e);
    }
  };

  // ---------- Toast ----------
  function ensureToast() {
    let toast = document.querySelector("#page-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "page-toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    return toast;
  }

  window.showToast = function (msg, duration = 3000) {
    const toast = ensureToast();
    toast.textContent = msg;
    toast.style.display = "block";
    toast.style.opacity = "1";
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => { toast.style.display = "none"; toast.style.opacity = "1"; }, 300);
    }, duration);
  };

  // Pequena saudação (apenas primeira vez por navegação)
  if (!sessionStorage.getItem("ong_sent_welcome")) {
    setTimeout(() => showToast("Bem-vindo à ONG MAIS VERDE 🌿"), 700);
    sessionStorage.setItem("ong_sent_welcome", "1");
  }

  // ---------- Masks ----------
  function setMask(input, fn) {
    if (!input || input.dataset.maskEnhanced) return;
    input.dataset.maskEnhanced = "1";
    input.addEventListener("input", () => {
      const pos = input.selectionStart;
      input.value = fn(input.value);
      try { input.setSelectionRange(pos, pos); } catch (e) {}
    });
  }

  function maskCPF(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return v;
  }
  function maskTel(v) {
    v = v.replace(/\D/g, "");
    if (v.length <= 10) {
      v = v.replace(/(\d{2})(\d)/, "($1) $2");
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      v = v.replace(/(\d{2})(\d)/, "($1) $2");
      v = v.replace(/(\d{5})(\d)/, "$1-$2");
    }
    return v;
  }
  function maskCEP(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    return v;
  }

  const cpf = document.querySelector("#cpf");
  const tel = document.querySelector("#telefone");
  const cep = document.querySelector("#cep");
  if (cpf) setMask(cpf, maskCPF);
  if (tel) setMask(tel, maskTel);
  if (cep) setMask(cep, maskCEP);
}
