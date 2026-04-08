export const usuariosSchema = {
  Usuario: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      nome: { type: 'string', example: 'João da Silva' },
      matricula: { type: 'string', nullable: true, example: '2024001' },
      perfil: { type: 'string', example: 'aluno' },
      curso: { type: 'string', nullable: true, example: 'Informática' },
      cpf: { type: 'string', example: '123.456.789-00' },
      data_nascimento: { type: 'string', format: 'date', example: '2000-05-15' },
      email: { type: 'string', format: 'email', example: 'joao@email.com' },
      senha: { type: 'string', example: 'senha123' },
      status: { type: 'string', example: 'ativo' },
    },
  },
  UsuarioInput: {
    type: 'object',
    required: ['nome', 'cpf', 'email', 'senha', 'perfil', 'status', 'data_nascimento'],
    properties: {
      nome: { type: 'string', example: 'João da Silva' },
      matricula: { type: 'string', example: '2024001' },
      perfil: { type: 'string', example: 'aluno' },
      curso: { type: 'string', example: 'Informática' },
      cpf: { type: 'string', example: '123.456.789-00' },
      data_nascimento: { type: 'string', format: 'date', example: '2000-05-15' },
      email: { type: 'string', format: 'email', example: 'joao@email.com' },
      senha: { type: 'string', example: 'senha123' },
      status: { type: 'string', example: 'ativo' },
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

const resUsuario = {
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } },
};
const resErro = {
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
};

export const usuariosPaths = {
  '/usuarios': {
    get: {
      tags: ['Usuários'],
      summary: 'Lista todos os usuários',
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: 'Lista retornada com sucesso', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Usuario' } } } } },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        403: { description: 'Acesso negado — requer privilégios de administrador', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
    post: {
      tags: ['Usuários'],
      summary: 'Cria um novo usuário',
      security: [{ bearerAuth: [] }],
      requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UsuarioInput' } } } },
      responses: {
        201: { description: 'Usuário criado com sucesso', ...resUsuario },
        400: { description: 'Dados inválidos ou CPF/Email/Matrícula já cadastrado', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        403: { description: 'Acesso negado — requer privilégios de administrador', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
  },
  '/usuarios/{id}': {
    get: {
      tags: ['Usuários'],
      summary: 'Busca um usuário pelo ID',
      security: [{ bearerAuth: [] }],
      parameters: [idParam],
      responses: {
        200: { description: 'Usuário encontrado', ...resUsuario },
        400: { description: 'ID inválido', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        404: { description: 'Usuário não encontrado', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
    put: {
      tags: ['Usuários'],
      summary: 'Atualiza um usuário existente',
      security: [{ bearerAuth: [] }],
      parameters: [idParam],
      requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UsuarioInput' } } } },
      responses: {
        200: { description: 'Usuário atualizado com sucesso', ...resUsuario },
        400: { description: 'Dados inválidos ou CPF/Email/Matrícula já cadastrado', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        403: { description: 'Acesso negado — requer privilégios de administrador', ...resErro },
        404: { description: 'Usuário não encontrado', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
    delete: {
      tags: ['Usuários'],
      summary: 'Remove um usuário',
      security: [{ bearerAuth: [] }],
      parameters: [idParam],
      responses: {
        204: { description: 'Usuário removido com sucesso' },
        400: { description: 'ID inválido', ...resErro },
        401: { description: 'Token não fornecido ou inválido', ...resErro },
        403: { description: 'Acesso negado — requer privilégios de administrador', ...resErro },
        404: { description: 'Usuário não encontrado', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
  },
};
