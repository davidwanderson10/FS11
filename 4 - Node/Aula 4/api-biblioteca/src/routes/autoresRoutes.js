import express from 'express';
import {  getAllAutores,
  createAutor,
  updateAutor,
  deleteAutor,
} from '../controllers/autoresControllers.js';
import { validateToken } from '../controllers/validateTokenControllers.js';

const router = express.Router();

router.get('/', getAllAutores); // GET /autores
router.post('/', validateToken, createAutor); // POST /autores
router.put('/:id', validateToken, updateAutor); // PUT /autores/:id
router.delete('/:id', validateToken, deleteAutor); // DELETE /autores/:id

export default router;