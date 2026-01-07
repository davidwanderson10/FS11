# Props (Propriedades)

## O que são?
Props (abreviação de properties) são dados passados de um componente pai para um componente filho.  
São somente leitura (imutáveis dentro do componente filho)  
  
Ex: 

```js
function soma(a, b) {
    return a + b
}

// a e b são parâmetros, em React são as props
```

## Vantagens
- Comunicação clara entre os componentes
- Facilita reutilização
- Deixa o componente mais genérico
- Segue o fluxo de dados unidericional do React

