import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsuarios(req, res) {
  try {
    const usuarios = await prisma.usuarios.findMany();
    res.json(usuarios);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
}

export async function getUsuarioById(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'ID inválido' });

  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { id },
    });
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
}

export async function createUsuario(req, res) {
  const { nome, matricula, perfil, curso, cpf, data_nascimento, email, senha, status } = req.body;
  
  if (!nome || !cpf || !email || !senha || !perfil || !status || !data_nascimento) {
    return res.status(400).json({ error: 'Campos obrigatórios: nome, cpf, email, senha, perfil, status, data_nascimento' });
  }

  try {
    const usuario = await prisma.usuarios.create({
      data: {
        nome,
        matricula,
        perfil,
        curso,
        cpf,
        data_nascimento: new Date(data_nascimento),
        email,
        senha,
        status,
      },
    });
    res.status(201).json(usuario);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Já existe um usuário com este CPF, Email ou Matrícula.' });
    }
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

export async function updateUsuario(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'ID inválido' });

  const { nome, matricula, perfil, curso, cpf, data_nascimento, email, senha, status } = req.body;

  try {
    const usuario = await prisma.usuarios.update({
      where: { id },
      data: {
        nome,
        matricula,
        perfil,
        curso,
        cpf,
        data_nascimento: data_nascimento ? new Date(data_nascimento) : undefined,
        email,
        senha,
        status,
      },
    });
    res.json(usuario);
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Já existe um usuário com este CPF, Email ou Matrícula.' });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
}

export async function deleteUsuario(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'ID inválido' });

  try {
    await prisma.usuarios.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
}