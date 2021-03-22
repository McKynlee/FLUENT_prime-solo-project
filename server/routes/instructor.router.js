const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all available instructors in specific language from db:
router.get('/all/:id', (req, res) => {
  const instructorLanguageId = req.params.id;
  // console.log('instructorLanguageId:', instructorLanguageId);

  const sqlQuery = `  SELECT "instructors".user_id, 
  "instructors".id as "instructorID", "instructors".avatar, 
  "instructors".bio, "instructors".learner_capacity, 
  "languages".name as "languages_taught",
  count("learners") as "learner_count", 
  "users".first_name, "users".last_name, "pronouns".pronoun FROM "instructors"
  FULL OUTER JOIN "users" ON "instructors".user_id = "users".id
  FULL OUTER JOIN "learners" ON "instructors".id = "learners".instructor_id
  JOIN "pronouns" ON "users".pronouns_id = "pronouns".id
  JOIN "languages" ON "users".language_id = "languages".id
  WHERE "languages".id = $1
  GROUP BY "instructors".id, "users".first_name, "users".last_name, "pronouns".pronoun, "languages".name`;

  pool.query(sqlQuery, [instructorLanguageId])
    .then(dbRes => {
      res.send(dbRes.rows)
    })
    .catch(err => {
      console.log('error GETting available instructors:', err);
      res.sendStatus(500);
    })
});

// Select specific instructor for detailed view on learner registration
router.get('/detail/:id', (req, res) => {
  const instructorId = Number(req.params.id);
  // console.log('instructorId:', instructorId);

  const sqlQuery = `SELECT "instructors".user_id, 
  "instructors".id as "instructorID", "instructors".avatar, 
  "instructors".bio, "instructors".learner_capacity, 
  "languages".name as "languages_taught",
  count("learners") as "learner_count", 
  "users".first_name, "users".last_name, "pronouns".pronoun FROM "instructors"
  FULL OUTER JOIN "users" ON "instructors".user_id = "users".id
  FULL OUTER JOIN "learners" ON "instructors".id = "learners".instructor_id
  JOIN "pronouns" ON "users".pronouns_id = "pronouns".id
  JOIN "languages" ON "users".language_id = "languages".id
  WHERE "instructors".id = $1
  GROUP BY "instructors".id, "users".first_name, "users".last_name, 
  "pronouns".pronoun, "languages".name`;

  pool.query(sqlQuery, [instructorId])
    .then(dbRes => {
      res.send(dbRes.rows)
    })
    .catch(err => {
      console.log('error GETting instructor detail view:', err);
      res.sendStatus(500);
    })
}); // end detail view instructor GET

// Select specific instructor for detailed view
router.get('/profile/:id', (req, res) => {
  const userId = Number(req.params.id);
  // console.log('instructorUserId:', userId);

  const sqlQuery = `SELECT "instructors".user_id, 
  "instructors".id as "instructorId", "instructors".avatar, 
  "instructors".bio, "instructors".learner_capacity, 
  "languages".name as "languages_taught",
  count("learners") as "learner_count", 
  "users".first_name, "users".last_name, "pronouns".pronoun FROM "instructors"
  FULL OUTER JOIN "users" ON "instructors".user_id = "users".id
  FULL OUTER JOIN "learners" ON "instructors".id = "learners".instructor_id
  JOIN "pronouns" ON "users".pronouns_id = "pronouns".id
  JOIN "languages" ON "users".language_id = "languages".id
  WHERE "users".id = $1
  GROUP BY "instructors".id, "users".first_name, "users".last_name, 
  "pronouns".pronoun, "languages".name;`;

  pool.query(sqlQuery, [userId])
    .then(dbRes => {
      res.send(dbRes.rows[0])
    })
    .catch(err => {
      console.log('error GETting instructor detail view:', err);
      res.sendStatus(500);
    })
}); // end logged-in instructor GET

module.exports = router;
