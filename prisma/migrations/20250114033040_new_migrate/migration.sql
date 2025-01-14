-- CreateTable
CREATE TABLE "Pets" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Owner" TEXT NOT NULL,

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);
