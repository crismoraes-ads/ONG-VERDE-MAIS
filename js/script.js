/* Importar variáveis */
@import url('variaveis.css');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: var(--branco);
  color: var(--preto);
}

/* Header e nav */
header {
  background: linear-gradient(90deg, var(--verde), var(--azul));
  color: var(--branco);
  padding: var(--space-16);
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-header {
  max-width: 140px;
}

nav ul {
  display: flex;
  list-style: none;
  gap: var(--space-16);
}

nav a {
  color: var(--branco);
  text-decoration: none;
  padding: var(--space-8) var(--space-16);
  border-radius: 8px;
  background-color: rgba(255,255,255,0.2);
}

nav a:hover {
  background-color: rgba(255,255,255,0.4);
}

/* Hero */
.hero {
  text-align: center;
  padding: var(--space-32) var(--space-16);
  background-color: var(--verde);
  color: var(--branco);
}

.hero img {
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 12px;
  margin-top: var(--space-16);
}

/* Botões */
.botao {
  display: inline-block;
  margin-top: var(--space-16);
  padding: var(--space-8) var(--space-16);
  background: linear-gradient(90deg, var(--laranja), var(--vermelho));
  color: var(--branco);
  border-radius: 28px;
  font-weight: bold;
  text-decoration: none;
}

.botao:hover {
  transform: scale(1.05);
}

/* Cards de projeto */
.galeria {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-24);
  justify-content: center;
  margin-top: var(--space-32);
}

.projeto {
  background-color: var(--branco);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  width: 300px;
  text-align: center;
  transition: transform 0.3s;
}

.projeto:hover {
  transform: scale(1.05);
}

.projeto img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.projeto h3 {
  color: var(--azul);
  margin: var(--space-16) 0 var(--space-8) 0;
}

.projeto p {
  padding: 0 var(--space-16) var(--space-16) var(--space-16);
  font-size: var(--font-sm);
}

/* Formulários */
form {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
  max-width: 500px;
  margin: var(--space-32) auto;
}

input, button {
  padding: var(--space-8);
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: var(--font-md);
}

input:focus {
  outline: none;
  border-color: var(--verde);
  box-shadow: 0 0 6px var(--verde);
}

/* Footer */
footer {
  text-align: center;
  padding: var(--space-16);
  background: linear-gradient(90deg, var(--verde), var(--azul));
  color: var(--branco);
  margin-top: var(--space-32);
}

/* Blog */
.blog article {
  background-color: var(--fundo, #f4f7fb);
  padding: var(--space-16);
  border-radius: 8px;
  margin-bottom: var(--space-16);
}
