const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all languages from table in db:
router.get('/', (req, res) => {
  const sqlQuery = 'SELECT * FROM "languages";';

  pool.query(sqlQuery)
    .then(dbRes => {
      res.send(dbRes.rows)
    })
    .catch(err => {
      console.log('error GETting languages:', err);
      res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;