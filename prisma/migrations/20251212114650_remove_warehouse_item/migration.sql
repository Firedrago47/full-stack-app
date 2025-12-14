/*
  Warnings:

  - You are about to drop the column `warehouseItemId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the `WarehouseItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_warehouseItemId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "warehouseItemId";

-- DropTable
DROP TABLE "WarehouseItem";
