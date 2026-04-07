import swaggerUi from 'swagger-ui-express';
import { autoresSchema, autoresPaths } from './src/schemas/autores.js';

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
          error: {
            type: 'string',
            example: 'Mensagem de erro',
          },
        },
      },
      ...autoresSchema,
    },
  },
  paths: {
    ...autoresPaths,
  },
};

export { swaggerUi, swaggerDocument };
