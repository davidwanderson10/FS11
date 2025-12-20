## ESTRUTURA DE UM PROJETO REACT:

### Diretórios e Arquivos Principais
/src: Onde fica o código-fonte da aplicação.
/public: Arquivos estáticos (imagens, favicon, etc).
package.json: Gerencia dependências e scripts do projeto.
.gitignore: Lista de arquivos e pastas que serão ignoradas pelo GIT

### Entendendo os arquivos principais
src/main.jsx: Ponto de entrada da aplicação. Renderiza o componente principal (App) no DOM.
src/App.jsx: Componente principal da aplicação.
public/index.html: HTML base onde o React será injetado.
src/app.jsx: É o componente principal da aplicação que é injetado no index.

### Primeiro componente React:

### O que é um componente?
Um componente é uma função que retorna um JSX (sintaxe parecida com HTML dentro do JavaScript)

EX:  

```jsx
function Saudacao() {
  return <h1>Olá, bem-vindo ao curso de React!</h1>
}
```

### Regras básicas JSX:
JSX permite escrever HTML dentro do JavaScript.  
Deve haver apenas um elemento pai por componente.  
Para inserir variáveis: {variavel}  
Classes CSS usam className ao invés de class.  