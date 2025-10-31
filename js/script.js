// js/script.js
// Controle do menu hamburguer (acessível), máscaras de input e envio simulado.
// Substitua todo o conteúdo do seu js/script.js por este.

document.addEventListener('DOMContentLoaded', function () {
  // --- MENU HAMBURGUER / ACESSIBILIDADE ---
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');

  if (hamburger && navUl) {
    // Alterna o menu (abre/fecha) com acessibilidade
    const toggleMenu = () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      navUl.classList.toggle('active');

      if (!expanded) {
        // Ao abrir, foco no primeiro link do menu
        const firstLink = navUl.querySelector('a');
        if (firstLink) firstLink.focus();
      } else {
        // Ao fechar, devolve foco ao botão
        hamburger.focus();
      }
    };

    // Clique
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Teclado: Enter, Space abrem; Escape fecha
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

    // Fecha ao clicar fora
    document.addEventListener('click', (ev) => {
      if (!navUl.contains(ev.target) && !hamburger.contains(ev.target)) {
        if (navUl.classList.contains('active')) {
          navUl.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Fechar com ESC quando estiver dentro do nav
    navUl.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navUl.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });

    // Garante que links no menu sejam navegáveis por teclado (tabindex nativo já ajuda)
  }

  // --- MÁSCARAS DE INPUT (CPF, TELEFONE, CEP) ---
  function setMask(input, maskFn) {
    input.addEventListener('input', () => {
      const start = input.selectionStart;
      input.value = maskFn(input.value);
      // tenta restaurar posição do cursor (pode falhar em alguns navegadores)
      try { input.setSelectionRange(start, start); } catch (e) {}
    });
  }

  function maskCPF(v) {
    v = v.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return v;
  }

  function maskTel(v) {
    v = v.replace(/\D/g, '');
    if (v.length <= 10) {
      v = v.replace(/(\d{2})(\d)/, '($1) $2');
      v = v.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      v = v.replace(/(\d{2})(\d)/, '($1) $2');
      v = v.replace(/(\d{5})(\d)/, '$1-$2');
    }
    return v;
  }

  function maskCEP(v) {
    v = v.replace(/\D/g, '');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    return v;
  }

  const cpf = document.querySelector('#cpf');
  const tel = document.querySelector('#telefone');
  const cep = document.querySelector('#cep');
  if (cpf) setMask(cpf, maskCPF);
  if (tel) setMask(tel, maskTel);
  if (cep) setMask(cep, maskCEP);

  // --- FORMULÁRIO: envio simulado e validação adicional ---
  const form = document.querySelector('#form-cadastro');
  if (form) {
    // evita múltiplas bindings
    if (!form.dataset.bound) {
      form.dataset.bound = '1';
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        // checkValidity HTML5 nativo
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        // Regras extras (ex.: nome mínimo, email simples, CPF length, idade mínima)
        const nome = form.querySelector('#nome');
        const email = form.querySelector('#email');
        const cpfField = form.querySelector('#cpf');
        const dataNasc = form.querySelector('#dataNasc');

        if (nome && nome.value.trim().length < 3) {
          alert('Nome deve ter pelo menos 3 caracteres.');
          nome.focus();
          return;
        }

        if (email && !/^\S+@\S+\.\S+$/.test(email.value.trim())) {
          alert('E-mail inválido.');
          email.focus();
          return;
        }

        if (cpfField) {
          const apenasDigitos = (cpfField.value || '').replace(/\D/g, '');
          if (apenasDigitos.length !== 11) {
            alert('CPF incompleto. Use 11 dígitos.');
            cpfField.focus();
            return;
          }
        }

        if (dataNasc && dataNasc.value) {
          const hoje = new Date();
          const nasc = new Date(dataNasc.value);
          let idade = hoje.getFullYear() - nasc.getFullYear();
          const m = hoje.getMonth() - nasc.getMonth();
          if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
          if (idade < 12) {
            alert('Idade mínima: 12 anos.');
            dataNasc.focus();
            return;
          }
        }

        // simula envio
        alert('Cadastro simulado: formulário válido!');
        form.reset();
      });
    }
  }

  // --- AJUSTE DE IMAGENS CARREGADAS (evita "estouro" visual) ---
  const imgs = document.querySelectorAll('.hero-img, .card img');
  imgs.forEach(img => {
    if (img.complete) {
      img.style.height = 'auto';
    } else {
      img.addEventListener('load', () => { img.style.height = 'auto'; });
    }
  });

});
