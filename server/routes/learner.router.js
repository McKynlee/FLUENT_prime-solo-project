const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET current learner from db:
router.get('/:userId', (req, res) => {
  const sqlQuery = 'SELECT * FROM "learners" WHERE "user_id" = $1;';
  const learnerId = req.params.userId;

  pool.query(sqlQuery, [learnerId])
    .then(dbRes => {
      console.log('selected learner:', dbRes.rows[0]);
      res.send(dbRes.rows[0])
    })
    .catch(err => {
      console.log('error GETting current learner:', err);
      res.sendStatus(500);
    })
});

// GET all learners that are paired with specific instructor:
router.get('/paired/:instructorId', (req, res) => {
  const instructorId = req.params.instructorId;

  const sqlQuery = ` SELECT "users".id as "user_id", 
  "pronouns".pronoun as "pronouns", "languages".name as "language", 
  "users".first_name, "users".last_name, "users".username, 
  "learners".skill_level FROM "users"
  JOIN "pronouns" ON "users".pronouns_id = "pronouns".id
  JOIN "languages" ON "users".language_id = "languages".id
  FULL OUTER JOIN "learners" ON "learners".user_id = "users".id
  FULL OUTER JOIN "instructors" ON "instructors".id = "learners".instructor_id
  WHERE "instructors".id = $1;`;

  pool.query(sqlQuery, [instructorId])
    .then(dbRes => {
      // console.log('selected learner:', dbRes.rows);
      res.send(dbRes.rows)
    })
    .catch(err => {
      console.log('error GETting current learner:', err);
      res.sendStatus(500);
    })
});


module.exports = router;