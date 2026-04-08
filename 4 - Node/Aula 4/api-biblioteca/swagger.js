import swaggerUi from 'swagger-ui-express';
import { autoresSchema, autoresPaths } from './src/schemas/autores.js';
import { categoriasSchema, categoriasPaths } from './src/schemas/categorias.js';
import { livrosSchema, livrosPaths } from './src/schemas/livros.js';
import { loginSchema, loginPaths } from './src/schemas/login.js';
import { usuariosSchema, usuariosPaths } from './src/schemas/usuarios.js';
import { pedidosSchema, pedidosPaths } from './src/schemas/pedidos.js';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Biblioteca',
    version: '1.0.0',
    description: 'Documentação da API de gerenciamento de biblioteca',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Erro: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Mensagem de erro' },
        },
      },
      ...autoresSchema,
      ...categoriasSchema,
      ...livrosSchema,
      ...loginSchema,
      ...usuariosSchema,
      ...pedidosSchema,
    },
  },
  paths: {
    ...loginPaths,
    ...autoresPaths,
    ...categoriasPaths,
    ...livrosPaths,
    ...usuariosPaths,
    ...pedidosPaths,
  },
};

export { swaggerUi, swaggerDocument };
