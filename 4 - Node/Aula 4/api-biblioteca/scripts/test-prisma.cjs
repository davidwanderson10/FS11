// scripts/test-prisma.cjs
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
(async () => {
  const prisma = new PrismaClient();
  try {
    const livros = await prisma.livros.findMany({ include: { autores: true, categorias: true }, take: 5 });
    console.log('OK:', livros.length, 'registros (mostrando até 5)');
    console.log(JSON.stringify(livros, null, 2));
  } catch (err) {
    console.error('PRISMA ERROR:');
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
})();