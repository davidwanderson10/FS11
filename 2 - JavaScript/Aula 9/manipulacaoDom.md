# MANIPULAÇÃO DO DOM COM JAVASCRIPT

## O QUE É O DOM:

O DOM (Document Object Model) é uma representação em árvore de todos os elementos de uma página HTML. Cada tag HTML vira um "nó" (node) na árvore, permitindo que o JavaScript acesse e/ou modifique qualquer parte da página.  
  
Vantagens:  

Permite criar páginas dinâmicas e interativas.  
Facilita a atualização de conteúdo sem recarregar a página.  
Dá controle total sobre a estrutura e aparência da página.  
  
## 1. SELEÇÃO DE ELEMENTOS:
  
* querySelector: Seleciona o primeiro elemento que corresponde ao seletor CSS informado.  
* querySelectorAll: Seleciona todos os elementos que correspondem ao seletor CSS informado.  
  
```html
<ul>
  <li class="item">Item 1</li>
  <li class="item">Item 2</li>
</ul>
<script>
  const primeiroItem = document.querySelector('.item');
  const todosItens = document.querySelectorAll('.item');
  console.log(primeiroItem.textContent); // Item 1
  console.log(todosItens.length); // 2
</script>
```
  
Exercício Prático:  
  
Crie um arquivo HTML com três parágrafos. Use querySelector para selecionar o primeiro parágrafo e querySelectorAll para selecionar todos.  

```html
    <h1>Manipulação de DOM - Parágrafo</h1>
    <p>Este é o parágrafo 1.</p>
    <p>Este é o parágrafo 2.</p>
    <p>Este é o parágrafo 3.</p>
    <script>
        const primeiroParagrafo = document.querySelector("p");
        console.log("Primeiro parágrafo:", primeiroParagrafo.textContent);
        const todosParagrafos = document.querySelectorAll("p");
        console.log("Todos os parágrafos:", todosParagrafos)
        ;
    </script>
```


## 2. CRIAÇÃO E MANIPULAÇÃO DE ELEMENTOS
  
**Criando elementos:**    
document.createElement: Cria um elemento HTML  
  
**Adicionando Elementos**  
appendChild: Adiciona um elemento como filho de outro.  
append: Adiciona um ou mais nós ou strings como filhos.  
  
**Removendo elementos**  
remove: Remove o elemento DOM.  
  
```html
    <div id="container"></div>
    <script>
        const novoParagrafo = document.createElement('p') // criando um novo parágrafo
        novoParagrafo.textContent = 'Olá, DOM!' // editando o conteúdo do parágrafo
        document.getElementById('container').appendChild(novoParagrafo) // adicionando o parágrafo como filho da div container
    </script>
```

Exercício 2: Crie uma div container e um botão logo abaixo, sempre que o usuário clicar no botão, a div deve receber um novo parágrafo e a contagem de cliques:

O botão foi clicado 1 vez
O botão foi clicado 2 vezes
O botão foi clicado 3 vezes
O botão foi clicado 4 vezes
....

```html
    <button id="btn" onclick="addParagrafo()">Adicionar Parágrafo</button>
    <div id="container"></div>

    <script>
        let contador = 0; // variável para contar os cliques
        const container = document.getElementById("container"); // seleciona a div container

        const addParagrafo = () => {
            contador++;

            const paragrafo = document.createElement("p");
            paragrafo.textContent = `Clique número: ${contador}`;
            container.appendChild(paragrafo);
        };
    </script>
```  
   
Exercício 3: Crie uma lista <ul>, um botão de adicionar e um campo de texto. Ao clicar no botão, o texto digitado no campo deve ser adicionado na lista.
  
```html
<input type="text" id="campo" placeholder="Digite algo">
    <button id="btn" onclick="adicionar()">Adicionar</button>
    
    <ul id="lista"></ul>

    <script>
        const lista = document.getElementById("lista");
        const campo = document.getElementById("campo");

        function adicionar() {
            let texto = campo.value;

            if (texto !== "") {
                const li = document.createElement("li");
                li.textContent = texto;
                lista.appendChild(li);

                campo.value = "";
            }
        }
    </script>
```

## 3. MANIPULAÇÃO DE ESTILOS E CLASSES

**Classes**  
classList.add: Adiciona uma classe ao elemento.  
classList.remove: Remove uma classe do elemento.  
  
**Estilos Inline**  
element.style: Permite alterar estilos diretamente via JavaScript.  
  
  
```html
    <p id="texto">Texto de exemplo</p>
    <button onclick="destacar()">Destacar</button>

    <script>
        function destacar() {
            const p = document.getElementById('texto');
            p.classList.add('destaque');
        }
    </script>
    <style>
        .destaque {
            background-color: yellow;
        }
    </style>
```  
  
Exercício 4: Crie um parágrafo inicialmente sem classe. Crie um botão para destacar e outro para tirar o destaque, usando o adicionar ou remover classe.


Exercício 5 (Para casa):  
Vamos criar o jogo de pedra, papel e tesoura. Onde:  
O papel vence a pedra, mas perde para a tesoura.   
A pedra vence a tesoura, mas perde para o papel.  
A tesoura vence o papel, mas perde para a pedra.  

Deve ser feita numa página HTML, o script pode ser dentro da página ou com arquivo .js separado.
O jogo deve permitir jogar quantas vezes quiser, o usuário vai jogar contra a máquina, então sempre que ele escolher um dos 3 itens, o computador também escolhe o dele, a página deve comparar os dois e dizer quem venceu, ou se foi empate. 

