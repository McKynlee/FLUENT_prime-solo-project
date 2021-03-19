
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
    "word" VARCHAR(80),
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


-----https://picsum.photos/ existing photo id's to call:
  CREATE TABLE "lorem_picsum" (
     "id" SERIAL PRIMARY KEY,
    "photo_id" INT NOT NULL
    );
    
 INSERT INTO "lorem_picsum" ("photo_id")
 VALUES (0), (1), (10), (100), (1000), (1001), (1002), (1003), (1004), (1005), (1006), (1008), (1009), (101), (1010), (1011), (1012), (1013), (1014), (1015), (1016), (1018), (1019), (102), (1020), (1021), (1022), (1023), (1024), (1025), (1026), (1027), (1028), (1029), (103), (1031), (1032), (1033), (1035), (1036), (1037), (1038), (1039), (104), (1040), (1041), (1042), (1043), (1044), (1045), (1047), (1048), (1049), (1050), (1051), (1052), (1053), (1054), (1055), (1056), (1057), (1058), (1059), (106), (1060), (1061), (1062), (1063), (1064), (1065), (1066), (1067), (1068), (1069), (107), (1070), (1071), (1072), (1073), (1074), (1075), (1076), (1077), (1078), (1079), (108), (1080), (1081), (1082), (1083), (1084), (109), (11), (110), (111), (112), (113), (114), (115), (116), (117), (118), (119), (12), (120), (121), (122), (123), (124), (125), (126), (127), (128), (129), (13), (130), (131), (132), (133), (134), (136), (139), (14), (140), (141), (142), (143), (144), (145), (146), (147), (149), (15), (151), (152), (153), (154), (155), (156), (157), (158), (159), (16), (160), (161), (162), (163), (164), (165), (166), (167), (168), (169), (17), (170), (171), (172), (173), (174), (175), (176), (177), (178), (179), (18), (180), (181), (182), (183), (184), (185), (186), (187), (188), (189), (19), (190), (191), (192), (193), (194), (195), (196), (197), (198), (199), (2), (20), (200), (201), (202), (203), (204), (206), (208), (209), (21), (211), (212), (213), (214), (215), (216), (217), (218), (219), (22);