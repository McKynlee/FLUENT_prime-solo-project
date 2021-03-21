const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all available submissions + corresponding feedback from db:
router.get('/', (req, res) => {
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
  "learner_submissions".id = "instructor_feedback".submission_id;`;

  pool.query(sqlQuery)
    .then(dbRes => {
      res.send(dbRes.rows)
    })
    .catch(err => {
      console.log('error GETting all submissions:', err);
      res.sendStatus(500);
    })
});

// Select all submission sent to a specific instructor
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  // console.log('instructorId:', userId);

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
});


module.exports = router;