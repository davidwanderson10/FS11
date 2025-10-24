# INTRODUÇÃO AO JAVASCRIPT

## Contexto:

O JavaScript é uma linguagem de programação multiplataforma, é uma das mais populares do mundo, devido a sua versatilidade e adaptabilidade.  

## História e Evolução

Criado em 1995 por Brendan Eich  
Inicialmente chamado de LiveScript, depois JavaScript (apesar do nome, não tem a ver com JAVA)  
Evoluiu de uma linguagem de scripts simples para uma das mais populares do mundo  

## Utilização

Front-end:  
Manipulação de DOM, validações de formulários, animações, interatividade, etc  
  
Back-end:  
Node.Js permite rodar o JS no servidor (API, automação, etc...)  
  
Full Stack:  
Possibilidade de usar a mesma linguagem em toda a aplicação.  
  
## Tipos de dados primitivos

Variável: É um espaço na memória para guardar dados. Ela deve ter um tipo e um valor.  

Declarar variável:  
tipo_de_declaração nome_da_variável = "Maria"
  
EX:  
let nome = "Maria"  
let idade = 27  
let peso = 68.50  


-----------------------  

String:   
Tipo de dado para guardar texto  
ex: let nome = "Roberto"  
  
Number:  
Tipo de dado para guardar valores numéricos  
ex: let idade = 25  

Null:  
Tipo de dado nulo  
ex: let vazio = null  
  

Undefined: 
Tipo de dado indefinido  
ex: let indefinido
  
## Declaração de variáveis

var:  
Escopo de função, pode ser redeclarada.  
  
let:  
Escopo de bloco, pode ser reatribuída.  
  
const:  
Escopo de bloco, não pode ser reatribuída.  
  
```javascript
var x = 10;
let y = 20;
const z = 30;
```

## Operadores Aritméticos
  
```javascript
let soma = 2 + 3;      // 5
let sub = 5 - 2;       // 3
let mult = 4 * 2;      // 8
let div = 10 / 2;      // 5
let resto = 7 % 2;     // 1
```  
  
## Operadores Relacionais
  
```javascript
5 > 3    // true
4 < 2    // false
5 == "5" // true (comparação de valor)
5 === "5"// false (comparação de valor e tipo)
5 != 3   // true
```

## Operadores Lógicos
  
```javascript
true && false // false
true || false // true
!true         // false
```

