import express from 'express';
import {  getAllAutores,
  createAutor,
  updateAutor,
  deleteAutor,
} from '../controllers/autoresControllers.js';

const router = express.Router();

router.get('/', getAllAutores); // GET /autores
router.post('/', createAutor); // POST /autores
router.put('/:id', updateAutor); // PUT /autores/:id
router.delete('/:id', deleteAutor); // DELETE /autores/:id

export default router;