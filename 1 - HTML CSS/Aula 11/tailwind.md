# INTRODUÇÃO AO TAILWIND CSS

## O que é o Tailwind?

Definição: Tailwind CSS é um framework CSS utilitário, ou seja, ele fornece classes prontas para você aplicar estilos diretamente nos elementos HTML, sem precisar escrever CSS personalizado para cada componente.

Diferente de frameworks como Bootstrap, o Tailwind não traz componentes prontos, mas sim ferramentas para você construir seus próprios layouts de forma rápida e consistente.

```html
<button class="bg-blue-500 text-white px-4 py-2 rounded">
  Clique aqui
</button>
```

## Por que usar o Tailwind CSS?

Vantagens:

Produtividade: Você estiliza rapidamente sem sair do HTML.
Consistência: Usa uma paleta de cores, espaçamentos e tamanhos padronizados.
Customização: Fácil de personalizar temas e criar componentes únicos.
Responsividade: Classes para diferentes tamanhos de tela já prontas.
Comunidade: Muito usado no mercado, com vasta documentação e plugins.  


## Quando usar?

Projetos que precisam de agilidade e praticidade.  
Times que querem padronização visual.  
Quando se deseja evitar arquivos CSS muito grandes e difíceis de manter.  

## Como implementar?

Usando o CDN (para testes e prototipagem)  
```html
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css" rel="stylesheet">
```

Instação via NPM (Projetos reais)  
  
1. Instale o Tailwind  
```bash
npm install -D tailwindcss
npx tailwindcss init
```

2. Configure o arquivo tailwind.config.js (opcional)
3. No seu CSS principal, adicione: 

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
4. Compile o CSS:
```bash
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```
5. Inclua o CSS gerado no seu HTML


## Principais propriedades/classes do Tailwind:

Cores: bg-blue-500, text-red-600  
Espaçamento: p-4 (padding), m-2 (margin)  
Tamanho de fonte: text-xl, text-sm  
Borda: border, border-gray-300, rounded, rounded-lg  
Flexbox e Grid: flex, items-center, justify-between, grid, grid-cols-3  
Responsividade: md:bg-green-500 (aplica em telas médias)  
Sombra: shadow, shadow-lg  
Transições: transition, duration-300, hover:bg-blue-700  