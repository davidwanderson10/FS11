import 'dotenv/config';
import express from 'express';
import { login } from '../controllers/loginControllers.js';

const router = express.Router();

// POST /login
router.post('/', login);


export default router;
