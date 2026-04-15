# API Biblioteca — Especificação para o Front-end

**Base URL:** `http://localhost:3000`  
**Stack sugerida:** React + Vite  
**Autenticação:** JWT via header `Authorization: Bearer <token>`

---

## Sumário

1. [Autenticação e Níveis de Acesso](#1-autenticação-e-níveis-de-acesso)
2. [Estrutura de Pastas Sugerida (React)](#2-estrutura-de-pastas-sugerida-react)
3. [Fluxo Geral de Navegação](#3-fluxo-geral-de-navegação)
4. [Endpoints](#4-endpoints)
   - [Login](#41-login)
   - [Validar Token](#42-validar-token)
   - [Autores](#43-autores)
   - [Categorias](#44-categorias)
   - [Livros](#45-livros)
   - [Usuários](#46-usuários)
   - [Pedidos](#47-pedidos)
5. [Modelos de Dados](#5-modelos-de-dados)
6. [Regras de Negócio](#6-regras-de-negócio)
7. [Tratamento de Erros](#7-tratamento-de-erros)

---

## 1. Autenticação e Níveis de Acesso

### Como funciona

- O login retorna um **token JWT** com validade de **18 horas**.
- O token deve ser salvo (ex: `localStorage`) e enviado em **todas** as requisições protegidas.
- O payload do token contém as informações do usuário logado.

### Header obrigatório em rotas protegidas

```
Authorization: Bearer <token>
```

### Payload decodificado do token

```json
{
  "userId": 1,
  "username": "João Silva",
  "matricula": "2024001",
  "perfil": "aluno",
  "email": "joao@faculdade.edu",
  "curso": "Engenharia de Software",
  "status": "ativo"
}
```

### Níveis de acesso

| Perfil  | Quem é         | O que pode fazer                                                                 |
|---------|----------------|----------------------------------------------------------------------------------|
| `aluno` | Aluno          | Ver catálogo, fazer pedidos (se `status === "ativo"`), ver seu histórico, alterar senha |
| `admin` | Administrador  | Tudo: CRUD completo de autores, categorias, livros, usuários e pedidos          |

> **Importante:** O perfil está disponível no payload do token. Use `perfil === "admin"` para controlar o acesso às páginas de CRUD no front-end.

---

## 2. Estrutura de Pastas Sugerida (React)

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Table.jsx
│   │   └── Badge.jsx
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── catalog/
│   │   ├── BookCard.jsx         # Card do livro com imagem, título, descrição, disponibilidade
│   │   ├── BookGrid.jsx         # Grid de BookCards
│   │   ├── CatalogFilters.jsx   # Filtros de categoria, autor e pesquisa
│   │   └── ReserveButton.jsx    # Botão de reservar (desabilitado se sem estoque)
│   ├── pedidos/
│   │   ├── PedidoForm.jsx
│   │   └── PedidoTable.jsx
│   ├── autores/
│   │   ├── AutorForm.jsx
│   │   └── AutorTable.jsx
│   ├── categorias/
│   │   ├── CategoriaForm.jsx
│   │   └── CategoriaTable.jsx
│   ├── livros/
│   │   ├── LivroForm.jsx
│   │   └── LivroTable.jsx
│   └── usuarios/
│       ├── UsuarioForm.jsx
│       └── UsuarioTable.jsx
├── pages/
│   ├── LoginPage.jsx            # Página de login
│   ├── CatalogPage.jsx          # Catálogo de livros (home pós-login)
│   ├── HistoricoPage.jsx        # Histórico de pedidos do aluno
│   ├── AlterarSenhaPage.jsx     # Alterar senha do aluno
│   ├── admin/
│   │   ├── AutoresPage.jsx
│   │   ├── CategoriasPage.jsx
│   │   ├── LivrosPage.jsx
│   │   ├── UsuariosPage.jsx
│   │   └── PedidosPage.jsx
├── services/
│   ├── api.js                   # Instância axios com interceptor de token
│   ├── authService.js
│   ├── autoresService.js
│   ├── categoriasService.js
│   ├── livrosService.js
│   ├── usuariosService.js
│   └── pedidosService.js
├── contexts/
│   └── AuthContext.jsx          # Contexto com usuário logado e token
├── hooks/
│   ├── useAuth.js
│   └── useDisponibilidade.js    # Hook para calcular estoque - pedidos ativos
└── routes/
    ├── AppRoutes.jsx            # Rotas da aplicação
    └── PrivateRoute.jsx         # Proteção de rotas por perfil
```

---

## 3. Fluxo Geral de Navegação

```
/login
  │
  └── POST /login ──► token JWT salvo
        │
        └── Redireciona para /catalogo
              │
              ├── (aluno)  /catalogo          ← Página inicial
              ├── (aluno)  /historico          ← Meus pedidos
              ├── (aluno)  /alterar-senha
              │
              ├── (admin)  /catalogo
              ├── (admin)  /admin/autores
              ├── (admin)  /admin/categorias
              ├── (admin)  /admin/livros
              ├── (admin)  /admin/usuarios
              └── (admin)  /admin/pedidos
```

---

## 4. Endpoints

### 4.1 Login

#### `POST /login`

Autentica o usuário e retorna o token JWT.

**Acesso:** Público (sem token)

**Request Body:**
```json
{
  "email": "joao@faculdade.edu",
  "senha": "minhasenha123"
}
```

**Response 200:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros:**

| Status | Motivo                             |
|--------|------------------------------------|
| 400    | `email` ou `senha` não informados  |
| 401    | Credenciais inválidas              |
| 500    | Erro interno                       |

**Uso no front-end:**
1. Salvar o token: `localStorage.setItem("token", data.token)`
2. Decodificar o payload (ex: com `jwt-decode`) para obter `perfil`, `status`, `userId`, etc.
3. Redirecionar para `/catalogo`

---

### 4.2 Validar Token

#### `GET /validate-token`

Verifica se o token ainda é válido e retorna os dados do usuário logado.

**Acesso:** Requer token

**Response 200:** Payload do token (mesmo conteúdo descrito acima)

**Uso no front-end:** Chamar ao recarregar a página para verificar se a sessão ainda é válida.

**Erros:**

| Status | Motivo                    |
|--------|---------------------------|
| 401    | Token não informado       |
| 403    | Token inválido ou expirado|

---

### 4.3 Autores

#### `GET /autores`

Lista todos os autores. **Rota pública** (não requer token).

**Response 200:**
```json
[
  { "id": 1, "nome": "Machado de Assis" },
  { "id": 2, "nome": "Clarice Lispector" }
]
```

> Ordenado por `nome` (A-Z)

---

#### `GET /autores/:id`

Retorna um autor específico.

**Acesso:** Requer token

**Parâmetros:** `id` (inteiro positivo)

**Response 200:**
```json
{ "id": 1, "nome": "Machado de Assis" }
```

**Erros:**

| Status | Motivo           |
|--------|------------------|
| 400    | ID inválido      |
| 401    | Sem token        |
| 404    | Autor não encontrado |

---

#### `POST /autores`

Cria um novo autor.

**Acesso:** Requer token + perfil `admin`

**Request Body:**
```json
{ "nome": "Gabriel García Márquez" }
```

**Response 201:** Objeto do autor criado

**Erros:**

| Status | Motivo                |
|--------|-----------------------|
| 400    | `nome` ausente ou inválido |
| 401    | Sem token             |
| 403    | Não é admin           |
| 409    | Nome já cadastrado    |

---

#### `PUT /autores/:id`

Atualiza um autor existente.

**Acesso:** Requer token + perfil `admin`

**Request Body:**
```json
{ "nome": "Novo Nome" }
```

**Response 200:** Objeto do autor atualizado

**Erros:** 400, 401, 403, 404

---

#### `DELETE /autores/:id`

Remove um autor.

**Acesso:** Requer token + perfil `admin`

**Response 200:** Objeto do autor removido

**Erros:** 400, 401, 403, 404

---

### 4.4 Categorias

#### `GET /categorias`

Lista todas as categorias.

**Acesso:** Requer token

**Response 200:**
```json
[
  { "id": 1, "nome": "Romance" },
  { "id": 2, "nome": "Ficção Científica" }
]
```

> Ordenado por `nome` (A-Z)

---

#### `GET /categorias/:id`

Retorna uma categoria específica.

**Acesso:** Requer token

**Response 200:**
```json
{ "id": 1, "nome": "Romance" }
```

---

#### `POST /categorias`

Cria uma nova categoria.

**Acesso:** Requer token + perfil `admin`

**Request Body:**
```json
{ "nome": "Biografia" }
```

**Response 201:** Objeto da categoria criada

**Erros:** 400, 401, 403, 409 (nome duplicado)

---

#### `PUT /categorias/:id`

Atualiza uma categoria.

**Acesso:** Requer token + perfil `admin`

**Request Body:**
```json
{ "nome": "Novo Nome" }
```

**Response 200:** Objeto da categoria atualizada

---

#### `DELETE /categorias/:id`

Remove uma categoria.

**Acesso:** Requer token + perfil `admin`

**Response 200:** Objeto da categoria removida

---

### 4.5 Livros

#### `GET /livros`

Lista todos os livros com dados do autor e da categoria.

**Acesso:** Requer token

**Response 200:**
```json
[
  {
    "id": 1,
    "titulo": "Dom Casmurro",
    "descricao": "Romance clássico brasileiro",
    "edicao": "3ª",
    "idioma": "Português",
    "num_paginas": 256,
    "editora": "Martin Claret",
    "estoque": 5,
    "img": "/uploads/1712345678-abc.jpg",
    "data_publicacao": "1899-01-01T00:00:00.000Z",
    "autorId": 1,
    "categoriaId": 2,
    "autores": {
      "id": 1,
      "nome": "Machado de Assis"
    },
    "categorias": {
      "id": 2,
      "nome": "Romance"
    }
  }
]
```

> Ordenado por `titulo` (A-Z)

**Notas para o front-end:**
- A imagem está disponível em `http://localhost:3000{img}` (ex: `http://localhost:3000/uploads/1712345678-abc.jpg`)
- Use `estoque` para calcular disponibilidade junto com os pedidos ativos

---

#### `GET /livros/:id`

Retorna um livro específico com autor e categoria.

**Acesso:** Requer token

**Response 200:** Mesmo schema do item acima (objeto único)

**Erros:** 400, 401, 404

---

#### `POST /livros`

Cria um novo livro com upload de imagem opcional.

**Acesso:** Requer token + perfil `admin`

**Content-Type:** `multipart/form-data`

**Campos do formulário:**

| Campo            | Tipo    | Obrigatório | Descrição                          |
|------------------|---------|-------------|-------------------------------------|
| `titulo`         | string  | Sim         | Máx. 200 caracteres                 |
| `autorId`        | integer | Sim         | ID de um autor existente            |
| `categoriaId`    | integer | Sim         | ID de uma categoria existente       |
| `descricao`      | string  | Não         | Texto livre                         |
| `edicao`         | string  | Não         | Máx. 10 caracteres (ex: "3ª")       |
| `idioma`         | string  | Não         | Máx. 100 caracteres                 |
| `num_paginas`    | integer | Não         | Número positivo                     |
| `editora`        | string  | Não         | Máx. 200 caracteres                 |
| `estoque`        | integer | Não         | Número não-negativo                 |
| `data_publicacao`| string  | Não         | Formato `YYYY-MM-DD`                |
| `img`            | file    | Não         | JPEG/JPG/PNG/GIF/WEBP, máx. 5MB    |

**Response 201:** Objeto do livro criado

**Erros:**

| Status | Motivo                                              |
|--------|-----------------------------------------------------|
| 400    | Campos obrigatórios ausentes ou validação falhou    |
| 401    | Sem token                                           |
| 403    | Não é admin                                         |
| 409    | `autorId` ou `categoriaId` não existem             |

---

#### `PUT /livros/:id`

Atualiza um livro existente. Aceita os mesmos campos do POST (todos opcionais).

**Acesso:** Requer token + perfil `admin`

**Content-Type:** `multipart/form-data`

**Response 200:** Objeto do livro atualizado

**Erros:** 400, 401, 403, 404, 409

---

#### `DELETE /livros/:id`

Remove um livro.

**Acesso:** Requer token + perfil `admin`

**Response 200:**
```json
{ "message": "Livro deletado com sucesso." }
```

**Erros:**

| Status | Motivo                                            |
|--------|---------------------------------------------------|
| 400    | ID inválido                                       |
| 401    | Sem token                                         |
| 403    | Não é admin                                       |
| 404    | Livro não encontrado                              |
| 409    | Livro possui pedidos associados (não pode deletar)|

---

### 4.6 Usuários

#### `GET /usuarios`

Lista todos os usuários.

**Acesso:** Requer token + perfil `admin`

**Response 200:**
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "matricula": "2024001",
    "perfil": "aluno",
    "curso": "Ciência da Computação",
    "cpf": "12345678901",
    "data_nascimento": "2000-05-15T00:00:00.000Z",
    "email": "joao@faculdade.edu",
    "senha": "minhasenha",
    "status": "ativo"
  }
]
```

---

#### `GET /usuarios/:id`

Retorna um usuário específico.

**Acesso:** Requer token (qualquer perfil — use para buscar dados do próprio usuário logado via `userId` do token)

**Erros:** 400, 401, 404

---

#### `POST /usuarios`

Cria um novo usuário.

**Acesso:** Requer token + perfil `admin`

**Request Body:**
```json
{
  "nome": "Maria Souza",
  "matricula": "2024002",
  "perfil": "aluno",
  "curso": "Direito",
  "cpf": "98765432100",
  "data_nascimento": "2001-03-20",
  "email": "maria@faculdade.edu",
  "senha": "senha123",
  "status": "ativo"
}
```

**Valores aceitos:**
- `perfil`: `"aluno"` ou `"admin"`
- `status`: `"ativo"` ou `"inativo"`
- `cpf`: apenas os 11 dígitos, sem pontos ou traços

**Response 201:** Objeto do usuário criado

**Erros:**

| Status | Motivo                                        |
|--------|-----------------------------------------------|
| 400    | Campos obrigatórios ausentes                  |
| 401    | Sem token                                     |
| 403    | Não é admin                                   |
| 500    | CPF, email ou matrícula já cadastrados (P2002)|

---

#### `PUT /usuarios/:id`

Atualiza um usuário existente.

**Acesso:** Requer token + perfil `admin`

**Request Body:** Mesmos campos do POST (todos opcionais)

**Response 200:** Objeto do usuário atualizado

**Erros:** 400, 401, 403, 404, 500 (duplicata)

---

#### `DELETE /usuarios/:id`

Remove um usuário.

**Acesso:** Requer token + perfil `admin`

**Response:** `204 No Content` (sem corpo)

**Erros:** 400, 401, 403, 404

---

### 4.7 Pedidos

#### `GET /pedidos`

Lista todos os pedidos de empréstimo.

**Acesso:** Requer token (qualquer perfil)

**Response 200:**
```json
[
  {
    "id": 1,
    "livro_id": 3,
    "usuario_id": 2,
    "data_inicio": "2024-03-01T00:00:00.000Z",
    "data_prevista": "2024-03-15T00:00:00.000Z",
    "data_entrega": null,
    "status": "ativo"
  }
]
```

**Notas para o front-end:**
- Para o **aluno**, filtrar pelo `usuario_id === userId` do token para exibir apenas os pedidos dele.
- `status`: `"ativo"` (em andamento) ou `"entregue"` (devolvido)
- `data_entrega: null` indica que o livro ainda não foi devolvido

> Ordenado por `id`

---

#### `GET /pedidos/:id`

Retorna um pedido específico.

**Acesso:** Requer token

**Response 200:** Objeto do pedido

---

#### `POST /pedidos`

Cria um novo pedido de empréstimo.

**Acesso:** Requer token + perfil `admin`

**Request Body:**
```json
{
  "livroId": 3,
  "usuarioId": 2,
  "data_inicio": "2024-03-01",
  "data_prevista": "2024-03-15"
}
```

> Todos os campos são obrigatórios.

**Response 201:** Objeto do pedido criado (com `status: "ativo"` automático)

**Erros:** 400 (campos ausentes), 401, 403, 500

---

#### `PUT /pedidos/:id`

Atualiza um pedido (ex: registrar devolução).

**Acesso:** Requer token + perfil `admin`

**Request Body:**
```json
{
  "livroId": 3,
  "usuarioId": 2,
  "data_inicio": "2024-03-01",
  "data_prevista": "2024-03-15"
}
```

> Todos os campos são obrigatórios no update.

**Response 200:** Objeto do pedido atualizado

**Erros:** 400, 401, 403, 404

---

#### `DELETE /pedidos/:id`

Remove um pedido.

**Acesso:** Requer token + perfil `admin`

**Response 200:** Objeto do pedido removido

**Erros:** 400, 401, 403, 404

---

## 5. Modelos de Dados

### Autor
```typescript
interface Autor {
  id: number;
  nome: string; // max 200 chars
}
```

### Categoria
```typescript
interface Categoria {
  id: number;
  nome: string; // max 200 chars
}
```

### Livro
```typescript
interface Livro {
  id: number;
  titulo: string;          // max 200 chars
  descricao: string | null;
  edicao: string | null;   // max 10 chars, ex: "3ª"
  autorId: number;
  categoriaId: number;
  img: string | null;      // ex: "/uploads/1712345678-abc.jpg"
  idioma: string | null;
  num_paginas: number | null;
  editora: string | null;
  estoque: number | null;
  data_publicacao: string | null; // ISO date
  autores: Autor;          // incluído nas respostas GET
  categorias: Categoria;   // incluído nas respostas GET
}
```

### Usuario
```typescript
interface Usuario {
  id: number;
  nome: string;
  matricula: string | null;
  perfil: "aluno" | "admin";
  curso: string | null;
  cpf: string;             // 11 dígitos
  data_nascimento: string; // ISO date
  email: string;
  senha: string;
  status: "ativo" | "inativo";
}
```

### Pedido
```typescript
interface Pedido {
  id: number;
  livro_id: number;
  usuario_id: number;
  data_inicio: string | null;   // ISO date
  data_prevista: string | null; // ISO date
  data_entrega: string | null;  // ISO date — null se não devolvido
  status: "ativo" | "entregue" | null;
}
```

---

## 6. Regras de Negócio

### Catálogo e Disponibilidade

A disponibilidade de um livro é calculada **no front-end**:

```
disponivel = estoque - pedidos_ativos_do_livro
```

Onde `pedidos_ativos_do_livro` = quantidade de pedidos onde:
- `livro_id === livro.id`
- `status === "ativo"`

**Algoritmo sugerido:**

```javascript
function calcularDisponibilidade(livro, pedidos) {
  const pedidosAtivos = pedidos.filter(
    (p) => p.livro_id === livro.id && p.status === "ativo"
  ).length;
  return (livro.estoque ?? 0) - pedidosAtivos;
}
```

O botão "Reservar" deve estar **desabilitado** quando `disponivel <= 0`.

---

### Regras de Pedido (Aluno)

O aluno **só pode fazer pedido** se:
1. `status === "ativo"` no seu perfil (verificar via token)
2. Houver unidades disponíveis (`disponivel > 0`)

> **Atenção:** A criação de pedidos na API exige perfil `admin`. Para permitir que o aluno "solicite" um empréstimo, implemente no front-end um fluxo de solicitação — ex: enviar uma notificação, ou criar o pedido diretamente (caso o backend seja ajustado para isso futuramente). Por enquanto, pedidos são criados apenas por admins.

---

### Imagens de Livros

- URL completa da imagem: `http://localhost:3000` + `livro.img`
- Exemplo: `http://localhost:3000/uploads/1712345678-abc.jpg`
- Se `img` for `null`, exibir imagem placeholder

---

### Filtros do Catálogo

Implementar **no front-end** (filtrar o array retornado pelo GET /livros):

```javascript
// Filtro por texto (título)
livros.filter(l => l.titulo.toLowerCase().includes(busca.toLowerCase()))

// Filtro por autor
livros.filter(l => l.autorId === autorSelecionado)

// Filtro por categoria
livros.filter(l => l.categoriaId === categoriaSelecionada)
```

---

## 7. Tratamento de Erros

### Formato padrão de erro da API

```json
{ "error": "Mensagem descritiva do erro" }
```

### Códigos de status

| Status | Significado                                |
|--------|--------------------------------------------|
| 200    | Sucesso                                    |
| 201    | Criado com sucesso                         |
| 204    | Sucesso sem conteúdo (DELETE de usuário)   |
| 400    | Requisição inválida (validação)            |
| 401    | Não autenticado (token ausente)            |
| 403    | Não autorizado (token inválido ou sem permissão) |
| 404    | Recurso não encontrado                     |
| 409    | Conflito (duplicata ou FK inválida)        |
| 500    | Erro interno do servidor                   |

### Interceptor axios sugerido

```javascript
// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## Observações Finais

- A documentação interativa da API está disponível em: `http://localhost:3000/docs`
- Imagens são servidas estaticamente em: `http://localhost:3000/uploads/<arquivo>`
- O CORS está habilitado globalmente — sem restrições de origem
- Datas são retornadas em formato ISO 8601 (ex: `"2024-03-01T00:00:00.000Z"`)
- Para exibição, formatar com `new Date(data).toLocaleDateString("pt-BR")`
