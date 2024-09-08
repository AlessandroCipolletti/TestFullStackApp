-- CreateTable UserPassword
CREATE TABLE "UserPassword" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "UserPassword_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPassword" ADD CONSTRAINT "UserPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- migrate existing passwords
INSERT INTO "UserPassword" ("password", "userId")
SELECT "password", "id" as "userId" FROM "User";

-- AlterTable User
ALTER TABLE "User" DROP COLUMN "password";