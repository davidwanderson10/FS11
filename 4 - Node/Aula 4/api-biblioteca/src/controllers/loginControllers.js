import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
const secretKey = process.env.SECRET_KEY

export async function login(req, res) {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const usuario = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const payload = { 
      userId: usuario.id, 
      username: usuario.nome, 
      matricula: usuario.matricula,
      perfil: usuario.perfil,
      email: usuario.email,
      curso: usuario.curso,
      status: usuario.status

    }

    const token = jwt.sign(payload, secretKey, { expiresIn: '18h' });

    return res.json({ token });
  } catch (err) {
    console.error('Prisma query failed (login):', err);
    return res.status(500).json({ error: 'Database connection error' });
  }
}
