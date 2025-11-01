document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');

  if (hamburger && navUl) {
    const toggleMenu = () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      navUl.classList.toggle('active');
      if (!expanded) {
        const firstLink = navUl.querySelector('a');
        if (firstLink) firstLink.focus();
      } else {
        hamburger.focus();
      }
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggleMenu();
      } else if (e.key === 'Escape') {
        navUl.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });

    document.addEventListener('click', (ev) => {
      if (!navUl.contains(ev.target) && !hamburger.contains(ev.target)) {
        navUl.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    navUl.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navUl.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }

  // Máscaras de input
  function setMask(input, maskFn) {
    input.addEventListener('input', () => {
      const start = input.selectionStart;
      input.value = maskFn(input.value);
      try { input.setSelectionRange(start, start); } catch (e) {}
    });
  }

  function maskCPF(v) { v=v.replace(/\D/g,''); v=v.replace(/(\d{3})(\d)/,'$1.$2'); v=v.replace(/(\d{3})(\d)/,'$1.$2'); v=v.replace(/(\d{3})(\d{1,2})$/,'$1-$2'); return v; }
  function maskTel(v) { v=v.replace(/\D/g,''); if(v.length<=10){v=v.replace(/(\d{2})(\d)/,'($1) $2');v=v.replace(/(\d{4})(\d)/,'$1-$2');}else{v=v.replace(/(\d{2})(\d)/,'($1) $2');v=v.replace(/(\d{5})(\d)/,'$1-$2');} return v;}
  function maskCEP(v){v=v.replace(/\D/g,'');v=v.replace(/(\d{5})(\d)/,'$1-$2');return v;}

  const cpf = document.querySelector('#cpf');
  const tel = document.querySelector('#telefone');
  const cep = document.querySelector('#cep');
  if (cpf) setMask(cpf, maskCPF);
  if (tel) setMask(tel, maskTel);
  if (cep) setMask(cep, maskCEP);

  // Formulário
  const form = document.querySelector('#form-cadastro');
  if (form && !form.dataset.bound) {
    form.dataset.bound = '1';
    form.addEventListener('submit', function(ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const nome = form.querySelector('#nome');
      const email = form.querySelector('#email');
      const cpfField = form.querySelector('#cpf');
      const dataNasc = form.querySelector('#dataNasc');

      if(nome && nome.value.trim().length<3){ alert('Nome deve ter pelo menos 3 caracteres.'); nome.focus(); return; }
      if(email && !/^\S+@\S+\.\S+$/.test(email.value.trim())){ alert('E-mail inválido.'); email.focus(); return; }
      if(cpfField){ const apenasDigitos=(cpfField.value||'').replace(/\D/g,''); if(apenasDigitos.length!==11){alert('CPF incompleto. Use 11 dígitos.');cpfField.focus();return;} }
      if(dataNasc && dataNasc.value){ const hoje=new Date(); const nasc=new Date(dataNasc.value); let idade=hoje.getFullYear()-nasc.getFullYear(); const m=hoje.getMonth()-nasc.getMonth(); if(m<0 || (m===0 && hoje.getDate()<nasc.getDate())) idade--; if(idade<12){alert('Idade mínima: 12 anos.'); dataNasc.focus(); return;} }
      alert('Cadastro simulado: formulário válido!');
      form.reset();
    });
  }
});