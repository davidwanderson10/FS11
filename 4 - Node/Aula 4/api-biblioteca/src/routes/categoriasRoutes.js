import express from 'express';
import {  getAllCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from '../controllers/categoriasControllers.js';

const router = express.Router();

router.get('/', getAllCategorias); // GET /categorias
router.post('/', createCategoria); // POST /categorias
router.put('/:id', updateCategoria); // PUT /categorias/:id
router.delete('/:id', deleteCategoria); // DELETE /categorias/:id

export default router;