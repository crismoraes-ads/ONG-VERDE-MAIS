// js/script.js
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Máscaras (CPF, Telefone, CEP) ---------- */
  function setMask(input, maskFn) {
    input.addEventListener("input", () => {
      input.value = maskFn(input.value);
    });
  }

  function maskCPF(v){
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return v;
  }

  function maskTel(v){
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

  function maskCEP(v){
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

  /* ---------- Form validation básica ---------- */
  const form = document.querySelector("#form-cadastro");
  if (form) {
    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
      } else {
        e.preventDefault();
        // Simulação: aqui poderia enviar via fetch
        alert("Cadastro simulado: formulário válido!");
        form.reset();
      }
    });
  }

  /* ---------- Menu hambúrguer (mobile) ---------- */
  const toggle = document.querySelector("#menu-toggle");
  const nav = document.querySelector("header nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      toggle.setAttribute("aria-expanded", nav.classList.contains("active"));
    });
    // Fecha o menu clicando fora no mobile
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Dropdown menu (acessível) ---------- */
  const navItems = document.querySelectorAll(".nav-item > a");
  navItems.forEach(link => {
    link.addEventListener("click", (e) => {
      const parent = link.parentElement;
      const dropdown = parent.querySelector(".nav-dropdown");
      if (dropdown) {
        e.preventDefault();
        parent.classList.toggle("show");
      }
    });
  });

  // Fecha dropdowns ao clicar fora
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".nav-item.show").forEach(item => {
      if (!item.contains(e.target)) item.classList.remove("show");
    });
  });
});
