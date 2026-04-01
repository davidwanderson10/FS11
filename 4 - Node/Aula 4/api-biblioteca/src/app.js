import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import autoresRoutes from './routes/autoresRoutes.js';
import categoriasRoutes from './routes/categoriasRoutes.js';
import livrosRoutes from './routes/livrosRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import validateTokenRoutes from './routes/validateTokenRoutes.js';
import pedidosRoutes from './routes/pedidosRoutes.js';

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
app.use('/login', loginRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/validate-token', validateTokenRoutes);
app.use('/pedidos', pedidosRoutes);

const PORT = 3000; // Definindo a porta do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando no link http://localhost:${PORT}`);
});
    

