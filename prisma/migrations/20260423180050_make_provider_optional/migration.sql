/*
  Warnings:

  - A unique constraint covering the columns `[accountId,providerId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Account_provider_providerAccountId_key";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "provider" DROP NOT NULL,
ALTER COLUMN "providerAccountId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_accountId_providerId_key" ON "Account"("accountId", "providerId");
