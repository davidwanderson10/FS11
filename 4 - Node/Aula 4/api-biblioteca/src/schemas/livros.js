export const livrosSchema = {
  Livro: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      titulo: { type: 'string', example: 'Dom Casmurro' },
      descricao: { type: 'string', nullable: true, example: 'Romance clássico da literatura brasileira.' },
      edicao: { type: 'string', nullable: true, example: '3ª edição' },
      autorId: { type: 'integer', example: 1 },
      categoriaId: { type: 'integer', example: 2 },
      img: { type: 'string', nullable: true, example: '/uploads/1234567890.jpg' },
      idioma: { type: 'string', nullable: true, example: 'Português' },
      num_paginas: { type: 'integer', nullable: true, example: 256 },
      editora: { type: 'string', nullable: true, example: 'Editora Ática' },
      estoque: { type: 'integer', nullable: true, example: 5 },
      data_publicacao: { type: 'string', format: 'date', nullable: true, example: '1899-01-01' },
      autores: { $ref: '#/components/schemas/Autor' },
      categorias: { $ref: '#/components/schemas/Categoria' },
    },
  },
  LivroInput: {
    type: 'object',
    required: ['titulo', 'autorId', 'categoriaId'],
    properties: {
      titulo: { type: 'string', example: 'Dom Casmurro' },
      descricao: { type: 'string', example: 'Romance clássico da literatura brasileira.' },
      edicao: { type: 'string', example: '3ª edição' },
      autorId: { type: 'integer', example: 1 },
      categoriaId: { type: 'integer', example: 2 },
      idioma: { type: 'string', example: 'Português' },
      num_paginas: { type: 'integer', example: 256 },
      editora: { type: 'string', example: 'Editora Ática' },
      estoque: { type: 'integer', example: 5 },
      data_publicacao: { type: 'string', format: 'date', example: '1899-01-01' },
    },
  },
};

const idParam = {
  name: 'id',
  in: 'path',
  required: true,
  schema: { type: 'integer' },
  example: 1,
};

const resLivro = {
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Livro' } } },
};
const resErro = {
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
};

// POST e PUT aceitam multipart/form-data por causa do upload de imagem
const livroFormBody = {
  required: true,
  content: {
    'multipart/form-data': {
      schema: {
        allOf: [
          { $ref: '#/components/schemas/LivroInput' },
          {
            type: 'object',
            properties: {
              img: { type: 'string', format: 'binary', description: 'Imagem da capa (jpeg, jpg, png, gif, webp — máx 5MB)' },
            },
          },
        ],
      },
    },
  },
};

export const livrosPaths = {
  '/livros': {
    get: {
      tags: ['Livros'],
      summary: 'Lista todos os livros',
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: 'Lista retornada com sucesso', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Livro' } } } } },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
    post: {
      tags: ['Livros'],
      summary: 'Cria um novo livro',
      security: [{ bearerAuth: [] }],
      requestBody: livroFormBody,
      responses: {
        201: { description: 'Livro criado com sucesso', ...resLivro },
        400: { description: 'Dados inválidos', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        403: { description: 'Acesso negado — requer privilégios de administrador', ...resErro },
        409: { description: 'Chave estrangeira inválida (autorId ou categoriaId)', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
  },
  '/livros/{id}': {
    get: {
      tags: ['Livros'],
      summary: 'Busca um livro pelo ID',
      security: [{ bearerAuth: [] }],
      parameters: [idParam],
      responses: {
        200: { description: 'Livro encontrado', ...resLivro },
        400: { description: 'ID inválido', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        404: { description: 'Livro não encontrado', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
    put: {
      tags: ['Livros'],
      summary: 'Atualiza um livro existente',
      security: [{ bearerAuth: [] }],
      parameters: [idParam],
      requestBody: livroFormBody,
      responses: {
        200: { description: 'Livro atualizado com sucesso', ...resLivro },
        400: { description: 'Dados inválidos', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        403: { description: 'Acesso negado — requer privilégios de administrador', ...resErro },
        404: { description: 'Livro não encontrado', ...resErro },
        409: { description: 'Chave estrangeira inválida (autorId ou categoriaId)', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
    delete: {
      tags: ['Livros'],
      summary: 'Remove um livro',
      security: [{ bearerAuth: [] }],
      parameters: [idParam],
      responses: {
        200: { description: 'Livro removido com sucesso', content: { 'application/json': { schema: { type: 'object', properties: { message: { type: 'string', example: 'Livro deletado com sucesso.' } } } } } },
        400: { description: 'ID inválido', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        403: { description: 'Acesso negado — requer privilégios de administrador', ...resErro },
        404: { description: 'Livro não encontrado', ...resErro },
        409: { description: 'Não é possível deletar: existem registros relacionados', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
  },
};
