const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all available instructors from db:
router.get('/', (req, res) => {
  const sqlQuery = 'SELECT * FROM "instructors";';

  pool.query(sqlQuery)
    .then(dbRes => {
      console.log('dbRes.rows', dbRes.rows);
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

  const sqlQuery = 'SELECT * FROM "instructors" WHERE "id" = $1;';

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
