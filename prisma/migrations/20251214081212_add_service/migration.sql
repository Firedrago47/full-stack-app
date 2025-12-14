-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('FOOD', 'GROCERY', 'TAXI');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "service" "ServiceCategory";
