# 1. INTRODUÇÃO AO REACT

Conceito: O React é uma biblioteca JavaScript para construção de interfaces de usuário (UI), criada pelo FaceBook em 2013. Seu principal foco é facilitar a criação de interfaces interativas, compondo a UI a partir de pequenos blocos chamados de componentes.

## HISTÓRIA E EVOLUÇÃO
- 2011: Facebook começa a usar internamente.
- 2013: Lançamento público do React.
- 2015: Introdução do React Native (para apps mobile).
- 2016+: Popularização e adoção massiva pela comunidade.  

## VATAGENS DO REACT
- Componentização: Reutilização de código por meio de componentes
- Virtual DOM: Atualizações rápidas e eficientes na interface
- Comunidade ativa: Muitas bibliotecas, tutoriais e suporte.
- Curva de aprendizado suave: Fácil para quem já conhece JS.

## QUANDO USAR O REACT?
- Projetos que exigem interfaces dinâmicas e interativas.
- Aplicações que precisam de manutenção e escalabilidade.
- Times que valorizam reuso de código e produtividade.

# 2. CONFIGURAÇÃO DO AMBIENTE

## INSTALAÇÃO DO NODE.JS E NPM

O React depende do Node.js para rodar scripts e gerenciar dependências.  
  
Passos:  
1. Acesse nodejs.org e baixe a versão LTS
2. Instale o Node.js (o NPM já será instalado junto)
3. Após a instalação, verifique se a instação foi concluída com sucesso, utilizando o comando abaixo no prompt:

```bash
node -v
npm -v
```

## UTILIZANDO O VITE PARA CRIAR UM NOVO PROJETO REACT

O Vite é uma ferramenta moderna para iniciar projetos front-end rapidamente, com hot reaload e build rápido.

1. Já dentro da pasta que deseja criar o projeto, no terminal, execute:

```bash
npm create vite@latest nome-do-projeto -- --template react
```

2. Entre na pasta do projeto:

```bash
cd nome-do-projeto
```

3. Instale as dependências:

```bash
npm install
```

4. Rode o projeto:

```bash
npm run dev
```