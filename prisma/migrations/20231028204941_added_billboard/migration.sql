/*
  Warnings:

  - You are about to alter the column `name` on the `Store` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(255)`.

*/
-- AlterTable
ALTER TABLE "Store" ALTER COLUMN "name" SET DATA TYPE CHAR(255);

-- CreateTable
CREATE TABLE "Billboard" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "label" CHAR(255) NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Billboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Billboard_storeId_idx" ON "Billboard"("storeId");
