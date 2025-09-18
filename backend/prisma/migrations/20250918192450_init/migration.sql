/*
  Warnings:

  - You are about to drop the column `faceDataUrl` on the `Student` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."MarkedBy" AS ENUM ('AUTOMATED', 'MANUAL_TEACHER');

-- AlterTable
ALTER TABLE "public"."Attendance" ADD COLUMN     "markedBy" "public"."MarkedBy" NOT NULL DEFAULT 'AUTOMATED';

-- AlterTable
ALTER TABLE "public"."Student" DROP COLUMN "faceDataUrl",
ADD COLUMN     "faceEncoding" TEXT,
ADD COLUMN     "profileImageUrl" TEXT;
