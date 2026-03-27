import 'dotenv/config';
import express from 'express';
import { 
    getUsuarios, 
    getUsuarioById, 
    createUsuario, 
    updateUsuario, 
    deleteUsuario 
} from '../controllers/usuariosControllers.js';

const router = express.Router();

router.get('/', getUsuarios); // GET /usuarios
router.get('/:id', getUsuarioById); // GET /usuarios/:id
router.post('/', createUsuario); // POST /usuarios
router.put('/:id', updateUsuario); // PUT /usuarios/:id
router.delete('/:id', deleteUsuario); // DELETE /usuarios/:id

export default router;
