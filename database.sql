
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );

DROP TABLE IF EXISTS "pronouns" CASCADE;
DROP TABLE IF EXISTS "languages" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "challenge_responses" CASCADE;
DROP TABLE IF EXISTS "instructor_feedback" CASCADE;
DROP TABLE IF EXISTS "words" CASCADE;
DROP TABLE IF EXISTS "learners" CASCADE;
DROP TABLE IF EXISTS "instructors_languages" CASCADE;
DROP TABLE IF EXISTS "instructors" CASCADE;


CREATE TABLE "pronouns"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255) NOT NULL
);

CREATE TABLE "languages"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255) NOT NULL
);

CREATE TABLE "words"
(
    "id" SERIAL PRIMARY KEY,
    "language_id" INT REFERENCES "languages",  
    "word" VARCHAR (80)
);

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "language_id" INT REFERENCES "languages",
    "pronouns_id" INT REFERENCES "pronouns",
    "first_name" VARCHAR (255) NOT NULL,
    "last_name" VARCHAR (255) NOT NULL,
    "username" VARCHAR (255) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "type" VARCHAR (80) NOT NULL
);

CREATE TABLE "learners" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users",
    "instructor_id" INT REFERENCES "instructors",
    "skill_level" INT,
    "moneda_count" INT,
    "daily_reminder" BOOLEAN DEFAULT false
);

CREATE TABLE "learner_submissions"(
    "id" SERIAL PRIMARY KEY,
    "learner_id" INT REFERENCES "learners",
    "word_id" INT REFERENCES "words",
    "picture_url" VARCHAR (12555) NOT NULL,
    "picture_description" VARCHAR (12555) NOT NULL,
    "word_sentence" VARCHAR (12555) NOT NULL,
    "q_for_instructor" VARCHAR (12555),
    "time_stamp" TIMESTAMP
);

CREATE TABLE "instructors"(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users",
    "bio" VARCHAR(12555),
    "avatar" VARCHAR (12555) DEFAULT 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg',
    "learner_capacity" INT NOT NULL
);

CREATE TABLE "instructor_feedback"
(
    "id" SERIAL PRIMARY KEY,
    "submission_id" INT REFERENCES "learner_submissions",
    "instructor_id" INT REFERENCES "instructors",
    "picture_description" VARCHAR (12555),
    "word_sentence" VARCHAR (12555),
    "q_for_instructor" VARCHAR (12555),
    "time_stamp" TIMESTAMP   
);

CREATE TABLE "instructors_languages"(
  "id" SERIAL PRIMARY KEY,
  "instructor_id" INT REFERENCES "instructors",
  "language_id" INT REFERENCES "languages"
);

INSERT INTO "pronouns" ("name")
VALUES ('he/him/his'), ('she/her/hers'), ('they/them/theirs'), 
('xe/xem/xyr'), ('zie/hir/hir'), ('ey/em/eir'), ('other');

INSERT INTO "languages" ("name")
VALUES ('Spanish'), ('Italian'), ('French'), ('German'), ('Swedish'), ('Czech'), ('Portuguese');