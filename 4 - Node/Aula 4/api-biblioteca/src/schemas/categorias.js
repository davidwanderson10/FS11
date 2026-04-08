export const categoriasSchema = {
  Categoria: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      nome: { type: 'string', example: 'Ficção Científica' },
    },
  },
  CategoriaInput: {
    type: 'object',
    required: ['nome'],
    properties: {
      nome: { type: 'string', example: 'Ficção Científica' },
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

const resCategoria = {
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Categoria' } } },
};
const resErro = {
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
};

export const categoriasPaths = {
  '/categorias': {
    get: {
      tags: ['Categorias'],
      summary: 'Lista todas as categorias',
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: 'Lista retornada com sucesso', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Categoria' } } } } },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
    post: {
      tags: ['Categorias'],
      summary: 'Cria uma nova categoria',
      security: [{ bearerAuth: [] }],
      requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CategoriaInput' } } } },
      responses: {
        201: { description: 'Categoria criada com sucesso', ...resCategoria },
        400: { description: 'Dados inválidos', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        403: { description: 'Acesso negado — requer privilégios de administrador', ...resErro },
        409: { description: 'Já existe uma categoria com esse nome', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
  },
  '/categorias/{id}': {
    get: {
      tags: ['Categorias'],
      summary: 'Busca uma categoria pelo ID',
      security: [{ bearerAuth: [] }],
      parameters: [idParam],
      responses: {
        200: { description: 'Categoria encontrada', ...resCategoria },
        400: { description: 'ID inválido', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        404: { description: 'Categoria não encontrada', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
    put: {
      tags: ['Categorias'],
      summary: 'Atualiza uma categoria existente',
      security: [{ bearerAuth: [] }],
      parameters: [idParam],
      requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CategoriaInput' } } } },
      responses: {
        200: { description: 'Categoria atualizada com sucesso', ...resCategoria },
        400: { description: 'Dados inválidos', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        403: { description: 'Acesso negado — requer privilégios de administrador', ...resErro },
        404: { description: 'Categoria não encontrada', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
    delete: {
      tags: ['Categorias'],
      summary: 'Remove uma categoria',
      security: [{ bearerAuth: [] }],
      parameters: [idParam],
      responses: {
        200: { description: 'Categoria removida com sucesso', ...resCategoria },
        400: { description: 'ID inválido', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        403: { description: 'Acesso negado — requer privilégios de administrador', ...resErro },
        404: { description: 'Categoria não encontrada', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
  },
};
