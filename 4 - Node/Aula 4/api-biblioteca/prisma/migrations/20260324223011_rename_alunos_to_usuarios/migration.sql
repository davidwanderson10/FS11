/*
  Warnings:

  - You are about to drop the column `aluno_id` on the `pedidos` table. All the data in the column will be lost.
  - You are about to drop the `alunos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usuario_id` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pedidos" DROP CONSTRAINT "fk_pedidos_alunos";

-- AlterTable
ALTER TABLE "alunos" RENAME TO "usuarios";

-- AlterTable
ALTER TABLE "pedidos" DROP COLUMN "aluno_id",
ADD COLUMN     "usuario_id" INTEGER NOT NULL;

-- AlterTable add column perfil
ALTER TABLE "usuarios" ADD COLUMN "perfil" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_matricula_key" ON "usuarios"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "fk_pedidos_usuarios" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
