-- CreateEnum
CREATE TYPE "ItemSource" AS ENUM ('SHOP', 'WAREHOUSE');

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "source" "ItemSource" NOT NULL DEFAULT 'SHOP',
ADD COLUMN     "warehouseItemId" TEXT,
ALTER COLUMN "itemId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_warehouseItemId_fkey" FOREIGN KEY ("warehouseItemId") REFERENCES "WarehouseItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
