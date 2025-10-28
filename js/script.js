// Hamburger toggle, masks for CPF/phone/CEP, simple form handling + toast
document.addEventListener("DOMContentLoaded", () => {
  // Hamburger
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');
  if (hamburger && navUl) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      navUl.classList.toggle('active');
    });
  }

  // Input masks
  const maskCPF = v => {
    v = v.replace(/\D/g,'');
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
    return v;
  };
  const maskTel = v => {
    v = v.replace(/\D/g,'');
    if (v.length <= 10) {
      v = v.replace(/(\d{2})(\d)/,'($1) $2');
      v = v.replace(/(\d{4})(\d)/,'$1-$2');
    } else {
      v = v.replace(/(\d{2})(\d)/,'($1) $2');
      v = v.replace(/(\d{5})(\d)/,'$1-$2');
    }
    return v;
  };
  const maskCEP = v => {
    v = v.replace(/\D/g,'');
    v = v.replace(/(\d{5})(\d)/,'$1-$2');
    return v;
  };

  const cpf = document.querySelector('#cpf');
  const tel = document.querySelector('#telefone');
  const cep = document.querySelector('#cep');
  if (cpf) cpf.addEventListener('input', e => e.target.value = maskCPF(e.target.value));
  if (tel) tel.addEventListener('input', e => e.target.value = maskTel(e.target.value));
  if (cep) cep.addEventListener('input', e => e.target.value = maskCEP(e.target.value));

  // Form handling
  const form = document.querySelector('#form-cadastro');
  const toast = document.querySelector('#toast');
  if (form) {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
      } else {
        e.preventDefault();
        showToast('Cadastro enviado (simulado). Obrigado!');
        form.reset();
      }
    });
  }
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(()=> { toast.style.opacity = '0'; setTimeout(()=> { toast.style.display='none'; toast.style.opacity='1'; }, 300); }, 3000);
  }
});
