import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// lista todas as categorias
export async function getAllCategorias(req, res) {
  try {
    const categorias = await prisma.categorias.findMany({orderBy: { nome: 'asc' }   });
    res.json(categorias);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// cria uma nova categoria
export async function createCategoria(req, res) {
  try {
    const { nome } = req.body;

    if (!nome || typeof nome !== 'string') {
      return res.status(400).json({ error: 'campo "nome" é obrigatório e deve ser string' });
    }

    const trimmed = nome.trim();
    const existente = await prisma.categorias.findFirst({
      where: { nome: { equals: trimmed, mode: 'insensitive' } },
    });
    if (existente) {
      return res.status(409).json({ error: 'Já existe uma categoria com esse nome.' });
    }

    const novaCategoria = await prisma.categorias.create({
      data: { nome },
    });

    res.status(201).json(novaCategoria);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// atualiza uma categoria existente
export async function updateCategoria(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { nome } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    if (!nome || typeof nome !== 'string') {
      return res.status(400).json({ error: 'campo "nome" é obrigatório e deve ser string' });
    }

    const categoriaExistente = await prisma.categorias.findUnique({ where: { id } });
    if (!categoriaExistente) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    const categoriaAtualizada = await prisma.categorias.update({
      where: { id },
      data: { nome },
    });

    res.json(categoriaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// deleta uma categoria
export async function deleteCategoria(req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const categoriaExistente = await prisma.categorias.findUnique({ where: { id } });
    if (!categoriaExistente) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    await prisma.categorias.delete({ where: { id } });
    res.status(200).json(categoriaExistente);
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
