import 'dotenv/config';
import express from 'express';
import autoresRoutes from './routes/autores.js';
import categoriasRoutes from './routes/categorias.js';

const app = express(); // Criando a aplicação Express

app.use(express.json()); // Middleware para parsear JSON

// Configurando as rotas
app.use('/autores', autoresRoutes);
app.use('/categorias', categoriasRoutes);

const PORT = 3000; // Definindo a porta do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando no link http://localhost:${PORT}`);
});
    

