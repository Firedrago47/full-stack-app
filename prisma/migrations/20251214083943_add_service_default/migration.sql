UPDATE "Item" SET "service" = 'FOOD' WHERE "service" IS NULL;

ALTER TABLE "Item" 
    ALTER COLUMN "service" SET DEFAULT 'FOOD',
    ALTER COLUMN "service" SET NOT NULL;

