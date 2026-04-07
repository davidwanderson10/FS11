import express from 'express';
import {  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
} from '../controllers/categoriasControllers.js';
import { validateToken } from '../controllers/validateTokenControllers.js';
import { validateAdmin } from '../helpers/common.js';


const router = express.Router();

router.get('/', validateToken, getAllCategorias); // GET /categorias
router.get('/:id', validateToken, getCategoriaById); // GET /categorias/:id
router.post('/', validateToken, validateAdmin, createCategoria); // POST /categorias
router.put('/:id', validateToken, validateAdmin, updateCategoria); // PUT /categorias/:id
router.delete('/:id', validateToken, validateAdmin, deleteCategoria); // DELETE /categorias/:id

export default router;