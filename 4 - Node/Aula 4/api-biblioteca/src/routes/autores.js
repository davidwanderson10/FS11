import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /autores
router.get('/', async (req, res) => {
  const autores = await prisma.autores.findMany();
  res.json(autores);
});

export default router;