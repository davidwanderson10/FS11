-- CreateTable
CREATE TABLE "autores" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(200) NOT NULL,

    CONSTRAINT "autores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(200) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "livros" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "descricao" TEXT,
    "edicao" VARCHAR(10),
    "autor_id" INTEGER NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "img" VARCHAR(300),
    "idioma" VARCHAR(100),
    "num_paginas" INTEGER,
    "editora" VARCHAR(200),
    "estoque" INTEGER,
    "data_publicacao" DATE,

    CONSTRAINT "livros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alunos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(200) NOT NULL,
    "matricula" VARCHAR(20),
    "curso" VARCHAR(100),
    "cpf" CHAR(11),
    "data_nascimento" DATE,
    "email" VARCHAR(200),
    "senha" VARCHAR(100),
    "status" VARCHAR(20),

    CONSTRAINT "alunos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "livro_id" INTEGER NOT NULL,
    "aluno_id" INTEGER NOT NULL,
    "data_inicio" DATE,
    "data_prevista" DATE,
    "data_entrega" DATE,
    "status" VARCHAR(20),

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "livros" ADD CONSTRAINT "fk_livros_autores" FOREIGN KEY ("autor_id") REFERENCES "autores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "livros" ADD CONSTRAINT "fk_livros_categorias" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "fk_pedidos_alunos" FOREIGN KEY ("aluno_id") REFERENCES "alunos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "fk_pedidos_livros" FOREIGN KEY ("livro_id") REFERENCES "livros"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
