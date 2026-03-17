import 'dotenv/config';
import express from 'express';
import {
  getLivros,
  getLivroById,
  createLivro,
  updateLivro,
  deleteLivro,
} from '../controllers/livrosControllers.js';

const router = express.Router();


router.get('/', getLivros); // GET /livros
router.get('/:id', getLivroById); // GET /livros/:id
router.post('/', createLivro); // POST /livros
router.put('/:id', updateLivro); // PUT /livros/:id
router.delete('/:id', deleteLivro); // DELETE /livros/:id

export default router;