const calcularImc = () => {

  const peso = Number(document.getElementById('peso').value) // lendo valor do campo peso
  const altura = Number(document.getElementById('altura').value) // lendo valor do campo altura

  const imc = peso / (altura * altura) // cálculo do imc

  document.getElementById('resultado').textContent = 'Seu IMC é: ' + imc
  // exibindo o resultado na tela, na div com id 'resultado'
  document.body.style.backgroundColor = 'green'

}

const reset = () => {
  document.body.style.backgroundColor = 'white'
  document.getElementById('resultado').textContent = ''
  document.getElementById('peso').value = ''
  document.getElementById('altura').value = ''
}

const inibir = () => {
    document.getElementById('peso').style.display = 'none'
}

