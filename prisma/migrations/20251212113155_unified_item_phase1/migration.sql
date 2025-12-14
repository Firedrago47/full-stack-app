/*
  Warnings:

  - You are about to drop the column `sku` on the `Item` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Item_shopId_idx";

-- DropIndex
DROP INDEX "Item_shopId_sku_key";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "sku",
ADD COLUMN     "source" "ItemSource" NOT NULL DEFAULT 'SHOP',
ALTER COLUMN "shopId" DROP NOT NULL;
