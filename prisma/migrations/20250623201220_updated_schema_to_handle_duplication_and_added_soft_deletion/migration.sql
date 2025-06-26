/*
  Warnings:

  - You are about to drop the column `additionalInfoId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumber` on the `InvoiceDetails` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AdditionalInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BillingField` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[companyDetailsId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientDetailsId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoiceDetailsId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[additionalInformationId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientPhone` to the `ClientDetails` table without a default value. This is not possible if the table is not empty.
  - Made the column `clientEmail` on table `ClientDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyEmail` on table `CompanyDetails` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `serialNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BillingField" DROP CONSTRAINT "BillingField_invoiceDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_additionalInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_invoiceDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_userId_fkey";

-- AlterTable
ALTER TABLE "ClientDetails" ADD COLUMN     "clientPhone" TEXT NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "clientEmail" SET NOT NULL;

-- AlterTable
ALTER TABLE "CompanyDetails" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "companyEmail" SET NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "additionalInfoId",
DROP COLUMN "clientId",
DROP COLUMN "companyId",
ADD COLUMN     "additionalInformationId" TEXT,
ADD COLUMN     "clientDetailsId" TEXT,
ADD COLUMN     "companyDetailsId" TEXT,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "serialNumber" TEXT NOT NULL,
ALTER COLUMN "invoiceDetailsId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "InvoiceDetails" DROP COLUMN "serialNumber",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "invoiceDate" SET DATA TYPE DATE,
ALTER COLUMN "dueDate" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "InvoiceItem" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "AdditionalInfo";

-- DropTable
DROP TABLE "BillingField";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "BillingDetails" (
    "id" TEXT NOT NULL,
    "invoiceDetailsId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" "BillingType" NOT NULL,

    CONSTRAINT "BillingDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdditionalInformation" (
    "id" TEXT NOT NULL,
    "notes" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AdditionalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "ClientDetails_clientEmail_idx" ON "ClientDetails"("clientEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_companyDetailsId_key" ON "Invoice"("companyDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_clientDetailsId_key" ON "Invoice"("clientDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceDetailsId_key" ON "Invoice"("invoiceDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_additionalInformationId_key" ON "Invoice"("additionalInformationId");

-- CreateIndex
CREATE INDEX "Invoice_userId_idx" ON "Invoice"("userId");

-- CreateIndex
CREATE INDEX "InvoiceDetails_invoiceDate_idx" ON "InvoiceDetails"("invoiceDate");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_companyDetailsId_fkey" FOREIGN KEY ("companyDetailsId") REFERENCES "CompanyDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientDetailsId_fkey" FOREIGN KEY ("clientDetailsId") REFERENCES "ClientDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_invoiceDetailsId_fkey" FOREIGN KEY ("invoiceDetailsId") REFERENCES "InvoiceDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_additionalInformationId_fkey" FOREIGN KEY ("additionalInformationId") REFERENCES "AdditionalInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingDetails" ADD CONSTRAINT "BillingDetails_invoiceDetailsId_fkey" FOREIGN KEY ("invoiceDetailsId") REFERENCES "InvoiceDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
