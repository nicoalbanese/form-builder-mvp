/*
  Warnings:

  - You are about to drop the column `answer` on the `FormResponseAnswers` table. All the data in the column will be lost.
  - Added the required column `blockId` to the `FormResponseAnswers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `response` to the `FormResponseAnswers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `FormResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `FormResponse` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FormResponseAnswers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "response" TEXT NOT NULL,
    "formResponseId" INTEGER,
    "blockId" TEXT NOT NULL,
    CONSTRAINT "FormResponseAnswers_formResponseId_fkey" FOREIGN KEY ("formResponseId") REFERENCES "FormResponse" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FormResponseAnswers_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FormResponseAnswers" ("createdAt", "formResponseId", "id", "updatedAt") SELECT "createdAt", "formResponseId", "id", "updatedAt" FROM "FormResponseAnswers";
DROP TABLE "FormResponseAnswers";
ALTER TABLE "new_FormResponseAnswers" RENAME TO "FormResponseAnswers";
CREATE TABLE "new_FormResponse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "formId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "FormResponse_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FormResponse" ("createdAt", "formId", "id", "updatedAt") SELECT "createdAt", "formId", "id", "updatedAt" FROM "FormResponse";
DROP TABLE "FormResponse";
ALTER TABLE "new_FormResponse" RENAME TO "FormResponse";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
