/////////////// Exemplo 1 - forEach ///////////////
// const numeros = [10,20,30]
// let resultado = 0

// numeros.forEach((valor) => {
//     resultado = resultado + valor
// })

// console.log(resultado) // 60

/////////////// Exemplo 2 - map ///////////////

// const numeros = [1,2,3]

// const dobro = numeros.map(n => n * 2) // [2,4,6]
// console.log(dobro)

// const pessoas = [
//     {nome: "Caio", idade: 20},
//     {nome: "Danilo", idade: 27}
// ]

// const nomes = pessoas.map(pessoa => pessoa.nome)
// console.log(nomes)

/////////////// Exemplo 3 - filter ///////////////
// const numeros = [5,14,9,25]

// const maiores = numeros.filter(n => n > 10) // [14,25]
// console.log(maiores)

//// outro exemplo /////

// const pessoas = [
//     {nome: "Caio", idade: 20, status: "Inativo"},
//     {nome: "Danilo", idade: 17, status: "Inativo"},
//     {nome: "Ana", idade: 15, status: "Ativo"},
//     {nome: "Beatriz", idade: 37, status: "Ativo"},
// ]

// const adultos = pessoas.filter(pessoa => pessoa.idade >= 18 && pessoa.status === "Ativo")
// console.log(adultos)

///////////// Exemplo 4 - reduce ///////////////
// const numeros = [10,20,30,40]

// const soma = numeros.reduce((acc, n) => acc + n, 0)
// console.log(soma) // 100
