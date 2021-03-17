-- Build out table with Dummy Data:
INSERT INTO "pronouns" ("name")
VALUES ('he/him/his'), ('she/her/hers'), ('they/them/theirs'), 
('xe/xem/xyr'), ('zie/hir/hir'), ('ey/em/eir'), ('other');

INSERT INTO "languages" ("name")
VALUES ('Spanish'), ('Italian'), ('French'), ('German'), ('Swedish'), ('Czech'), ('Portuguese');


INSERT INTO "users" ("language_id", "pronouns_id", "first_name", "last_name", "username", "password", "type")
VALUES (1, 1, 'Sam', 'Sizzle', 'sam@gmail.com', 'hijack123', 'instructor'),
(2, 2, 'Tim', 'Tulip', 'tim@gmail.com', 'tim123', 'instructor'),
(3, 3, 'Lacey', 'Lily', 'lacey@gmail.com', 'lacey123', 'instructor'),
(4, 4, 'Doug', 'Daisy', 'doug@gmail.com', 'doug123', 'instructor'),
(5, 5, 'Wendy', 'Wombat', 'wendy@gmail.com', 'wendy123', 'instructor'),
(6, 6, 'Xavier', 'Xylophone', 'xavier@gmail.com', 'xavier123', 'instructor'),
(7, 7, 'Molly', 'Meyer', 'molly@gmail.com', 'molly123', 'instructor'),
(1, 4, 'Stasa', 'Kipple', 'stasa@gmail.com', 'hijack123', 'instructor'),
(2, 7, 'Terry', 'Tulip', 'terry@gmail.com', 'tim123', 'instructor'),
(1, 5, 'Lori', 'Mitchel', 'lori@gmail.com', 'lacey123', 'instructor'),
(1, 1, 'Sam', 'Sizzle', 'sizzle@gmail.com', 'hijack123', 'instructor'),
(2, 2, 'Tim', 'Tulip', 'tulip@gmail.com', 'tim123', 'instructor'),
(3, 3, 'Lacey', 'Lily', 'lily@gmail.com', 'lacey123', 'instructor');

INSERT INTO "instructors" ("user_id", "bio", "learner_capacity", "avatar")
VALUES (1, 'I come from a land down under', 5, 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'),
(2, 'They call me Tiny', 7, 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'),
(3, 'Like a lion', 8, 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'),
(4, 'Doing it dang well', 3, 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'),
(5, 'When I went to Winnepeg, I learned a wok-load!', 2, 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'),
(6, 'Exactly what I want to be doing!', 1, 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'),
(7, 'Making me many minted miners!', 10, 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png')
;

INSERT INTO "words" ("language_id", "word")
VALUES (1, 'hola'), (1, 'el juego'), (1, 'para'), (1, 'ellos'), (1, 'caliente'), (1, 'la palabra'), (1, 'pero'), (1, 'el perro'), (1, 'algunos'), (1, 'usted'), (1, 'que'), (1, 'el tiempo'), (1, 'cómo'), (1, 'cada'), (1, 'uno'), (1, 'cero'), (1, 'dos'), (1, 'tres'), (1, 'cuatro'), (1, 'cinco'), (1, 'seis'), (1, 'siete'), (1, 'ocho'), (1, 'nueve'), (1, 'diez'), (1, 'la mañana'), (1, 'el aire'), (1, 'así'), (1, 'también'), (1, 'pequeño'), (1, 'el fin'), (1, 'la casa'), (1, 'la mano'), (1, 'el puerto'), (1, 'grande'), (1, 'la tierra'), (1, 'aquí'), (1, 'alto'), (1, 'alta'), (1, 'por qué'), (1, 'la pregunta'), (1, 'el hombre'), (1, 'los hombres'), (1, 'la mujer'), (1, 'las mujeres'), (1, 'el cambio'), (1, 'la luz'), (1, 'la imagen'), (1, 'nosotros'), (1, 'nosotras'), (1, 'de nuevo'),  (1, 'el animal'), (1, 'el punto'), (1, 'la madre'), (1, 'el mundo'), (1, 'el universo'), (1, 'cerca'), (1, 'el padre'), (1, 'el hijo'), (1, 'la hija'), (1, 'el trabajo'), (1, 'nuevo'), (1, 'nueva'), (1, 'cualquier'), (1, 'la parte'), (1, 'el lugar'), (1, 'donde'), (1, 'después'), (1, 'la espalda'), (1, 'poco'), (1, 'sólo'), (1, 'el año'), (1, 'el vino'), (1, 'la cerveza'), (1, 'bueno');


INSERT INTO "learners" ("user_id", "instructor_id", "skill_level", "moneda_count", "daily_reminder")
VALUES (1, 11, 5, 15, false), (2, 10, 4, 10, false), (3, 9, 3, 5, false), (4, 8, 2, 20, false), (5, 7, 1, 25, false), (6, 6, 5, 30, false), (7, 5, 3, 15, false), (8, 4, 5, 35, false), (9, 3, 5, 15, false), (10, 2, 5, 15, false), (11, 1, 5, 15, false), (12, 1, 3, 25, false), (13, 1, 5, 15, false), (14, 2, 5, 15, false);

INSERT INTO "learner_submissions" ("learner_id", "word_id", "picture_url", "picture_description", "word_sentence", "q_for_instructor")
VALUES (15, 1, 'https://picsum.photos/id/237/200/300', 'un perrocito negro', 'hola, que tal?', 'Not sure about tu vs. usted'), 
(15, 2, 'https://picsum.photos/id/23/200/300', 'no se que hay', 'El juego es muy divertido?', 'What entry-level Spanish books do you recommend?'),
(15, 3, 'https://picsum.photos/id/27/200/300', 'un gatito negro', 'Esto es para mi?', 'What Spanish music do you listen to?'),
(16, 1, 'https://picsum.photos/id/237/200/300', 'un perrito negro', 'Digo hola cada vez que veyo mis amigos.', 'Do you salsa dance?'),
(16, 74, 'https://picsum.photos/id/37/200/300', 'Yo fui a la playa.', 'No me gusta la cerveza.', 'How long did it take you to learn Spanish?'),
(17, 55, 'https://picsum.photos/id/2/200/300', 'Me gusta beber el agua.', 'Quiero viajar por todo el mundo!', 'Best Spanish songs?');

INSERT INTO "instructor_feedback" ("submission_id", "instructor_id", "picture_description", "word_sentence", "q_for_instructor", "time_stamp")
VALUES (7, 11, 'Esta foto es de un perrocito negro', 'Hola, qué tal?', 'Check out this explanation of tu (informal "you") vs. usted (formal "you"): https://www.grittyspanish.com/2018/10/28/tu-vs-usted/', '2021-03-11 19:10:25-07'),
(8, 11, 'No sé qué hay', 'El juego es muy divertido!', 'I always recommend the Little Prince in any language!', '2021-03-15 19:10:25-07'),
(9, 11, 'Yo veo un gatito negro.', 'Esto es para mí?', 'Juanes and Maykel Blanco!', '2021-03-15 20:10:25-07'),
(10, 10, 'Hay un perrito negro.', 'Digo "hola" cada vez que veo mis amigos.', 'I actually LOVE to salsa dance- check out La Rueda de Casino from Cuba...<3', '2021-03-15 21:10:25-07'),
(11, 10, 'Yo fui a la playa. -!Perfecto!', 'No me gusta la cerveza.', 'I studied for several years, then traveled and learned immersively for 7 weeks and that brought me to fluency!', '2021-03-15 22:10:25-07'),
(12, 9, '!Perfecto!', '!Muy bien - lo harás!', '"Solo por un beso" by Aventura gets me every time.', '2021-03-15 23:10:25-07');

INSERT INTO "instructors_languages" ("instructor_id", "language_id")
VALUES (2, 1), (2, 2), (2, 3), (3, 1), (4, 1), (4, 7), (5, 6), (5, 5);


---------------------------Queries to call data----------------------
-- Create new user (learner / instructor registration):
INSERT INTO "users" ("language_id", "pronouns_id", "first_name", "last_name", "username", "password", "type")
VALUES ($1, $2, $3, $4, $5, $6, $7);

-- Returning user to check login info: (username and password)

-- Retrieve user information:
SELECT * FROM "users"