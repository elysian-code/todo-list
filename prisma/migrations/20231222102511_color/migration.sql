/*
  Warnings:

  - Added the required column `color` to the `Categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categories` ADD COLUMN `color` VARCHAR(191) NOT NULL;
