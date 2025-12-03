// Aula 11 - Exemplos API - Promise: Estrutura básica

// const promessa = new Promise((resolve, reject) => {
//   const ok = true;

//   if (ok) {
//     resolve({ mensagem: "Deu tudo certo!", codigo: 200 });
//   } else {
//     reject("Erro!");
//   }
// });

// promessa
//   .then((resultado) => console.log(resultado))
//   .catch((erro) => console.log(erro));

// Aula 11 - Exemplos API - Promise: Exemplo com setTimeout

// const promessaTimeout = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const sucesso = false // Simula sucesso ou falha
//     if (sucesso) {
//       resolve("Operação concluída com sucesso após o timeout!");
//     } else {
//       reject("Erro na operação após o timeout!");
//     }
//     }, 3000); // 3 segundos
// });

// promessaTimeout
//   .then((mensagem) => console.log(mensagem))
//   .catch((erro) => console.log(erro));

// Aula 11 - Exemplos API - Promise: Exemplo com fetch

// async function carregarUsuarios() {
//     // try/catch trata os erros da função.
//     try {
//         const resposta = await fetch('https://randomuser.me/api/?results=10') // aguarda a resposta da API
//         const dados = await resposta.json() // converte a resposta para JSON
//         console.log(dados.results) // exibe os dados no console
//     } catch (erro) {
//         console.log(erro)
//     }
// }

// carregarUsuarios() // chama a função para carregar os usuários

const cep = async (codigo) => {
    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${codigo}/json/`)
        const dados = await resposta.json()
        console.log(dados)
    } catch (erro) {
        console.log(erro)
    }
}

cep('63021250') // chama a função para buscar o CEP