# OBJETO EM JAVASCRIPT

Um objeto em JavaCript é uma coleção de pares **chave-valor** (também chamados de propriedades). Ele permite armazenar e organizar dados de forma estruturada.

Ex:  

```javascript
const aluno = {
    nome: "João da Silva",
    matricula: 1245,
    data_nascimento: "18/11/1990",
    inscrito: true,
    disciplinas: ['javacript', 'sql', 'html'],
    saudacao: function () {
        return `Olá, meu nome é ${this.nome}`
    }
}

```

## ACESSANDO UM ELEMENTO DO OBJETO:

```javascript
const aluno = {
    nome: "João da Silva",
    matricula: 1245,
    data_nascimento: "18/11/1990",
    inscrito: true,
    disciplinas: ['javacript', 'sql', 'html'],
    saudacao: function () {
        return `Olá, meu nome é ${this.nome}`
    }
}

// Acessando o elemento pela chave:
console.log(aluno.nome) // João da Silva
console.log(aluno["matricula"]) // 1245
```

## ADICIONAR OU MODIFICAR PROPRIEDADES:

```javascript

const aluno = {
    nome: "João da Silva",
    matricula: 1245,
    data_nascimento: "18/11/1990",
    inscrito: true,
    disciplinas: ['javacript', 'sql', 'html'],
    saudacao: function () {
        return `Olá, meu nome é ${this.nome}`
    }
}

aluno.matricula = 123

// IMPRIMIR O NOME DE TODOS OS JOGADORES E SEUS RESPECTIVOS GOLS:
// EX: 
// RONALDO - 40 GOLS
// CR7 - 38 GOLS
// ...
```
