-- CreateEnum
CREATE TYPE "USER_STATUS" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkId" VARCHAR(100),
    "username" VARCHAR(64) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "firstName" VARCHAR(100),
    "lastName" VARCHAR(50),
    "bankAccount" VARCHAR(50),
    "status" "USER_STATUS" NOT NULL DEFAULT 'INACTIVE',
    "homeAddress" VARCHAR(255),
    "workAddress" VARCHAR(255),
    "homeLatitude" DOUBLE PRECISION,
    "homeLongitude" DOUBLE PRECISION,
    "workLatitude" DOUBLE PRECISION,
    "workLongitude" DOUBLE PRECISION,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "idx_user_username" ON "User"("username");
