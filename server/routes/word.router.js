const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all Spanish words from db:
router.get('/', (req, res) => {
  const sqlQuery = `SELECT * FROM "words"
  WHERE "language_id" = $1;`;

  const spanishId = 1;

  pool.query(sqlQuery, [spanishId])
    .then(dbRes => {
      res.send(dbRes.rows)
    })
    .catch(err => {
      console.log('error GETting words:', err);
      res.sendStatus(500);
    })
}); // end GET all Spanish words


// GET specific word from db:
router.get('/:id', (req, res) => {
  const sqlQuery = `SELECT * FROM "words"
  WHERE "id" = $1;`;

  const spanishId = req.params.id;

  pool.query(sqlQuery, [spanishId])
    .then(dbRes => {
      res.send(dbRes.rows)
    })
    .catch(err => {
      console.log('error GETting words:', err);
      res.sendStatus(500);
    })
});

module.exports = router;