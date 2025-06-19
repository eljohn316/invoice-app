/*
  Warnings:

  - Made the column `street` on table `ClientAddress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `ClientAddress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postCode` on table `ClientAddress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `ClientAddress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `paymentDue` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `paymentTerms` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clientName` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clientEmail` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `street` on table `SenderAddress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `SenderAddress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postCode` on table `SenderAddress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `SenderAddress` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ClientAddress" ALTER COLUMN "street" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "postCode" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TEXT,
ALTER COLUMN "paymentDue" SET NOT NULL,
ALTER COLUMN "paymentDue" SET DATA TYPE TEXT,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "paymentTerms" SET NOT NULL,
ALTER COLUMN "paymentTerms" SET DATA TYPE TEXT,
ALTER COLUMN "clientName" SET NOT NULL,
ALTER COLUMN "clientEmail" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "total" SET NOT NULL;

-- AlterTable
ALTER TABLE "SenderAddress" ALTER COLUMN "street" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "postCode" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL;
