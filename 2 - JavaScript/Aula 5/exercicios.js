// SOLICITE AO USUÁRIO UM NÚMERO DE 0 A 10. CASO ELE DIGITE UM NÚMERO VÁLIDO, 
// IMPRIMA O VALOR. CASO SEJA UM VALOR FORA DO INTERVALO, IMPRIMA "VALOR INVÁLIDO"

const pedirNumero = () =>  {
  let num = Number(prompt('Digite um número de 0 a 10: '))

  if (num < 0 || num > 10) {
      console.log('Número inválido!')
      pedirNumero()
  } else {
    console.log('Seu número é: ' + num)
  }
}

pedirNumero()


///////////////////////////////////////////////////////

// FUNÇÃO COM RETURNO (RETURN)
const media = () => {
  const n1 = 8
  const n2 = 9
  const resultado = (n1 + n2) / 2

  return resultado
}

const valor = media()