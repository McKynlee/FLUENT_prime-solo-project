--- CLEAR DATABASE IF NECESSARY:

DROP TABLE IF EXISTS "pronouns" CASCADE;
DROP TABLE IF EXISTS "languages" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "instructor_feedback" CASCADE;
DROP TABLE IF EXISTS "words" CASCADE;
DROP TABLE IF EXISTS "learners" CASCADE;
DROP TABLE IF EXISTS "instructors_languages" CASCADE;
DROP TABLE IF EXISTS "instructors" CASCADE; 
DROP TABLE IF EXISTS "learner_submissions" CASCADE;
DROP TABLE IF EXISTS "lorem_picsum" CASCADE;


-- CREATE TABLES:

CREATE TABLE "pronouns"
(
    "id" SERIAL PRIMARY KEY,
    "pronoun" VARCHAR (255) NOT NULL
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

CREATE TABLE "instructors"(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users" ON DELETE CASCADE,
    "bio" VARCHAR(12555),
    "avatar" VARCHAR (12555) DEFAULT 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg',
    "learner_capacity" INT NOT NULL
);

CREATE TABLE "learners" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users" ON DELETE CASCADE,
    "instructor_id" INT REFERENCES "instructors",
    "skill_level" INT,
    "moneda_count" INT,
    "daily_reminder" BOOLEAN DEFAULT false
);

CREATE TABLE "learner_submissions"(
    "id" SERIAL PRIMARY KEY,
    "learner_id" INT REFERENCES "learners" ON DELETE CASCADE,
    "word" VARCHAR(80) NOT NULL,
    "picture_url" VARCHAR (12555) NOT NULL,
    "picture_description" VARCHAR (12555) NOT NULL,
    "word_sentence" VARCHAR (12555) NOT NULL,
    "q_for_instructor" VARCHAR (12555),
    "time_stamp" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE "instructor_feedback"
(
    "id" SERIAL PRIMARY KEY,
    "submission_id" INT REFERENCES "learner_submissions" ON DELETE CASCADE,
    "instructor_id" INT REFERENCES "instructors" ON DELETE CASCADE,
    "picture_description" VARCHAR (12555),
    "word_sentence" VARCHAR (12555),
    "q_for_instructor" VARCHAR (12555),
    "time_stamp" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE "instructors_languages"(
  "id" SERIAL PRIMARY KEY,
  "instructor_id" INT REFERENCES "instructors",
  "language_id" INT REFERENCES "languages"
);

  CREATE TABLE "lorem_picsum" (
     "id" SERIAL PRIMARY KEY,
    "photo_id" INT NOT NULL
    );


-- INSERT DATA INTO TABLES:

INSERT INTO "pronouns" ("pronoun")
VALUES ('he/him/his'), ('she/her/hers'), ('they/them/theirs'), 
('xe/xem/xyr'), ('zie/hir/hir'), ('ey/em/eir'), ('other');

INSERT INTO "languages" ("name")
VALUES ('Spanish'), ('Italian'), ('French'), ('German'), ('Swedish'), ('Czech'), ('Portuguese');

--Every user's preset password is "one":
INSERT INTO "users" ("language_id", "pronouns_id", "first_name", "last_name", "username", "password", "type")
VALUES (1, 1, 'Melissa', 'Peabody', 'melissa', '$2a$10$MIf.XKC.mxZnUEeW.is.2OB9gsKCVFIJdHQ69sKMFFw5GqXU1lEAC', 'instructor'),
(1, 3, 'Luis', 'Elorreaga', 'luigi', '$2a$10$peaVtNkB4hwskSPbKbUK4..g9P1jMnWoUt/N0qGDvm.OVmgowXmcO', 'instructor'),
(1, 2, 'Julia', 'Bargman', 'julia', '$2a$10$bUD4i7Js7g7jar1VGvaHbeiNFaBqH9bTK0ZxieUmitheoTIgNcNyO', 'instructor'),
(1, 3, 'Kelsey', 'Harrity', 'kelsey', '$2a$10$e5r8lFYaNc6yQxSuOOlQt.5rjCfJxOcI0UTAWl6vvYpuqCoXgpN9O', 'instructor'),
(2, 1, 'Dean', 'Jezwinski', 'dean', '$2a$10$iGSiAHVcF.7k0IQe/S09suYTQxo4MqZZq.cQs6PBkt67LmGFoBuJ6', 'instructor'),
(1, 2, 'Jane', 'Mangione', 'jane', '$2a$10$1ZaiBg/6I/QNVgYQAkko2OcdlUxn9gSigHJhvd.27L2DgIFlcRBaW', 'instructor'),
(1, 2, 'Callie', 'Anderson', 'callie', '$2a$10$H6pF3zpj2LoJPTAqIqdP3uepq0gNpeCgppoMZaxf9CNUw9T.9JgA2', 'instructor'),
(1, 4, 'Jess', 'Jordan', 'jess', '$2a$10$RO37SugzbNeOl/mjsid9Ke0ZL2mul.5VM.DfjA/ABVI499856OzGa', 'learner'),
(1, 2, 'Stella', 'Dennig', 'stella', '$2a$10$MN3A9LeVU6t6b8zDd1f6ZOK396bwqLB846ECbro2JLmocGc4/NgEe', 'learner'),
(1, 2, 'Lori', 'Mitchel', 'lori@gmail.com', 'lori', 'instructor'),
(1, 1, 'Simone', 'Domenichini', 'simone', '$2a$10$VXmRA7SUDJyA/zul0pq33eZIQfZKNy0gAdL3W.DdhyocN.0iXZd1a', 'learner'),
(1, 1, 'Levi', 'Hill', 'levi', '$2a$10$5Y8idQFCyYv9Rpk0PHttjeu2qEe3sonOQ2jf8njcSkqvJk4hpm2J.', 'learner'),
(1, 1, 'Fabio', 'Marzi', 'fabio', '$2a$10$zAnxE7qpiXwA8jOqHgjbZOy3GlR08zxuqPOG0BGVhhJi.KDjg9ssa', 'learner'),
(1, 2, 'Steph', 'Madner', 'steph', '$2a$10$YIoVQ6.igEFTC0qKLR12CO9m9od6/e0jvAdSwicscIxqEb6vG9lU6', 'learner'),
(1, 2, 'Ran', 'Tao', 'ran', '$2a$10$fa8wc46ODcnCLH5lkjeBEusoFqJPwW7GlFKSjftn/b68UhAPTYRqW', 'learner'),
(1, 2, 'Grace', 'Fisher', 'grace', '$2a$10$q0TVXxWDSnNr119YpSZ7Qu64UjKyM6oEW3Anfd8IrlOjDZQUMxyGm', 'learner'),
(1, 3, 'Mo', 'Lecaro', 'mo', '$2a$10$ui/.d0n0ZjlYVsQiR6dHTOOWJq4O4bIqW2.8OA.y5nIhXuEX4dLEi', 'learner');

INSERT INTO "instructors" ("user_id", "bio", "learner_capacity", "avatar")
VALUES (1, 'I am hardcore into triathlons, and love to travel.', 5, 'https://www.compressport.com/inter/img/cms/COMMUNITY/NEWS%20%7C%20TEAM%20%7C%20KAISA%20SALI/community-top-kaisa.jpg'),
(2, 'My friends call me Luigi! Want to be my Mario?', 7, 'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Luigi_NSMBUDX.png/220px-Luigi_NSMBUDX.png'),
(3, 'I am a middle school counselor who loves helping people reach their goals!', 8, 'https://d368g9lw5ileu7.cloudfront.net/races/race100623-logo.bFG9gr.png'),
(4, 'I have lived in Spain for many years, and love to pass along real-world lingo.', 3, 'https://lacocinademasito.com/wp-content/uploads/huevos-rotos-con-jamon-y-patatas.jpg'),
(5, 'I have lived in Italy for a few years, and am studying to become an enologist here!', 2, 'https://www.thespruceeats.com/thmb/Fv9_8yovhCtj_HYhZXIL6jba43E=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/red-wine-is-poured-into-a-glass-from-a-bottle--light-background--1153158143-98320451802c485cb6d7b5437c7fd60a.jpg'),
(6, 'I am fluent in Italian, French and Spanish, and LOVE to talk about languages.  Ask me about the time I spent in Costa Rica :)', 1, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/33/ea/a5/caption.jpg?w=1000&h=600&s=1'),
(7, 'After spending 3 winters in Central and South America, my Spanish skills have gotten pretty smooth.  I love to help others get to this point!', 10, 'http://upload.evocdn.co.uk/fruitnet/uploads/asset_image/2_1212685_s.jpg')
;

INSERT INTO "words" ("language_id", "word")
VALUES (1, 'hola'), (1, 'el juego'), (1, 'para'), (1, 'ellos'), (1, 'caliente'), (1, 'la palabra'), 
(1, 'pero'), (1, 'el perro'), (1, 'algunos'), (1, 'usted'), (1, 'que'), (1, 'el tiempo'), (1, 'cómo'), 
(1, 'cada'), (1, 'uno'), (1, 'cero'), (1, 'dos'), (1, 'tres'), (1, 'cuatro'), (1, 'cinco'), (1, 'seis'), 
(1, 'siete'), (1, 'ocho'), (1, 'nueve'), (1, 'diez'), (1, 'la mañana'), (1, 'el aire'), (1, 'así'), 
(1, 'también'), (1, 'pequeño'), (1, 'el fin'), (1, 'la casa'), (1, 'la mano'), (1, 'el puerto'), (1, 'grande'), 
(1, 'la tierra'), (1, 'aquí'), (1, 'alto'), (1, 'alta'), (1, 'por qué'), (1, 'la pregunta'), (1, 'el hombre'), 
(1, 'los hombres'), (1, 'la mujer'), (1, 'las mujeres'), (1, 'el cambio'), (1, 'la luz'), (1, 'la imagen'), 
(1, 'nosotros'), (1, 'nosotras'), (1, 'de nuevo'),  (1, 'el animal'), (1, 'el punto'), (1, 'la madre'), 
(1, 'el mundo'), (1, 'el universo'), (1, 'cerca'), (1, 'el padre'), (1, 'el hijo'), (1, 'la hija'), 
(1, 'el trabajo'), (1, 'nuevo'), (1, 'nueva'), (1, 'cualquier'), (1, 'la parte'), (1, 'el lugar'), 
(1, 'donde'), (1, 'después'), (1, 'la espalda'), (1, 'poco'), (1, 'sólo'), (1, 'el año'), (1, 'el vino'), 
(1, 'la cerveza'), (1, 'bueno');


INSERT INTO "learners" ("user_id", "instructor_id", "skill_level", "moneda_count", "daily_reminder")
VALUES (8, 2, 5, 15, false), (9, 2, 4, 10, false), (10, 2, 3, 5, false), (11, 2, 2, 20, false), 
(12, 3, 1, 25, false), (13, 4, 5, 30, false), (14, 4, 3, 15, false), (15, 5, 5, 35, false), (16, 6, 5, 15, false), 
(17, 7, 5, 15, false);

INSERT INTO "learner_submissions" ("learner_id", "word", "picture_url", "picture_description", "word_sentence", "q_for_instructor")
VALUES (1, 'hola', 'https://picsum.photos/id/237/200/300', 'un perrocito negro', 'hola, que tal?', 'Not sure about tu vs. usted'), 
(1, 'el juego', 'https://picsum.photos/id/23/200/300', 'no se que hay', 'El juego es muy divertido?', 'What entry-level Spanish books do you recommend?'),
(2, 'para', 'https://picsum.photos/id/27/200/300', 'un gatito negro', 'Esto es para mi?', 'What Spanish music do you listen to?'),
(3, 'hola', 'https://picsum.photos/id/237/200/300', 'un perrito negro', 'Digo hola cada vez que veyo mis amigos.', 'Do you salsa dance?'),
(6, 'la cerveza', 'https://picsum.photos/id/37/200/300', 'Yo fui a la playa.', 'No me gusta la cerveza.', 'How long did it take you to learn Spanish?'),
(8, 'el mundo', 'https://picsum.photos/id/2/200/300', 'Me gusta beber el agua.', 'Quiero viajar por todo el mundo!', 'Best Spanish songs?');

INSERT INTO "instructor_feedback" ("submission_id", "instructor_id", "picture_description", "word_sentence", "q_for_instructor")
VALUES (1, 2, 'Esta foto es de un perrocito negro', 'Hola, qué tal?', 'Check out this explanation of tu (informal "you") vs. usted (formal "you"): https://www.grittyspanish.com/2018/10/28/tu-vs-usted/'),
(2, 2, 'No sé qué hay', 'El juego es muy divertido!', 'I always recommend the Little Prince in any language!'),
(3, 2, 'Yo veo un gatito negro.', 'Esto es para mí?', 'Juanes and Maykel Blanco!'),
(4, 2, 'Hay un perrito negro.', 'Digo "hola" cada vez que veo mis amigos.', 'I actually LOVE to salsa dance- check out La Rueda de Casino from Cuba...<3'),
(5, 3, 'Yo fui a la playa. -!Perfecto!', 'No me gusta la cerveza.', 'I studied for several years, then traveled and learned immersively for 7 weeks and that brought me to fluency!'),
(6, 4, '!Perfecto!', '!Muy bien - lo harás!', '"Solo por un beso" by Aventura gets me every time.');

INSERT INTO "instructors_languages" ("instructor_id", "language_id")
VALUES (1, 1), (2, 1), (3, 1), (4, 1), (5, 2), (6, 1), (7, 1);


-----https://picsum.photos/ subset of existing photo id's to call:    
 INSERT INTO "lorem_picsum" ("photo_id")
 VALUES (0), (1), (10), (100), (1000), (1001), (1002), (1003), (1004), (1005), (1006), (1008), 
 (1009), (101), (1010), (1011), (1012), (1013), (1014), (1015), (1016), (1018), (1019), (102), 
 (1020), (1021), (1022), (1023), (1024), (1025), (1026), (1027), (1028), (1029), (103), (1031), 
 (1032), (1033), (1035), (1036), (1037), (1038), (1039), (104), (1040), (1041), (1042), (1043), 
 (1044), (1045), (1047), (1048), (1049), (1050), (1051), (1052), (1053), (1054), (1055), (1056), 
 (1057), (1058), (1059), (106), (1060), (1061), (1062), (1063), (1064), (1065), (1066), (1067), 
 (1068), (1069), (107), (1070), (1071), (1072), (1073), (1074), (1075), (1076), (1077), (1078), 
 (1079), (108), (1080), (1081), (1082), (1083), (1084), (109), (11), (110), (111), (112), (113), 
 (114), (115), (116), (117), (118), (119), (12), (120), (121), (122), (123), (124), (125), (126), 
 (127), (128), (129), (13), (130), (131), (132), (133), (134), (136), (139), (14), (140), (141), 
 (142), (143), (144), (145), (146), (147), (149), (15), (151), (152), (153), (154), (155), (156), 
 (157), (158), (159), (16), (160), (161), (162), (163), (164), (165), (166), (167), (168), (169), 
  (17), (170), (171), (172), (173), (174), (175), (176), (177), (178), (179), (18), (180), (181), 
  (182), (183), (184), (185), (186), (187), (188), (189), (19), (190), (191), (192), (193), (194), 
  (195), (196), (197), (198), (199), (2), (20), (200), (201), (202), (203), (204), (206), (208), (209), 
  (21), (211), (212), (213), (214), (215), (216), (217), (218), (219), (22);
