export const pedidosSchema = {
  Pedido: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      livroId: { type: 'integer', example: 3 },
      usuarioId: { type: 'integer', example: 2 },
      data_inicio: { type: 'string', format: 'date', example: '2024-04-07' },
      data_prevista: { type: 'string', format: 'date', example: '2024-04-21' },
      status: { type: 'string', example: 'ativo' },
    },
  },
  PedidoInput: {
    type: 'object',
    required: ['livroId', 'usuarioId', 'data_inicio', 'data_prevista'],
    properties: {
      livroId: { type: 'integer', example: 3 },
      usuarioId: { type: 'integer', example: 2 },
      data_inicio: { type: 'string', format: 'date', example: '2024-04-07' },
      data_prevista: { type: 'string', format: 'date', example: '2024-04-21' },
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

const resPedido = {
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Pedido' } } },
};
const resErro = {
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
};

export const pedidosPaths = {
  '/pedidos': {
    get: {
      tags: ['Pedidos'],
      summary: 'Lista todos os pedidos',
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: 'Lista retornada com sucesso', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Pedido' } } } } },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
    post: {
      tags: ['Pedidos'],
      summary: 'Cria um novo pedido',
      security: [{ bearerAuth: [] }],
      requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PedidoInput' } } } },
      responses: {
        201: { description: 'Pedido criado com sucesso', ...resPedido },
        400: { description: 'Campos obrigatórios ausentes ou inválidos', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        403: { description: 'Acesso negado — requer privilégios de administrador', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
  },
  '/pedidos/{id}': {
    get: {
      tags: ['Pedidos'],
      summary: 'Busca um pedido pelo ID',
      security: [{ bearerAuth: [] }],
      parameters: [idParam],
      responses: {
        200: { description: 'Pedido encontrado', ...resPedido },
        400: { description: 'ID inválido', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        404: { description: 'Pedido não encontrado', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
    put: {
      tags: ['Pedidos'],
      summary: 'Atualiza um pedido existente',
      security: [{ bearerAuth: [] }],
      parameters: [idParam],
      requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PedidoInput' } } } },
      responses: {
        200: { description: 'Pedido atualizado com sucesso', ...resPedido },
        400: { description: 'Dados inválidos', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        403: { description: 'Acesso negado — requer privilégios de administrador', ...resErro },
        404: { description: 'Pedido não encontrado', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
    delete: {
      tags: ['Pedidos'],
      summary: 'Remove um pedido',
      security: [{ bearerAuth: [] }],
      parameters: [idParam],
      responses: {
        200: { description: 'Pedido removido com sucesso', ...resPedido },
        400: { description: 'ID inválido', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        403: { description: 'Acesso negado — requer privilégios de administrador', ...resErro },
        404: { description: 'Pedido não encontrado', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
  },
};
