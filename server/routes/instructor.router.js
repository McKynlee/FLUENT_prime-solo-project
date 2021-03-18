const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all available instructors from db:
router.get('/', (req, res) => {
  const sqlQuery = `SELECT "instructors".id, "instructors".avatar, 
  "instructors".bio, "instructors".learner_capacity, count("learners") as "learner_count", 
  "users".first_name, "users".last_name, "pronouns".pronoun FROM "instructors"
  JOIN "users" ON "instructors".user_id = "users".id
  JOIN "pronouns" ON "users".pronouns_id = "pronouns".id
  JOIN "learners" ON "users".id = "learners".user_id
  GROUP BY "instructors".id, "users".first_name, "users".last_name, "pronouns".pronoun;`;

  pool.query(sqlQuery)
    .then(dbRes => {
      res.send(dbRes.rows)
    })
    .catch(err => {
      console.log('error GETting available instructors:', err);
      res.sendStatus(500);
    })
});

// Select specific instructor for detailed view
router.get('/:id', (req, res) => {
  const instructorId = req.params.id;
  // console.log('instructorId:', instructorId);

  const sqlQuery = ` SELECT "instructors".id, "instructors".avatar, 
  "instructors".bio, "instructors".learner_capacity, 
  "languages".name as "languages_taught", count("learners") as "learner_count", 
  "users".first_name, "users".last_name, "pronouns".pronoun FROM "instructors"
  JOIN "users" ON "instructors".user_id = "users".id
  JOIN "pronouns" ON "users".pronouns_id = "pronouns".id
  JOIN "languages" ON "users".language_id = "languages".id
  JOIN "learners" ON "users".id = "learners".user_id
  WHERE "instructors".id = $1
  GROUP BY "instructors".id, "users".first_name, "users".last_name, 
  "pronouns".pronoun, "languages".name;`;

  pool.query(sqlQuery, [instructorId])
    .then(dbRes => {
      res.send(dbRes.rows)
    })
    .catch(err => {
      console.log('error GETting instructor detail view:', err);
      res.sendStatus(500);
    })
});

module.exports = router;
