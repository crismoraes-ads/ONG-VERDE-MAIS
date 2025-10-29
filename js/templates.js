// templates.js

const templates = {
    home: `
        <h1>Bem-vindo ao Blog/ONG</h1>
        <p>Esta é a página inicial.</p>
    `,
    cadastro: `
        <h1>Cadastro</h1>
        <form id="cadastroForm">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required>
            
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            
            <label for="senha">Senha:</label>
            <input type="password" id="senha" name="senha" required>
            
            <button type="submit">Cadastrar</button>
        </form>
        <div id="formMessage"></div>
    `,
    blog: `
        <h1>Blog</h1>
        <p>Posts recentes...</p>
    `
};

export { templates };
