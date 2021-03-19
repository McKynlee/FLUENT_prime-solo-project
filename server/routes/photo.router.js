const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET specific photo_id from db:
router.get('/:id', (req, res) => {
  const sqlQuery = `SELECT "photo_id" FROM "lorem_picsum"
  WHERE "id" = $1;`;

  const photoId = req.params.id;

  pool.query(sqlQuery, [photoId])
    .then(dbRes => {
      // console.log('dbRes photo id:', dbRes.rows[0].photo_id);
      const loremId = dbRes.rows[0].photo_id;
      // can't res.send a number, so convert to string
      res.send(loremId.toString())
    })
    .catch(err => {
      console.log('error GETting photo:', err);
      res.sendStatus(500);
    })
});

module.exports = router;