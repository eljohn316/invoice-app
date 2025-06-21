/*
  Warnings:

  - You are about to drop the column `dateAdded` on the `Invoice` table. All the data in the column will be lost.
  - The `createdAt` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `paymentDue` on the `Invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "dateAdded",
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "paymentDue",
ADD COLUMN     "paymentDue" TIMESTAMP(3) NOT NULL;
