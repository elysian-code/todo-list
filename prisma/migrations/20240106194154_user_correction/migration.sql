/*
  Warnings:

  - You are about to drop the column `lastNam` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `lastNam`,
    ADD COLUMN `lastName` VARCHAR(191) NULL;
