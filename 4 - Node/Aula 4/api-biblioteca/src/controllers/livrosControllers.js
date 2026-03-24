import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

export async function getLivros(req, res) {
  try {
    const livros = await prisma.livros.findMany({
      orderBy: { titulo: 'asc' },
      include: { autores: true, categorias: true },
    });
    return res.json(livros);
  } catch (err) {
    console.error('Prisma query failed (getLivros):', err);
    return res.status(500).json({ error: 'Database connection error' });
  }
}

export async function getLivroById(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID inválido. Deve ser um inteiro positivo.' });
  }

  try {
    const livro = await prisma.livros.findUnique({
      where: { id },
      include: { autores: true, categorias: true },
    });
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado.' });
    return res.json(livro);
  } catch (err) {
    console.error('Prisma query failed (getLivroById):', err);
    return res.status(500).json({ error: 'Database connection error' });
  }
}

function validateLivroPayload(payload, checkRequired = true) {
  const errors = [];
  if (checkRequired) {
    if (!payload.titulo || typeof payload.titulo !== 'string' || !payload.titulo.trim()) {
      errors.push('Campo "titulo" é obrigatório e deve ser uma string não vazia.');
    }
    if (!Number.isInteger(payload.autorId) || payload.autorId <= 0) {
      errors.push('Campo "autorId" é obrigatório e deve ser um inteiro positivo.');
    }
    if (!Number.isInteger(payload.categoriaId) || payload.categoriaId <= 0) {
      errors.push('Campo "categoriaId" é obrigatório e deve ser um inteiro positivo.');
    }
  }

  if (payload.titulo && payload.titulo.trim().length > 200) errors.push('Campo "titulo" excede 200 caracteres.');
  if (payload.edicao && String(payload.edicao).length > 10) errors.push('Campo "edicao" excede 10 caracteres.');
  if (payload.img && String(payload.img).length > 300) errors.push('Campo "img" excede 300 caracteres.');
  if (payload.idioma && String(payload.idioma).length > 100) errors.push('Campo "idioma" excede 100 caracteres.');
  if (payload.editora && String(payload.editora).length > 200) errors.push('Campo "editora" excede 200 caracteres.');
  if (payload.num_paginas !== undefined && (!Number.isInteger(payload.num_paginas) || payload.num_paginas < 0)) errors.push('Campo "num_paginas" deve ser inteiro não-negativo.');
  if (payload.estoque !== undefined && (!Number.isInteger(payload.estoque) || payload.estoque < 0)) errors.push('Campo "estoque" deve ser inteiro não-negativo.');
  if (payload.data_publicacao && isNaN(Date.parse(payload.data_publicacao))) errors.push('Campo "data_publicacao" deve ser uma data válida (YYYY-MM-DD).');

  return errors;
}

export async function createLivro(req, res) {
  const payload = {
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    edicao: req.body.edicao,
    autorId: req.body.autorId !== undefined ? Number(req.body.autorId) : undefined,
    categoriaId: req.body.categoriaId !== undefined ? Number(req.body.categoriaId) : undefined,
    img: req.file ? `/uploads/${req.file.filename}` : req.body.img,
    idioma: req.body.idioma,
    num_paginas: req.body.num_paginas !== undefined && req.body.num_paginas !== '' ? Number(req.body.num_paginas) : undefined,
    editora: req.body.editora,
    estoque: req.body.estoque !== undefined && req.body.estoque !== '' ? Number(req.body.estoque) : undefined,
    data_publicacao: req.body.data_publicacao,
  };

  const errors = validateLivroPayload(payload, true);
  if (errors.length) return res.status(400).json({ errors });

  try {
    const novo = await prisma.livros.create({
      data: {
        titulo: payload.titulo.trim(),
        descricao: payload.descricao ?? null,
        edicao: payload.edicao ?? null,
        autorId: payload.autorId,
        categoriaId: payload.categoriaId,
        img: payload.img ?? null,
        idioma: payload.idioma ?? null,
        num_paginas: payload.num_paginas ?? null,
        editora: payload.editora ?? null,
        estoque: payload.estoque ?? null,
        data_publicacao: payload.data_publicacao ? new Date(payload.data_publicacao) : null,
      },
    });

    return res.status(201).json(novo);
  } catch (err) {
    console.error('Prisma create failed (createLivro):', err);
    if (err && err.code === 'P2003') {
      return res.status(409).json({ error: 'Chave estrangeira inválida: verifique autorId e categoriaId.' });
    }
    return res.status(500).json({ error: 'Erro ao criar livro' });
  }
}

export async function updateLivro(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'ID inválido. Deve ser um inteiro positivo.' });

  const payload = {
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    edicao: req.body.edicao,
    autorId: req.body.autorId !== undefined ? Number(req.body.autorId) : undefined,
    categoriaId: req.body.categoriaId !== undefined ? Number(req.body.categoriaId) : undefined,
    img: req.file ? `/uploads/${req.file.filename}` : req.body.img,
    idioma: req.body.idioma,
    num_paginas: req.body.num_paginas !== undefined && req.body.num_paginas !== '' ? Number(req.body.num_paginas) : undefined,
    editora: req.body.editora,
    estoque: req.body.estoque !== undefined && req.body.estoque !== '' ? Number(req.body.estoque) : undefined,
    data_publicacao: req.body.data_publicacao,
  };

  const errors = validateLivroPayload(payload, false);
  if (errors.length) return res.status(400).json({ errors });

  const dataToUpdate = {};
  if (payload.titulo !== undefined) dataToUpdate.titulo = payload.titulo.trim();
  if (payload.descricao !== undefined) dataToUpdate.descricao = payload.descricao;
  if (payload.edicao !== undefined) dataToUpdate.edicao = payload.edicao;
  if (payload.autorId !== undefined) dataToUpdate.autorId = payload.autorId;
  if (payload.categoriaId !== undefined) dataToUpdate.categoriaId = payload.categoriaId;
  if (payload.img !== undefined) dataToUpdate.img = payload.img;
  if (payload.idioma !== undefined) dataToUpdate.idioma = payload.idioma;
  if (payload.num_paginas !== undefined) dataToUpdate.num_paginas = payload.num_paginas;
  if (payload.editora !== undefined) dataToUpdate.editora = payload.editora;
  if (payload.estoque !== undefined) dataToUpdate.estoque = payload.estoque;
  if (payload.data_publicacao !== undefined) dataToUpdate.data_publicacao = payload.data_publicacao ? new Date(payload.data_publicacao) : null;

  try {
    const atualizado = await prisma.livros.update({ where: { id }, data: dataToUpdate });
    return res.json(atualizado);
  } catch (err) {
    console.error('Prisma update failed (updateLivro):', err);
    if (err && err.code === 'P2025') return res.status(404).json({ error: 'Livro não encontrado.' });
    if (err && err.code === 'P2003') return res.status(409).json({ error: 'Chave estrangeira inválida: verifique autorId e categoriaId.' });
    return res.status(500).json({ error: 'Erro ao atualizar livro' });
  }
}

export async function deleteLivro(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'ID inválido. Deve ser um inteiro positivo.' });

  try {
    await prisma.livros.delete({ where: { id } });
    return res.status(200).json({ message: 'Livro deletado com sucesso.' });
  } catch (err) {
    console.error('Prisma delete failed (deleteLivro):', { message: err?.message, code: err?.code, meta: err?.meta });
    if (err && err.code === 'P2025') return res.status(404).json({ error: 'Livro não encontrado.' });
    if (err && err.code === 'P2003') return res.status(409).json({ error: 'Não é possível deletar: existem registros relacionados que dependem deste livro.' });
    return res.status(500).json({ error: 'Erro ao deletar livro' });
  }
}
