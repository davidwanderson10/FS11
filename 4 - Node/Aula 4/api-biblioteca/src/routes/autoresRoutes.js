import express from 'express';
import {  getAllAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor,
} from '../controllers/autoresControllers.js';
import { validateToken } from '../controllers/validateTokenControllers.js';
import { validateAdmin } from '../helpers/common.js';

const router = express.Router();

router.get('/', getAllAutores); // GET /autores
router.get('/:id', validateToken, getAutorById); // GET /autores/:id
router.post('/', validateToken, validateAdmin, createAutor); // POST /autores
router.put('/:id', validateToken, validateAdmin, updateAutor); // PUT /autores/:id
router.delete('/:id', validateToken, validateAdmin, deleteAutor); // DELETE /autores/:id

export default router;