export const autoresSchema = {
  Autor: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1,
      },
      nome: {
        type: 'string',
        example: 'Machado de Assis',
      },
    },
  },

  AutorInput: {
    type: 'object',
    required: ['nome'],
    properties: {
      nome: {
        type: 'string',
        example: 'Machado de Assis',
      },
    },
  },
};

export const autoresPaths = {
  '/autores': {
    get: {
      tags: ['Autores'],
      summary: 'Lista todos os autores',
      responses: {
        200: {
          description: 'Lista de autores retornada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Autor' },
              },
            },
          },
        },
        500: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
      },
    },
    post: {
      tags: ['Autores'],
      summary: 'Cria um novo autor',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/AutorInput' },
          },
        },
      },
      responses: {
        201: {
          description: 'Autor criado com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Autor' },
            },
          },
        },
        400: {
          description: 'Dados inválidos',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
        401: {
          description: 'Token não fornecido ou inválido',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
        403: {
          description: 'Acesso negado — requer privilégios de administrador',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
        409: {
          description: 'Já existe um autor com esse nome',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
        500: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
      },
    },
  },

  '/autores/{id}': {
    get: {
      tags: ['Autores'],
      summary: 'Busca um autor pelo ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          example: 1,
        },
      ],
      responses: {
        200: {
          description: 'Autor encontrado com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Autor' },
            },
          },
        },
        400: {
          description: 'ID inválido',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
        401: {
          description: 'Token não fornecido ou inválido',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
        404: {
          description: 'Autor não encontrado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
        500: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
      },
    },
    put: {
      tags: ['Autores'],
      summary: 'Atualiza um autor existente',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          example: 1,
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/AutorInput' },
          },
        },
      },
      responses: {
        200: {
          description: 'Autor atualizado com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Autor' },
            },
          },
        },
        400: {
          description: 'Dados inválidos',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
        401: {
          description: 'Token não fornecido ou inválido',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
        403: {
          description: 'Acesso negado — requer privilégios de administrador',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
        404: {
          description: 'Autor não encontrado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
        500: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
      },
    },
    delete: {
      tags: ['Autores'],
      summary: 'Remove um autor',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          example: 1,
        },
      ],
      responses: {
        200: {
          description: 'Autor removido com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Autor' },
            },
          },
        },
        400: {
          description: 'ID inválido',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
        401: {
          description: 'Token não fornecido ou inválido',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
        403: {
          description: 'Acesso negado — requer privilégios de administrador',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
        404: {
          description: 'Autor não encontrado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
        500: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Erro' },
            },
          },
        },
      },
    },
  },
};
