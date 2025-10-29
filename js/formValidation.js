// formValidation.js

function validateForm() {
    const form = document.getElementById('cadastroForm');
    const message = document.getElementById('formMessage');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = form.nome.value.trim();
        const email = form.email.value.trim();
        const senha = form.senha.value.trim();

        let errors = [];

        if (nome.length < 3) errors.push("Nome deve ter pelo menos 3 caracteres.");
        if (!email.includes('@')) errors.push("Email inválido.");
        if (senha.length < 6) errors.push("Senha deve ter pelo menos 6 caracteres.");

        if (errors.length > 0) {
            message.innerHTML = errors.join('<br>');
            message.style.color = 'red';
        } else {
            message.innerHTML = "Cadastro realizado com sucesso!";
            message.style.color = 'green';
            form.reset();
        }
    });
}

export { validateForm };
