let lista = [];

const adicionar = () => {
  const item = document.getElementById('item').value;
  lista.push(item);

  document.getElementById('resultado').textContent = lista.join(', '); 
}

 const remover = () => {
    lista.pop();
    document.getElementById('resultado').textContent = lista.join(', ');
  }

// innerHTML -> é uma propriedade que permite acessar ou modificar o conteúdo HTML de um elemento.
// textContent -> é uma propriedade que permite acessar ou modificar o conteúdo de texto de um elemento, sem interpretar HTML.
// O método join () -> é usado para unir todos os elementos de um array em uma única string, separando-os por um delimitador especificado. ex: lista.join(', ')