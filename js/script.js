document.addEventListener("DOMContentLoaded", () => {
  // toggle hamburger
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');
  if (hamburger && navUl) {
    hamburger.addEventListener('click', () => navUl.classList.toggle('active'));
  }

  // máscara inputs
  function setMask(input, fn) { input.addEventListener('input', () => input.value = fn(input.value)); }

  function maskCPF(v){
    v = v.replace(/\D/g,'');
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
    return v.substring(0,14);
  }
  function maskTel(v){
    v = v.replace(/\D/g,'');
    if (v.length <= 10) {
      v = v.replace(/(\d{2})(\d)/,'($1) $2');
      v = v.replace(/(\d{4})(\d)/,'$1-$2');
    } else {
      v = v.replace(/(\d{2})(\d)/,'($1) $2');
      v = v.replace(/(\d{5})(\d)/,'$1-$2');
    }
    return v.substring(0,15);
  }
  function maskCEP(v){
    v = v.replace(/\D/g,'');
    v = v.replace(/(\d{5})(\d)/,'$1-$2');
    return v.substring(0,9);
  }

  const cpf = document.querySelector('#cpf');
  const tel = document.querySelector('#telefone');
  const cep = document.querySelector('#cep');
  if (cpf) setMask(cpf, maskCPF);
  if (tel) setMask(tel, maskTel);
  if (cep) setMask(cep, maskCEP);

  // validação simulada do form
  const form = document.querySelector('#form-cadastro');
  if (form) {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
      } else {
        e.preventDefault();
        alert('Cadastro simulado: formulário válido! Obrigado.');
        form.reset();
      }
    });
  }
});
