/*
  Warnings:

  - You are about to drop the `AssignmentsOnStudents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `description` on the `Assignment` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AssignmentsOnStudents";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UnitsOnAssignments" (
    "assignmentId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,
    "response" TEXT NOT NULL,

    PRIMARY KEY ("unitId", "assignmentId"),
    CONSTRAINT "UnitsOnAssignments_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UnitsOnAssignments_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL DEFAULT '',
    "openDate" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL
);
INSERT INTO "new_Assignment" ("dueDate", "id", "openDate", "title") SELECT "dueDate", "id", "openDate", "title" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
