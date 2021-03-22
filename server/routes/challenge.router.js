const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all submissions + corresponding feedback linked with logged-in learner:
router.get('/learner/:userId', (req, res) => {
  const userId = req.params.userId;

  const sqlQuery = `SELECT "learner_submissions".id as "submission_id", 
  "learner_submissions".learner_id, "users".first_name, "users".last_name, 
  "learner_submissions".picture_url, 
  "learner_submissions".picture_description, "learner_submissions".word, 
  "learner_submissions".word_sentence, "learner_submissions".q_for_instructor, 
  "learner_submissions".time_stamp as "learner_time_stamp", 
  "instructor_feedback".id as "feedback_id", 
  "instructor_feedback".picture_description as "instructor_pic_response", 
  "instructor_feedback".word_sentence as "instructor_word_response", 
  "instructor_feedback".q_for_instructor as "instructor_q_response", 
  "instructor_feedback".time_stamp as "instructor_time_stamp", "instructors".id
  FROM "learner_submissions"
  JOIN "learners" ON "learners".id = "learner_submissions".learner_id
  JOIN "users" ON "users".id = "learners".user_id
  JOIN "instructors" ON "learners".instructor_id = "instructors".id
  FULL OUTER JOIN "instructor_feedback" ON 
  "learner_submissions".id = "instructor_feedback".submission_id
  WHERE "users".id = $1;`;

  pool.query(sqlQuery, [userId])
    .then(dbRes => {
      res.send(dbRes.rows)
    })
    .catch(err => {
      console.log('error GETting all submissions:', err);
      res.sendStatus(500);
    })
});

// Select all submissions sent to a specific instructor
router.get('/instructor/:userId', (req, res) => {
  const userId = Number(req.params.userId);
  console.log('userId:', userId);

  const sqlQuery = `SELECT "learner_submissions".id as "submission_id", 
  "learner_submissions".learner_id, "users".id as "instructors_userId",
  "users".first_name as "instructor_firstName",
  "users".last_name as "instructor_lastName", 
  "learner_submissions".picture_url, 
  "learner_submissions".picture_description, "learner_submissions".word, 
  "learner_submissions".word_sentence, "learner_submissions".q_for_instructor, 
  "learner_submissions".time_stamp as "learner_time_stamp", 
  "instructor_feedback".id as "feedback_id", 
  "instructor_feedback".picture_description as "instructor_pic_response", 
  "instructor_feedback".word_sentence as "instructor_word_response", 
  "instructor_feedback".q_for_instructor as "instructor_q_response", 
  "instructor_feedback".time_stamp as "instructor_time_stamp", 
  "instructors".id as "instructor_id"
  FROM "learner_submissions"
  JOIN "learners" ON "learners".id = "learner_submissions".learner_id
  JOIN "instructors" ON "learners".instructor_id = "instructors".id
  JOIN "users" ON "users".id = "instructors".user_id
  FULL OUTER JOIN "instructor_feedback" ON 
  "learner_submissions".id = "instructor_feedback".submission_id
  WHERE "users".id = $1;`;

  pool.query(sqlQuery, [userId])
    .then(dbRes => {
      res.send(dbRes.rows)
    })
    .catch(err => {
      console.log('error GETting specific submission set:', err);
      res.sendStatus(500);
    })
}); // end GET specific instructor's submissions

// get specific submission for detail view:
router.get('/this/:submissionId', (req, res) => {
  const submissionId = Number(req.params.submissionId);
  console.log('submissionId:', submissionId);

  const sqlQuery = `SELECT "learner_submissions".id as "submission_id", 
  "learner_submissions".learner_id, "users".id as "instructors_userId",
  "learner_submissions".picture_url, 
  "learner_submissions".picture_description, "learner_submissions".word, 
  "learner_submissions".word_sentence, "learner_submissions".q_for_instructor, 
  "learner_submissions".time_stamp as "learner_time_stamp", 
  "instructor_feedback".id as "feedback_id", 
  "instructor_feedback".picture_description as "instructor_pic_response", 
  "instructor_feedback".word_sentence as "instructor_word_response", 
  "instructor_feedback".q_for_instructor as "instructor_q_response", 
  "instructor_feedback".time_stamp as "instructor_time_stamp", 
  "instructors".id as "instructor_id"
  FROM "learner_submissions"
  JOIN "learners" ON "learners".id = "learner_submissions".learner_id
  JOIN "instructors" ON "learners".instructor_id = "instructors".id
  JOIN "users" ON "users".id = "instructors".user_id
  FULL OUTER JOIN "instructor_feedback" ON 
  "learner_submissions".id = "instructor_feedback".submission_id
  WHERE "learner_submissions".id = $1;`;

  pool.query(sqlQuery, [submissionId])
    .then(dbRes => {
      console.log('thisSubmission dbRes.rows:', dbRes.rows);
      res.send(dbRes.rows)
    })
    .catch(err => {
      console.log('ERROR GETting specific submission:', err);
      res.sendStatus(500);
    })
}); // end get THIS submission


// GET learner's streak of consecutive-days of submissions:
router.get('/streak/:learnerId', (req, res) => {
  const learnerId = req.params.learnerId;
  console.log('streak learnerId:', learnerId);

  const sqlQuery = ` WITH "submission_dates" AS (
    SELECT DISTINCT "time_stamp"::date "created_date"
    FROM "learner_submissions"
    WHERE "learner_id" = $1
    ),
    "submission_date_groups" AS (
    SELECT
      row_number() OVER (ORDER BY "created_date"),
      "created_date",
      "created_date"::DATE - CAST(row_number() OVER (ORDER BY "created_date") as INT) AS "grp"
    FROM "submission_dates"
      )
    SELECT
      max("created_date") - min("created_date") + 1 AS "length" 
     FROM "submission_date_groups"
     GROUP BY "grp"
     ORDER BY "length" DESC
     LIMIT 1;`

  pool.query(sqlQuery, [learnerId])
    .then(dbRes => {
      console.log('streak dbRes.rows:', dbRes.rows);
      res.send(dbRes.rows[0])
    })
    .catch(err => {
      console.log('ERROR getting challenge streak:', err);
      res.sendStatus(500);
    })
})


// Create new submission:
router.post('/', (req, res) => {
  // console.log('submission req.body:', req.body);
  const learnerId = req.body.learnerId;
  const picURL = req.body.imageSRC;
  const picDescription = req.body.photoDescription;
  const word = req.body.randomWord;
  const wordSentence = req.body.wordSentence;
  const qForInstructor = req.body.qForInstructor;

  const sqlQuery = `INSERT INTO "learner_submissions" 
  ("learner_id", "word", "picture_url", "picture_description", 
  "word_sentence", "q_for_instructor")
  VALUES ($1, $2, $3, $4, $5, $6);`


  pool.query(sqlQuery, [learnerId, word, picURL, picDescription, wordSentence, qForInstructor])
    .then(dbRes => res.sendStatus(201))
    .catch(err => {
      console.log('ERROR posting submission:', err);
      res.sendStatus(500);
    })
}); // end Create new submission


// Create new feedback:
router.post('/feedback', (req, res) => {
  console.log('feedback req.body:', req.body);
  const instructorId = req.body.instructor_id;
  const picDescription = req.body.instructor_pic_response;
  const wordSentence = req.body.instructor_word_response;
  const qForInstructor = req.body.instructor_q_response;
  const submissionId = req.body.submission_id;

  const sqlQuery = `INSERT INTO "instructor_feedback" 
  ("submission_id", "instructor_id", "picture_description", 
  "word_sentence", "q_for_instructor")
  VALUES ($1, $2, $3, $4, $5);`


  pool.query(sqlQuery, [submissionId, instructorId,
    picDescription, wordSentence, qForInstructor])
    .then(dbRes => res.sendStatus(201))
    .catch(err => {
      console.log('ERROR posting feedback:', err);
      res.sendStatus(500);
    })
}); // end Create new feedback


// Add 5 to moneda count each time a learner submits a challenge:
router.put('/monedas/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log('userId in monedas:', userId);

  // select specific moneda count to increase:
  const sqlQuery1 = `SELECT "moneda_count" FROM "learners" 
  WHERE "user_id" = $1;`

  // update the selected moneda count (from above):
  const sqlQuery2 = `UPDATE "learners"
  SET "moneda_count" = $1 + 5
  WHERE "user_id" = $2;`

  pool.query(sqlQuery1, [userId])
    .then(dbRes => {
      console.log('monedas dbRes1.rows[0].moneda_count:', dbRes.rows[0].moneda_count);
      const ogMonedaCount = dbRes.rows[0].moneda_count;

      // Send selected moneda count into second query to be updated
      pool.query(sqlQuery2, [ogMonedaCount, userId])
        .then(dbResult => {
          res.sendStatus(200)
        })
        .catch(err => {
          console.log('error with monedas sqlQuery2:', err);
          res.sendStatus(500);
        })
    })
    .catch(error => {
      console.log('error updating monedas:', error);
      res.sendStatus(501);
    })
}); // end add monedas with each submission


// Delete specific instructor feedback by feedback ID
router.delete('/delete/:feedbackId', (req, res) => {
  const feedbackId = req.params.feedbackId;
  console.log('Delete this feedback id:', feedbackId);

  const sqlQuery = `DELETE FROM "instructor_feedback" 
  WHERE "id"= $1;`

  pool.query(sqlQuery, [feedbackId])
    .then(dbRes => {
      console.log('Feedback deleted');
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('ERROR deleting feedback:', err);
      res.sendStatus(500);
    })
}); // end delete feedback

module.exports = router;