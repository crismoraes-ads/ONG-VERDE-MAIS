// app.js

import { templates } from './templates.js';
import { validateForm } from './formValidation.js';

const root = document.getElementById('root');

function loadPage(page) {
    root.innerHTML = templates[page];
    if (page === 'cadastro') {
        validateForm();
    }
}

// Links de navegação
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            const page = e.target.getAttribute('data-link');
            loadPage(page);
        }
    });

    // Carrega a página inicial
    loadPage('home');
});
