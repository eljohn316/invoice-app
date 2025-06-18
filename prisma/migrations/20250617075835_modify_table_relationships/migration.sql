/*
  Warnings:

  - You are about to drop the column `clientAddressId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `senderAddressId` on the `Invoice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invoiceId]` on the table `ClientAddress` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoiceId]` on the table `SenderAddress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoiceId` to the `ClientAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceId` to the `SenderAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_clientAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_senderAddressId_fkey";

-- DropIndex
DROP INDEX "Invoice_clientAddressId_key";

-- DropIndex
DROP INDEX "Invoice_senderAddressId_key";

-- AlterTable
ALTER TABLE "ClientAddress" ADD COLUMN     "invoiceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "clientAddressId",
DROP COLUMN "senderAddressId";

-- AlterTable
ALTER TABLE "SenderAddress" ADD COLUMN     "invoiceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ClientAddress_invoiceId_key" ON "ClientAddress"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "SenderAddress_invoiceId_key" ON "SenderAddress"("invoiceId");

-- AddForeignKey
ALTER TABLE "SenderAddress" ADD CONSTRAINT "SenderAddress_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientAddress" ADD CONSTRAINT "ClientAddress_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
