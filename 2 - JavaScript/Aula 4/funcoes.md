## FUNÇÕES EM JAVASCRIPT

Definição: São blocos de código reutilizáveis e que executam uma determinada tarefa.
Importância: Permite modularizar o código, facilitando a manutenção e organização.
Exemplo: Uma função é como uma receita, sempre que precisar você pode utiliza-la para fazer o mesmo prato.

### Sintaxe básica de uma função declarada:

```javascript
function saudacao() {
    console.log('Olá, turma!')
}

saudacao() //chamando a função saudacao
```

Exemplo:  

```javascript
function media() {
    const nota1 = Number(prompt('Digite a nota 1: '))
    const nota2 = Number(prompt('Digite a nota 2: '))
    const media = (nota1 + nota2) / 2
    
    console.log('Sua média foi: ' + media)
}

function soma() {
    const v1 = Number(prompt('Digite o primeiro valor: '))
    const v2 = Number(prompt('Digite segundo valor: '))
    const total = v1 + v2
    
    console.log('Total: ' + total)
}

const alternativa = prompt('Digite 1 para média ou 2 para somar:')

if (alternativa == 1){
    media()
} else if (alternativa == 2) {
    soma()
} else {
    console.log('Alternativa inválida!')
}
```

Passando argumentos para a função:  
```javascript
function divisao(a,b) {
    const resultado = a / b
    console.log('Resultado: ' + resultado)
}

divisao(10,2)
// Passando argumentos para a função
```

Sintaxe de Arrow Function (ES6+):  

```javascript
const dividir = (a, b) => {
    const resultado = a / b
    console.log('Resultado: ' + resultado)
};
dividir(10, 2); // 5
```

