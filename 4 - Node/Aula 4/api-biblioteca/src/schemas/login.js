export const loginSchema = {
  LoginInput: {
    type: 'object',
    required: ['email', 'senha'],
    properties: {
      email: { type: 'string', format: 'email', example: 'usuario@email.com' },
      senha: { type: 'string', example: 'senha123' },
    },
  },
  LoginResponse: {
    type: 'object',
    properties: {
      token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
    },
  },
};

const resErro = {
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
};

export const loginPaths = {
  '/login': {
    post: {
      tags: ['Login'],
      summary: 'Autentica um usuário e retorna um token JWT',
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginInput' } } },
      },
      responses: {
        200: {
          description: 'Login realizado com sucesso',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } },
        },
        400: { description: 'Email e senha são obrigatórios', ...resErro },
        401: { description: 'Credenciais inválidas', ...resErro },
        500: { description: 'Erro interno do servidor', ...resErro },
      },
    },
  },
};
