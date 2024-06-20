/*
  Warnings:

  - Made the column `sourceLink` on table `BlogPost` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlogPost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "sourceLink" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_BlogPost" ("body", "createdAt", "id", "imgUrl", "sourceLink", "title") SELECT "body", "createdAt", "id", "imgUrl", "sourceLink", "title" FROM "BlogPost";
DROP TABLE "BlogPost";
ALTER TABLE "new_BlogPost" RENAME TO "BlogPost";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
