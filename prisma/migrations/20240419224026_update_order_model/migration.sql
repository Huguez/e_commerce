-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "isPaid" DROP NOT NULL,
ALTER COLUMN "isPaid" SET DEFAULT false,
ALTER COLUMN "delivered" DROP NOT NULL,
ALTER COLUMN "paidAt" DROP NOT NULL;