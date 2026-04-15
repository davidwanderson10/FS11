import { jest } from '@jest/globals';
import 'dotenv/config';

// --- Mocks (devem ser declarados antes do import dinamico) ---

const mockFindMany   = jest.fn();
const mockFindUnique = jest.fn();
const mockCreate     = jest.fn();
const mockUpdate     = jest.fn();
const mockDelete     = jest.fn();

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    usuarios: {
      findMany:   mockFindMany,
      findUnique: mockFindUnique,
      create:     mockCreate,
      update:     mockUpdate,
      delete:     mockDelete,
    },
  })),
}));

jest.unstable_mockModule('bcrypt', () => ({
  default: {
    hash:    jest.fn().mockResolvedValue('senhaHasheada'),
    compare: jest.fn().mockResolvedValue(true),
  },
}));

// swagger nao e relevante para os testes - substituimos por stubs simples
jest.unstable_mockModule('../swagger.js', () => ({
  swaggerUi: {
    serve: (_req, _res, next) => next(),
    setup: () => (_req, _res, next) => next(),
  },
  swaggerDocument: {},
}));

// Import dinamico APOS configurar os mocks
const { default: app } = await import('../src/app.js');

import request from 'supertest';
import jwt     from 'jsonwebtoken';

// --- Helpers ---

const SECRET_KEY = process.env.SECRET_KEY || 'kldkajsoidj35298090jl8DKF93m38Dfg325Hsdaasaeas';

function gerarToken(perfil = 'admin') {
  return jwt.sign(
    { userId: 1, username: 'Teste', perfil, email: 'teste@test.com', status: 'ativo' },
    SECRET_KEY,
    { expiresIn: '1h' },
  );
}

const tokenAdmin = gerarToken('admin');
const tokenAluno = gerarToken('aluno');

const usuarioMock = {
  id: 1,
  nome: 'Joao Silva',
  matricula: '2024001',
  perfil: 'aluno',
  curso: 'Engenharia',
  cpf: '12345678901',
  data_nascimento: new Date('2000-01-01').toISOString(),
  email: 'joao@test.com',
  senha: 'senhaHasheada',
  status: 'ativo',
};

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

beforeEach(() => {
  jest.clearAllMocks();
});

// =============================================================
// GET /usuarios
// =============================================================
describe('GET /usuarios', () => {
  test('401 sem token', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.status).toBe(401);
  });

  test('403 token de aluno sem permissao', async () => {
    const res = await request(app)
      .get('/usuarios')
      .set('Authorization', `Bearer ${tokenAluno}`);
    expect(res.status).toBe(403);
  });

  test('200 admin recebe lista de usuarios', async () => {
    mockFindMany.mockResolvedValue([usuarioMock]);

    const res = await request(app)
      .get('/usuarios')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].nome).toBe(usuarioMock.nome);
  });

  test('500 erro interno no banco de dados', async () => {
    mockFindMany.mockRejectedValue(new Error('DB error'));

    const res = await request(app)
      .get('/usuarios')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.status).toBe(500);
  });
});

// =============================================================
// GET /usuarios/:id
// =============================================================
describe('GET /usuarios/:id', () => {
  test('401 sem token', async () => {
    const res = await request(app).get('/usuarios/1');
    expect(res.status).toBe(401);
  });

  test('400 ID invalido string', async () => {
    const res = await request(app)
      .get('/usuarios/abc')
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(res.status).toBe(400);
  });

  test('404 usuario nao encontrado', async () => {
    mockFindUnique.mockResolvedValue(null);

    const res = await request(app)
      .get('/usuarios/999')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/n.o encontrado/i);
  });

  test('200 usuario encontrado', async () => {
    mockFindUnique.mockResolvedValue(usuarioMock);

    const res = await request(app)
      .get('/usuarios/1')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(usuarioMock.id);
    expect(res.body.nome).toBe(usuarioMock.nome);
  });
});

// =============================================================
// POST /usuarios
// =============================================================
describe('POST /usuarios', () => {
  const novoUsuario = {
    nome: 'Maria Souza',
    matricula: '2024002',
    perfil: 'aluno',
    curso: 'Direito',
    cpf: '98765432100',
    data_nascimento: '2001-05-15',
    email: 'maria@test.com',
    senha: 'senha123',
    status: 'ativo',
  };

  test('401 sem token', async () => {
    const res = await request(app).post('/usuarios').send(novoUsuario);
    expect(res.status).toBe(401);
  });

  test('403 token de aluno sem permissao', async () => {
    const res = await request(app)
      .post('/usuarios')
      .set('Authorization', `Bearer ${tokenAluno}`)
      .send(novoUsuario);
    expect(res.status).toBe(403);
  });

  test('400 campos obrigatorios ausentes', async () => {
    const res = await request(app)
      .post('/usuarios')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ nome: 'Incompleto' });
    expect(res.status).toBe(400);
  });

  test('201 usuario criado com sucesso', async () => {
    mockCreate.mockResolvedValue({ id: 2, ...novoUsuario, senha: 'senhaHasheada' });

    const res = await request(app)
      .post('/usuarios')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(novoUsuario);

    expect(res.status).toBe(201);
    expect(res.body.nome).toBe(novoUsuario.nome);
    expect(res.body.email).toBe(novoUsuario.email);
  });

  test('400 CPF email matricula duplicado P2002', async () => {
    const err = new Error('Unique constraint');
    err.code = 'P2002';
    mockCreate.mockRejectedValue(err);

    const res = await request(app)
      .post('/usuarios')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(novoUsuario);

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/CPF|Email|Matr/);
  });
});

// =============================================================
// PUT /usuarios/:id
// =============================================================
describe('PUT /usuarios/:id', () => {
  const dadosUpdate = { nome: 'Joao Atualizado', status: 'inativo' };

  test('401 sem token', async () => {
    const res = await request(app).put('/usuarios/1').send(dadosUpdate);
    expect(res.status).toBe(401);
  });

  test('403 token de aluno sem permissao', async () => {
    const res = await request(app)
      .put('/usuarios/1')
      .set('Authorization', `Bearer ${tokenAluno}`)
      .send(dadosUpdate);
    expect(res.status).toBe(403);
  });

  test('400 ID invalido string', async () => {
    const res = await request(app)
      .put('/usuarios/abc')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(dadosUpdate);
    expect(res.status).toBe(400);
  });

  test('200 usuario atualizado com sucesso', async () => {
    mockUpdate.mockResolvedValue({ ...usuarioMock, ...dadosUpdate });

    const res = await request(app)
      .put('/usuarios/1')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(dadosUpdate);

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe(dadosUpdate.nome);
    expect(res.body.status).toBe(dadosUpdate.status);
  });

  test('404 usuario nao encontrado P2025', async () => {
    const err = new Error('Record not found');
    err.code = 'P2025';
    mockUpdate.mockRejectedValue(err);

    const res = await request(app)
      .put('/usuarios/999')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(dadosUpdate);

    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/n.o encontrado/i);
  });

  test('400 CPF email matricula duplicado P2002', async () => {
    const err = new Error('Unique constraint');
    err.code = 'P2002';
    mockUpdate.mockRejectedValue(err);

    const res = await request(app)
      .put('/usuarios/1')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ cpf: '12345678901' });

    expect(res.status).toBe(400);
  });
});

// =============================================================
// DELETE /usuarios/:id
// =============================================================
describe('DELETE /usuarios/:id', () => {
  test('401 sem token', async () => {
    const res = await request(app).delete('/usuarios/1');
    expect(res.status).toBe(401);
  });

  test('403 token de aluno sem permissao', async () => {
    const res = await request(app)
      .delete('/usuarios/1')
      .set('Authorization', `Bearer ${tokenAluno}`);
    expect(res.status).toBe(403);
  });

  test('400 ID invalido string', async () => {
    const res = await request(app)
      .delete('/usuarios/abc')
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(res.status).toBe(400);
  });

  test('204 usuario deletado com sucesso', async () => {
    mockDelete.mockResolvedValue({});

    const res = await request(app)
      .delete('/usuarios/1')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.status).toBe(204);
  });

  test('404 usuario nao encontrado P2025', async () => {
    const err = new Error('Record not found');
    err.code = 'P2025';
    mockDelete.mockRejectedValue(err);

    const res = await request(app)
      .delete('/usuarios/999')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/n.o encontrado/i);
  });
});
