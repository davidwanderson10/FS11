import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /autores
router.get('/', async (req, res) => {
  const autores = await prisma.autores.findMany();
  res.json(autores);
});

// POST /autores
router.post('/', async (req, res) => {
  try {
    const { nome } = req.body;

    // simples validação
    if (!nome || typeof nome !== 'string') {
      return res.status(400).json({ error: 'campo "nome" é obrigatório e deve ser string' });
    }

    const novoAutor = await prisma.autores.create({
      data: { nome },
    });

    res.status(201).json(novoAutor);
  } catch (error) {
    console.error('Erro ao criar autor:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT /autores/:id
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
});

// DELETE /autores/:id
router.delete('/:id', async (req, res) => {
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
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar autor:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});



export default router;