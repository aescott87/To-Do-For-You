CREATE TABLE "tasks"(
    "id" serial PRIMARY KEY,
    "task" varchar(100) NOT NULL,
    "due_date" date,
    "task_complete" varchar(10) DEFAULT 'Incomplete'
);

INSERT INTO "tasks"("task", "due_date", "task_complete")
VALUES ('Sweep kitchen floor', '3/29/2020', 'Incomplete'),
('Finish Prime homework', '3/29/2020', 'Incomplete'),
('Pay phone bill', '4/10/2020', 'Incomplete');