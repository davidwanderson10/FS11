import 'dotenv/config';
import express from 'express';
import { validateToken } from '../controllers/validateTokenControllers.js';

const router = express.Router();

router.get('/', validateToken); // GET /validate-token

export default router;
