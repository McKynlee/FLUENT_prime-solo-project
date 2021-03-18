const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET current learner from db:
router.get('/:userId', (req, res) => {
  const sqlQuery = 'SELECT * FROM "learners" WHERE "user_id" = $1;';
  const learnerId = req.params.userId;

  pool.query(sqlQuery, [learnerId])
    .then(dbRes => {
      res.send(dbRes.rows)
    })
    .catch(err => {
      console.log('error GETting current learner:', err);
      res.sendStatus(500);
    })
});


module.exports = router;