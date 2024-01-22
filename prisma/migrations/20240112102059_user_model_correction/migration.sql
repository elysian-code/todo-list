/*
  Warnings:

  - You are about to drop the column `UserId` on the `todos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `todos` DROP FOREIGN KEY `Todos_UserId_fkey`;

-- AlterTable
ALTER TABLE `todos` DROP COLUMN `UserId`;
