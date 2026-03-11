import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /categorias
router.get('/', async (req, res) => {
  const categorias = await prisma.categorias.findMany();
  res.json(categorias);
});

// POST /categorias
router.post('/', async (req, res) => {
  try {
    const { nome } = req.body;

    // simples validação
    if (!nome || typeof nome !== 'string') {
      return res.status(400).json({ error: 'campo "nome" é obrigatório e deve ser string' });
    }

    const novaCategoria = await prisma.categorias.create({
      data: { nome },
    });

    res.status(201).json(novaCategoria);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT /categorias/:id
router.put('/:id', async (req, res) => {
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
});

// DELETE /categorias/:id
router.delete('/:id', async (req, res) => {
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
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


export default router;