# O QUE SÃO OS HOOKS?

Hooks são funções especiais do React que permitem:  
- Usar estado
- Usar efeitos
- Reutilizar lógica  

## Vantagens: 

- Componentes funcionais
- Código mais simples
- Melhor reutilização da lógica

## Exemplo:

### useState

```js
import { useState } from 'React'
```

### O que é um Estado (state) 

Estado é um dado que pode mudar com o tempo, quando muda, atualiza a interface automaticamente.

Ex:  
- Contadores
- Usuário logado
- Tema claro/escuro
- Lista de itens

**Exemplo prático**
```js
const [state, setState] = useState(valorInicial);
const [saldo, setSaldo] = useState(100)

const saldo = 100
```

<!-- CRIE UM PROJETO REACT + VITE NA AULA 4, O NOME DO PROJETO SERÁ: financeiro -->

### useEffect

```js
import { useEffect } from 'React'
```

### O que é o useEffect?
É um hook do React usado para lidar com efeitos colaterais em componentes funcionais.  
Efeito colateral: Tudo aquilo que acontece fora do fluxo normal de renderização do componente.  

### Exemplos de efeitos colaterais:

- Buscar dados em uma API
- Acessar localStorage
- Manipular DOM
- Adicionar/remover eventos (addEventListener)
- Times (setTimeout, setInterval)
- Sincronizar dados com estados externos

```js
userEffect(() => {
    //código do efeito
}, [dependências]);

// Ele recebe dois parâmetros:
// 1. Função de efeito: O que está sendo executado
// 2. Array de dependências: Quando o efeito é executado

// Quando o useEffect é executado?
// 1. Sem Array
useEffect(() => {
  console.log("Executa sempre");
});

// 2. Array vazio []:
useEffect(() => {
  console.log("Executa apenas uma vez");
}, []);

// 3. Com dependências:
useEffect(() => {
  console.log("Executa quando count muda");
}, [count]);

```

<!-- 

1. Criar pasta Aula 5 
2. Criar um projeto com template React + Vite, chamado: FS11-financeiro
3. "Limpar" o App.jsx e colocar o código abaixo para renderizar no return:

-->
```js
import { useState, useEffect } from "react";

function Contador() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Contador: ${count}`;
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Cliquei {count} vezes
    </button>
  );
}
```
