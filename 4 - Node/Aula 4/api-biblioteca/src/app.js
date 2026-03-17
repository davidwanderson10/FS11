import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import autoresRoutes from './routes/autoresRoutes.js';
import categoriasRoutes from './routes/categoriasRoutes.js';
import livrosRoutes from './routes/livrosRoutes.js';

const app = express(); // Criando a aplicação Express

// Middleware de CORS
app.use(cors());

// Middleware para parsear JSON - DEVE VIR ANTES DAS ROTAS
app.use(express.json());

// Servindo arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Configurando as rotas
app.use('/autores', autoresRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/livros', livrosRoutes);

const PORT = 3000; // Definindo a porta do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando no link http://localhost:${PORT}`);
});
    

