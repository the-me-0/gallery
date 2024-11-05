-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL,
    "thumbnailId" INTEGER NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceThumbnail" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ResourceThumbnail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_thumbnailId_key" ON "Resource"("thumbnailId");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "ResourceThumbnail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
