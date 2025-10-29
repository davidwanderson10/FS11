## EXERCÍCIOS

```javascript

// 1. PEÇA AO USUÁRIO DUAS NOTAS, IMPRIMA A MÉDIA DELE.
// OBS: USANDO O PROMPT O VALOR É SALVO COMO STRING. PARA TRANSFORMAR PARA NUMBER PODE UTILIZAR DESSA FORMA:

console.log('Olá, seja bem-vindo! Vamos calcular sua média!')
let nota1 = Number(prompt('Digite sua primeira nota: '))
let nota2 = Number(prompt('Digite sua segunda nota: '))
let media = (nota1 + nota2) / 2

console.log('Sua média é: ' + media)

// 2. PEÇA AO USUÁRIO O NOME E O CURSO DELE, IMPRIMA UMA MENSAGEM DE BOAS VINDAS, CONTENDO O NOME E O CURSO NA MENSAGEM.

let nome = prompt('Digite seu nome: ')
let curso = prompt('Digite seu curso: ')

// console.log('Olá, ' + nome + '!\nSeja bem vindo ao curso de ' + curso)

// 3. PEÇA AO USUÁRIO O VALOR DE UM PRODUTO, A QUANTIDADE COMPRADA E O VALOR DO DESCONTO. CALCULE O VALOR A PAGAR

let valor = Number(prompt('Digite o valor do produto: '))
let quantidade = Number(prompt('Digite a quantidade: '))
let desconto = Number(prompt('Digite o valor do desconto: '))

const total = (valor * quantidade) - desconto

console.log('total a pagar: R$' + total)

// 4. PEÇA AO USUÁRIO O SEU PESO E ALTURA. CALCULE E IMPRIMA O SEU IMC (ÍNDICE DE MASSA CORPORAL)
// O IMC É CALCULADO DIVIDINDO O PESO PELA ALTURA AO QUADRADO.

let peso = Number(prompt('Digite seu peso(kg): '))
let altura = Number(prompt('Digite sua altura(m): '))
let imc = peso / (altura * altura)

console.log('Seu IMC é: ' + imc)
```

<!-- 5. Solicite o nome e email do usuário, independente de como ele escreva, imprima uma mensagem com o nome todo maiúsculo e o email minúsculo.

6. Solicite ao usuário uma temperatura em graus Celsius e imprima o valor da temperatura em grau Fahrenheit.

7. Solicite ao usuário o valor de um produto e imprima o valor a pagar, informando que ele teve 15% de desconto.

8. Solicite ao usuário o valor do salário bruto, desconte 7,5% de IR. Desconte mais 250 reais fixos de INSS. Imprima o valor do salário líquido. -->