# ESTRUTURAS DE REPETIÇÃO

## DEFINIÇÃO
Um loop (ou laço de repetição) permite executar um bloco de códigos várias vezes, reduzindo repetições manuais.  
  

## TIPOS DE ESTRUTURAS DE REPETIÇÃO

### WHILE

While (enquanto) é um laço que executa um bloco de códigos, enquanto uma condição for verdadeira.

Quando usar?  
Quando não se sabe o número exato de repetições, mas sabe a condição.

exemplo:  

```javascript
while (condição) {
    // bloco de código
}
```

### FOR

For é uma estrutura de repetição contrala por contatador, composta de três partes: Inicialização, condição, incremento 

Quando usar?  
Quando se sabe o número exato de repetições. Utilizado em listas, contadores e para **percorrer arrays**

exemplo:  

```javascript
for (inicialização; condição; incremento) {
    // bloco de código
}

//ex:  
// SOLICITE AO USUÁRIO UM NÚMERO MÁXIMO PARA CONTAGEM, E IMPRIMA TODOS OS VALORES PARES, DE 0 AO VALOR DIGITADO. 
const limite = Number(prompt('Digite um valor máximo de contagem:'))

for (let i = 0; i <= limite; i++) {
  if (i % 2 === 0) {  
    console.log(i)
  }
}

// OU 

const limite = Number(prompt('Digite um valor máximo de contagem: '))

for (let i = 0; i <= limite; i+=2) {
    console.log(`Executado! ${i}`)
}


```

Percorrendo Array com FOR:  

```javascript
let numeros = [2,5,12]

for (let i = 0; i < numeros.length; i++) {
    console.log(numeros[i])
}
```

## EXERCÍCIOS

1. Calcular a média dos números de um array.
2. Percorrer um array e criar outro apenas com números maiores que 10
3. Encontrar o maior número dentro de um array, usando for
4. Pedir um número e imprimir sua tabuada de 1 a 10.
ex: 
7x1 = 7
7x2 = 14
7x3 = 21
...  
5. Receber uma string e inverter usando for (sem usar funções prontas),
exemplo: javascript -> tpircsavaj
6. Exiba o seguinte menu no console:
"Digite o número da opção desejada
1 - Calcular média
2 - Calcular IMC
3 - Somar números
4 - Sair 
"
Caso o usuário digite 4, encerrar o programa. Caso digite uma opção inválida, solicite novamente que ele digite uma das opções do menu. Caso ele digite uma das três opções válidas, siga com a função desejada, cada item (de 1 a 3) deve ter uma função separada para realizar o cálculo.