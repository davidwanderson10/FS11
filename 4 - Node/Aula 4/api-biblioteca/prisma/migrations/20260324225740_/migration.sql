/*
  Warnings:

  - Made the column `cpf` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_nascimento` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `senha` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "usuarios" RENAME CONSTRAINT "alunos_pkey" TO "usuarios_pkey";
ALTER COLUMN "cpf" SET NOT NULL;
ALTER COLUMN "data_nascimento" SET NOT NULL;
ALTER COLUMN "email" SET NOT NULL;
ALTER COLUMN "senha" SET NOT NULL;
ALTER COLUMN "status" SET NOT NULL;
