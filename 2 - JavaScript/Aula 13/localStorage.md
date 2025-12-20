# ARMAZENAMENTO E GERENCIAMENTO DE ESTADO COM localStorage

## INTRODUÇÃO

O localStorage é um armazenamento interno do navegador, usado para guardar dados persistentes, mesmo quando o usuário fecha a aba ou encerra o navegador.  
  
* Capacidade de armazenamento aproximada: 5MB
* Armazena **sempre** como string
* Dados só são apagados manualmente  

Exemplos de uso:  

* Tema escuro/claro
* Dados de login simples
* Carrinho de compras
* Cache de API
* Lista de tarefas
  
## MÉTODOS DO localStorage  

O localStorage funciona como um "banco simples" baseado em chave -> valor.  

1. Salvar informações (setItem):

```javascript
localStorage.setItem("nome", "Raul")

```

2. Recuperar/buscar informações (getItem):

```javascript
const nome = localStorage.getItem("nome")
console.log(nome) // Raul
```

3. Remover informações (removeItem):

```javascript
localStorage.removeItem("nome")

```

4. Remover tudo (clear):

```javascript
localStorage.clear()

```

Exercício 1:  
1. Adicione um item no localStorage
2. Leia o item adicionado com um console.log
3. Remova o item que foi adicionado
  
Exercício 2: 
Crie uma página html com o fundo branco, um texto na cor preta:
"Aula sobre localStorage"
e um botão para tornar o tema dark/claro. O texto inicial do botão será: Dark
Ao clicar a cor do fundo da página fica preta e o texto fica branco, o texto do botão muda para "Claro", que ao ser clicado retorna a condição anterior. O padrão é que o tema seja claro, mas caso o usuário escolha o tema dark, isso deve ser salvo no localStorage para que ao entrar na página já venha com o tema favorito.

  
## SERIALIZAÇÃO COM JSON

Como o localStorage só aceita string, objetos e arrays precisam ser convertidos.

### Convertendo objeto para string:

```javascript
const user = {
    nome: "Ana",
    email: "ana@exemplo.com",
    matricula: 1234
}

// PARA CONVERTER OBJETO PARA STRING, USAMOS O JSON.stringify(obj)
localStorage.setItem("usuario", JSON.stringify(user))

```

### Convertendo string para objeto:

```javascript
const usuario = localStorage.getItem("usuario")

// PARA CONVERTER STRING PARA OBJETO, USAMOS O JSON.parse(string)
const dados = JSON.parse(usuario)
```