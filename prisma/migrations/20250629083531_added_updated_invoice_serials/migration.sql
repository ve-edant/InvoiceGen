/*
  Warnings:

  - You are about to drop the column `serialNumber` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `invoicePrefix` on the `InvoiceDetails` table. All the data in the column will be lost.
  - Added the required column `invoiceNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoicePrefix` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "serialNumber",
ADD COLUMN     "invoiceNumber" INTEGER NOT NULL,
ADD COLUMN     "invoicePrefix" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InvoiceDetails" DROP COLUMN "invoicePrefix";
