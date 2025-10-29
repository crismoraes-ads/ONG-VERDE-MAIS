// js/formValidation.js
// Validações adicionais e consistência de dados para #form-cadastro
function initFormValidation() {
  console.log("🧾 Validação de formulários ativa");

  const form = document.querySelector("#form-cadastro");
  if (!form) return;

  // Protege contra múltiplas binds
  if (form.dataset.validationBound) return;
  form.dataset.validationBound = "1";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // HTML5 native check
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Campos principais
    const nomeEl = form.querySelector("#nome");
    const emailEl = form.querySelector("#email");
    const cpfEl = form.querySelector("#cpf");
    const dataNascEl = form.querySelector("#dataNasc");

    // Nome mínimo
    if (nomeEl && nomeEl.value.trim().length < 3) {
      showToast("Nome deve ter pelo menos 3 caracteres.");
      nomeEl.focus();
      return;
    }

    // E-mail simples
    if (emailEl && !/^\S+@\S+\.\S+$/.test(emailEl.value.trim())) {
      showToast("E-mail inválido.");
      emailEl.focus();
      return;
    }

    // CPF: apenas verificar 11 dígitos (pode ser estendido com validação real)
    if (cpfEl) {
      const digits = (cpfEl.value || "").replace(/\D/g, "");
      if (digits.length !== 11) {
        showToast("CPF incompleto. Use 11 dígitos.");
        cpfEl.focus();
        return;
      }
    }

    // Data de nascimento: idade mínima 12 anos (exemplo)
    if (dataNascEl && dataNascEl.value) {
      const today = new Date();
      const born = new Date(dataNascEl.value);
      let age = today.getFullYear() - born.getFullYear();
      const m = today.getMonth() - born.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < born.getDate())) age--;
      if (age < 12) {
        showToast("Idade mínima: 12 anos.");
        dataNascEl.focus();
        return;
      }
    }

    // Se chegou aqui, formulário válido
    showToast("Cadastro simulado: formulário válido!");
    form.reset();
  }, false);
}
