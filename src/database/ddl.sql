-- NOTE: Instead of ddl, using migrations is recommended for production applications
-- because it allows you to keep track of changes to the database schema over time.

CREATE DATABASE alexandria_db;
\c alexandria_db;

CREATE TABLE "Users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Books Table
CREATE TABLE "Books" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BorrowedBooks Table
CREATE TABLE "BorrowedBooks" (
    "id" SERIAL PRIMARY KEY,
    "userId" INT NOT NULL,
    "bookId" INT NOT NULL,
    "borrowedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "returnedAt" TIMESTAMP NULL,
    "score" FLOAT CHECK ("score" >= 0 AND "score" <= 10),
    CONSTRAINT "fk_BorrowedBooks_User" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_BorrowedBooks_Book" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE CASCADE
);

-- PK index automatically created by Postgres, 
-- but we can create indexes for other columns for future possible queries
CREATE INDEX "idx_Users_name" ON "Users"("name");
CREATE INDEX "idx_Books_name" ON "Books"("name");
CREATE INDEX "idx_BorrowedBooks_user" ON "BorrowedBooks"("userId");
CREATE INDEX "idx_BorrowedBooks_book" ON "BorrowedBooks"("bookId");
