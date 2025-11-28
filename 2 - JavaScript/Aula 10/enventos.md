# INTRODUÇÃO AOS EVENTOS NO DOM

## O QUE SÃO EVENTOS?
**CONCEITO:** Eventos são ações ou ocorrências que acontecem na página (ex: clique, digitação, envio de formulário, etc..) e que podem ser "ouvidas" pelo JavaScript para executar alguma ação.  
**VANTAGENS:** Permite criar páginas interativas e responsivas às ações do usuário.  
  
Exemplo de captura Inline:  

```html
<button onclick="alert('Clicou!')">Clique aqui</button>
```
**Desvantagem:** Mistura HTML com JS, fica difícil de manter em projetos grandes.

### ESCUTAR/CAPTURAR EVENTO:
addEventListener: Método recomendado, separa a estrutura (HTML) da lógica (JS).  

```html
<button id="btn">Clique aqui</button>
<script>
  document.getElementById('btn').addEventListener('click', function() {
    alert('Clicou!');
  });
</script>
```

Exercício 1: CRIE DOIS BOTÕES NUMA PÁGINA HTML, UM BOTÃO DEVE SER VERDE COM TEXTO BRANCO E COM O TEXTO 'ENVIAR'. AO CLICAR NESSE BOTÃO DEVE SER MOSTRADO O ALERTA: 'MENSAGEM ENVIADA COM SUCESSO'.
O SEGUNDO BOTÃO DEVE SER VERMELHO COM FONTE BRANCA, AO CLICAR, O ALERTA 'MENSAGEM CANCELADA' DEVE SER MOSTRADO. O PRIMEIRO BOTÃO DEVE SER CAPTURADO DE FORMA INLINE, ENQUANTO O SEGUNDO SERÁ POR MEIO DO addEventListener

```html
  <button style="background:green; color:white;" 
          onclick="alert('MENSAGEM ENVIADA COM SUCESSO')">
    ENVIAR
  </button>

  <button id="cancelar" style="background:red; color:white;">
    CANCELAR
  </button>

  <script>
    document.getElementById("cancelar")
      .addEventListener("click", () => {
        alert("MENSAGEM CANCELADA");
      });
  </script>
```

### OUTROS EVENTOS:  
  
```javascript
// Eventos de Mouse
elemento.addEventListener('click', handler);      // Clique
elemento.addEventListener('dblclick', handler);  // Duplo clique
elemento.addEventListener('mouseover', handler); // Mouse sobre
elemento.addEventListener('mouseout', handler);  // Mouse sai

// Eventos de Teclado
elemento.addEventListener('keydown', handler);   // Tecla pressionada
elemento.addEventListener('keyup', handler);     // Tecla liberada

// Eventos de Formulário
elemento.addEventListener('submit', handler);    // Envio
elemento.addEventListener('change', handler);    // Alteração
elemento.addEventListener('focus', handler);     // Foco
elemento.addEventListener('blur', handler);      // Perde foco

// Eventos da Janela
window.addEventListener('load', handler);        // Página carregada
window.addEventListener('resize', handler);      // Redimensionamento
```

Exercício 2: 
console.log(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString());

// CRIE UMA DIV COM 100X100PX E FUNDO VERMELHO, AO PASSAR O MOUSE ELA DEVE FICAR VERDE. AO CLICAR, UMA DIV LOGO ABAIXO DEVE MOSTRAR A DATA E HORA DO CLIQUE

```html
    <style>
        .caixa {
        width: 100px;
        height: 100px;
        background: red;
        margin: 0 auto;
        }
    </style>

    <div class="caixa" id="caixa"></div>
    <div id="resultado"></div>

    <script>
      const caixa = document.getElementById("caixa");
      const resultado = document.getElementById("resultado");

      caixa.addEventListener("mouseover", () => {
        caixa.style.background = "green";
      });

      caixa.addEventListener("mouseout", () => {
        caixa.style.background = "red";
      });

      caixa.addEventListener("click", () => {
        const dataHora = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
        resultado.innerText = `Clicado em: ${dataHora}`;
      });


      
    </script>
```

## DELEDAÇÃO DE EVENTOS

Técnica para ouvir eventos em elementos dinâmicos (criados depois do carregamento da página). Em vez de adicionar ouvintes em cada elemento, adiciona-se em um elemento pai comum.

### COMO FUNCIONA?
  
Usa-se o **event.target** para identificar qual elemento disparou o evento.
  
Exemplo:  

```html
<ul id="lista">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
<script>
  document.getElementById('lista').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
      alert('Clicou em: ' + event.target.textContent);
    }
  });
</script>
```

Exercício 3: Crie uma lista <ul>. Adicione um botão "Adicionar Itens" que cria novos <li>. Use a delegação para mostrar um alerta com o texto do item clicado.

```html
<button id="btn">Adicionar itens</button>
    <ul id="lista">
      <li>Item inicial</li>
    </ul>

    <script>
      const ul = document.getElementById('lista');
      const btnAdicionar = document.getElementById('btn');
      let contador = 2;

      ul.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
          alert('Clicou em: ' + event.target.textContent);
        }
      });

      btnAdicionar.addEventListener('click', function() {
        const li = document.createElement('li');
        li.textContent = 'Item ' + contador++;
        ul.appendChild(li);
      });


    </script>

```

Exercício 4: Acesse a api de usuários aleatórios: https://randomuser.me/api/?results=10
copie o retorno da api, com os dados dos usuários. Você deve criar uma página HTML com cards para esses usuários, contendo a imagem, o nome, e a nacionalidade. Ao clicar num dos cards, a página deve emitir um alerta com o nome do usuário clicado.