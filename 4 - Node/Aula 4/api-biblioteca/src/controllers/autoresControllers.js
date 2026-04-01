import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// lista todos os autores
export async function getAllAutores(req, res) {
  try {
    const autores = await prisma.autores.findMany({orderBy: { nome: 'asc' }   });
    res.json(autores);
  } catch (error) {
    console.error('Erro ao buscar autores:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// cria um novo autor
export async function createAutor(req, res) {
  try {
    const { nome } = req.body;

    if (!nome || typeof nome !== 'string') {
      return res.status(400).json({ error: 'campo "nome" é obrigatório e deve ser string' });
    }

    const trimmed = nome.trim();
    const existente = await prisma.autores.findFirst({
      where: { nome: { equals: trimmed, mode: 'insensitive' } },
    });
    if (existente) {
      return res.status(409).json({ error: 'Já existe um autor com esse nome.' });
    }

    const novoAutor = await prisma.autores.create({
      data: { nome },
    });

    res.status(201).json(novoAutor);
  } catch (error) {
    console.error('Erro ao criar autor:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// atualiza um autor existente
export async function updateAutor(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { nome } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    if (!nome || typeof nome !== 'string') {
      return res.status(400).json({ error: 'campo "nome" é obrigatório e deve ser string' });
    }

    const autorExistente = await prisma.autores.findUnique({ where: { id } });
    if (!autorExistente) {
      return res.status(404).json({ error: 'Autor não encontrado' });
    }

    const autorAtualizado = await prisma.autores.update({
      where: { id },
      data: { nome },
    });

    res.json(autorAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar autor:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// deleta um autor
export async function deleteAutor(req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const autorExistente = await prisma.autores.findUnique({ where: { id } });
    if (!autorExistente) {
      return res.status(404).json({ error: 'Autor não encontrado' });
    }

    await prisma.autores.delete({ where: { id } });
    res.status(200).json(autorExistente);
  } catch (error) {
    console.error('Erro ao deletar autor:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

