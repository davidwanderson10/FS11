## INTRODUÇÃO A ARRAY

Um array é uma estrutura de dados que armazena vários valores em uma única variável.

ex:
```javascript
let frutas = ["banana", "maçã", "laranja"]
let alunos = ["fulano1","fulano2"]
let dadosAluno = ["Fulano", 151513, "11/11/2025", "85 99999999", 1.852, false, [1,2,5,7]]
```

Características: 

- Cada elemento tem um índice, começando do zero.
- Podemos armazenar qualquer tipo de dado (número, string, objetos, boleanos, null.)
- O tamanho é dinâmico, ou seja, pode aumentar ou diminuir.

  
### Acessando elementos por meio do índice/posição:  
ex:
```javascript
let frutas = ["banana", "maçã", "laranja"]
const fruta = frutas[1] // recebe o item na posição 1, de frutas ("maçã")

console.log(fruta) // maçã
```

### Modificando elementos do array:  
ex:
```javascript
let frutas = ['banana', 'maçã', 'laranja']
frutas[1] = 'uva' // a posição 1 de frutas agora recebe uva, que vai substituir a maçã

console.log(frutas) // ['banana', 'uva', 'laranja']
```

### Métodos básicos de array:

#### Adicionar e remover no final do array:  

ex:  
```javascript
// adicionamos elementos ao final do array com o método push
let numeros = [1,2,3]
numeros.push(4)

console.log(numeros) // [1,2,3,4]

//////////////////////////////////////////////////

// removemos elementos do final do array com o método pop
let numeros = [1,2,3]
numeros.pop()

console.log(numeros) // [1,2]
console.log(numeros.length) // retorna o número de elementos do array

```

### Exercícios:

1. Solicite ao usuário 3 nomes por meio do prompt, guarde num array e imprima os nomes. Quando ele terminar de digitar o terceiro nome.
2. Faça uma página HTML em que tenha um campo para digitar palavras, e um botão para cadastrar o item. Ao clicar no botão, o texto digitado deve ser armazenado num array e exibido no final da página. Coloque também um botão para excluir os últimos elementos.

```javascript
// template string

const nome = 'David'
const curso = 'Banco de dados'

console.log('Olá, ' + nome + '. Seu curso é ' + curso)
console.log(`Olá, ${nome}. Seu curso é ${curso} `)
```

#### Adicionar e remover ao início do array:  

```javascript

// para adicionar item no início do array, usamos unshift
let cores = ["verde", "branco"]
cores.unshift("azul")

console.log(cores)

// para remover o primeiro item do array, usamos shift
cores.shift()
console.log(cores)

```

#### Encontrar posição do item no array

```javascript
// indexOf retorna a posição do item no array, caso não exista, retorna -1
let cores = ["verde", "branco", "amarelo", "azul"]
let cor = cores.indexOf("amarelo")
```

#### Testar se um item existe no array

```javascript
// includes retorna se o item existe no array (true ou false)
let cores = ["verde", "branco", "amarelo", "azul"]
let cor = cores.includes("amarelo")

console.log(cor)
```