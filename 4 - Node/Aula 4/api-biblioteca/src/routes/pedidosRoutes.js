import express from 'express';
import {
  getAllPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido  
} from '../controllers/pedidosControllers.js';
import { validateToken } from '../controllers/validateTokenControllers.js';
import { validateAdmin } from '../helpers/common.js';

const router = express.Router();

router.get('/', validateToken, getAllPedidos); // GET /pedidos
router.get('/:id', validateToken, getPedidoById); // GET /pedidos/:id
router.post('/', validateToken, validateAdmin, createPedido); // POST /pedidos
router.put('/:id', validateToken, validateAdmin, updatePedido); // PUT /pedidos/:id
router.delete('/:id', validateToken, validateAdmin, deletePedido); // DELETE /pedidos/:id

export default router;