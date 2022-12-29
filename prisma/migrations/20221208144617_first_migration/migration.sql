-- CreateTable
CREATE TABLE "Assignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "openDate" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "AssignmentsOnStudents" (
    "unitId" INTEGER NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "response" TEXT NOT NULL,

    PRIMARY KEY ("unitId", "assignmentId"),
    CONSTRAINT "AssignmentsOnStudents_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AssignmentsOnStudents_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
