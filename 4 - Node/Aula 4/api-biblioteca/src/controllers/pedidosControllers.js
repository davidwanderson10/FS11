import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// lista todos os pedidos
export async function getAllPedidos(req, res) {
  try {
    const pedidos = await prisma.pedidos.findMany({orderBy: { id: 'asc' }   });
    res.json(pedidos);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// lista um pedido por ID
export async function getPedidoById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const pedido = await prisma.pedidos.findUnique({ where: { id } });
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    } else {
      res.json(pedido);
    }
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// cria um novo pedido
export async function createPedido(req, res) {
  try {
    const { livroId, usuarioId, data_inicio, data_prevista } = req.body;

    if (!livroId || !usuarioId || !data_inicio || !data_prevista) {
      return res.status(400).json({ error: 'Campos livroId, usuarioId, data_inicio, data_prevista são obrigatórios' });
    }

    const novoPedido = await prisma.pedidos.create({
      data: { livroId, usuarioId, data_inicio, data_prevista, status: 'ativo' },
    });

    res.status(201).json(novoPedido);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// atualiza um pedido existente
export async function updatePedido(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { livroId, usuarioId, data_inicio, data_prevista } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    if (!livroId || !usuarioId || !data_inicio || !data_prevista) {
      return res.status(400).json({ error: 'Campos livroId, usuarioId, data_inicio, data_prevista são obrigatórios' });
    }

    const pedidoExistente = await prisma.pedidos.findUnique({ where: { id } });
    if (!pedidoExistente) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    const pedidoAtualizado = await prisma.pedidos.update({
      where: { id },
      data: { livroId, usuarioId, data_inicio, data_prevista },
    });

    res.json(pedidoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// deleta um pedido
export async function deletePedido(req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const pedidoExistente = await prisma.pedidos.findUnique({ where: { id } });
    if (!pedidoExistente) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    await prisma.pedidos.delete({ where: { id } });
    res.status(200).json(pedidoExistente);
  } catch (error) {
    console.error('Erro ao deletar pedido:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

