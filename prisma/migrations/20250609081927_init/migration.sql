-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'paid', 'draft');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentDue" TIMESTAMP(3),
    "description" TEXT,
    "paymentTerms" INTEGER,
    "clientName" TEXT,
    "clientEmail" TEXT,
    "status" "Status" DEFAULT 'draft',
    "total" DECIMAL(65,30),
    "senderAddressId" INTEGER NOT NULL,
    "clientAddressId" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SenderAddress" (
    "id" SERIAL NOT NULL,
    "street" TEXT,
    "city" TEXT,
    "postCode" TEXT,
    "country" TEXT,

    CONSTRAINT "SenderAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientAddress" (
    "id" SERIAL NOT NULL,
    "street" TEXT,
    "city" TEXT,
    "postCode" TEXT,
    "country" TEXT,

    CONSTRAINT "ClientAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "invoiceId" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_id_key" ON "Invoice"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_senderAddressId_key" ON "Invoice"("senderAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_clientAddressId_key" ON "Invoice"("clientAddressId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_senderAddressId_fkey" FOREIGN KEY ("senderAddressId") REFERENCES "SenderAddress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientAddressId_fkey" FOREIGN KEY ("clientAddressId") REFERENCES "ClientAddress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
