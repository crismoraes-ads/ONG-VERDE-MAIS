/* js/script.js */
document.addEventListener("DOMContentLoaded", () => {
  // Hamburger toggle
  const btnHamb = document.querySelector('.hamburger');
  const navUl = document.querySelector('.main-nav ul');
  if (btnHamb && navUl) {
    btnHamb.addEventListener('click', () => {
      navUl.classList.toggle('is-open');
      btnHamb.setAttribute('aria-expanded', navUl.classList.contains('is-open'));
    });
  }

  // Masks helpers
  function setMask(input, fn) {
    if (!input) return;
    input.addEventListener('input', () => {
      input.value = fn(input.value);
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

  setMask(document.querySelector('#cpf'), maskCPF);
  setMask(document.querySelector('#telefone'), maskTel);
  setMask(document.querySelector('#cep'), maskCEP);

  // Form submit demo
  const form = document.querySelector('#form-cadastro');
  if (form) {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
      }
      e.preventDefault();
      alert('Cadastro simulado enviado com sucesso! Obrigada.');
      form.reset();
    });
  }
});
