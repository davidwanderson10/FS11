# CONSUMO DE API COM JS

## Novos métodos JavaScript
O JavaScript oferece outros recursos para trabalhar com Array, cada um com suas características e aplicações.  

### forEach():  

Executa uma função para cada elemento do array, mas não retorna nada. 
É usado para percorrer listas e realizar ações (log, soma, manipulação de DOM, etc.)  
  
**VANTAGENS:**
* Simples e direto
* Ótimo para efeitos colaterais (imprimir, soma, criar elementos...)
* Código mais legível que o for.  

```javaScript
const numeros = [10,20,30]

numeros.forEach((valor, indice) => {
    console.log(`Valor: ${valor}, Índice: ${indice}`)
})
```

### map():  

Percorre o array e retorna um novo array com o resultado da transformação.  
  
**VANTAGENS:**
* Simples e direto
* Ideal para transformar dados, não altera o array original
* Muito utilizado em manipulação de dados de API.  

```javaScript
const numeros = [1,2,3]

const dobro = numeros.map(n => n * 2) // [2,4,6]

/// outro exemplo ///

const pessoas = [
    {nome: "Caio", idade: 20},
    {nome: "Danilo", idade: 27}
]

const nomes = pessoas.map(pessoa => pessoa.nome)
console.log(nomes)
```

### filter():  

Cria um novo array contendo apenas os elementos que passam em uma condição.    
  
**VANTAGENS:**
* Ideal para buscar, filtrar, remover, separar.
* Não altera o array original.  

```javaScript
const numeros = [5,14,9,25]

const maiores = numeros.filter(n => n > 10) // [14,25]

```

### reduce():  
Reduz o array a um único valor (número, string, objeto, outro array...).
É o mais "poderoso" dos quatro

**VANTAGENS:**
* Ideal para somas, contagens, agrupamentos.
* Muito usado em análise de dados.

Ex.  
```javaScript
array.reduce((acumulador, itemAtual) => {
  return novoValorDoAcumulador;
}, valorInicial);
```

```javaScript
const numeros = [10,20,30,40]

const soma = numeros.reduce((acc, n) => acc + n, 0)

```

## Introdução à Promises:
Uma Promise é um objeto representa uma operação assíncrona, é uma promessa de que um valor está disponível no futuro, o status pode ser:  

* Pending (pendente)
* Fulfilled (concluída com sucesso)
* Rejected (concluída com erro)  
  
** Elas existem porque o JS não pára a execução do código enquanto algo está carregando (como uma chamada de API, leitura de arquivo, etc) **
  
### Estrutura básica:

```javascript
const promessa = new Promise((resolve, reject) => {
  const ok = true;

  if (ok) {
    resolve("Sucesso!");
  } else {
    reject("Erro!");
  }
});

promessa
  .then((resultado) => console.log(resultado))
  .catch((erro) => console.log(erro));

```

** then() é executado quando a Promise é resolvida **
** catch() é executado quando a Promise é rejeitada **

## Requisição HTTP com fetch:

fetch() é a função nativa do JavaScript para fazer requisições HTTP.
Ele retorna uma Promise.

## Uso do Async/Await:

* Deixa o código mais legível
* Evita uma cadeia de .then()
* Parece código síncrono

```javascript
async function carregarUsuarios() {
    // try/catch trata os erros da função.
    try {
        const resposta = await fetch('https://randomuser.me/api/?results=10')
        const dados = resposta.json()
        console.log(dados)
    } catch (erro) {
        console.log(erro)
    }
}

```

Exercício 1: Fazer exercício da aula passada (Aula 10), substituindo a lista de usuários fixos, pela chamada da api no momento do carregamento da página.

Exercício 2: Fazer uma página com um campo para digitar o cep e um botão, ao clicar no botão a página deve fazer uma chamada para a api do viacep e retornar os dados do cep logo abaixo, em uma div. 