const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  // Common user data to both learners and instructors:
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const first_name = req.body.firstName;
  const last_name = req.body.lastName;
  const pronouns_id = req.body.pronoun;
  const type = req.body.userType;

  // set language_id based on receiving learner/instructor data:
  let language_id;
  if (type === 'learner') {
    language_id = req.body.targetLanguage;
  } else {
    language_id = req.body.knownLanguage;
  }

  // Data specific to learners:
  const skill_level = req.body.languageSkill;
  const moneda_count = 5;
  const instructor_id = req.body.instructor_id;

  // Data specific to instructors:
  const bio = req.body.bio;
  const avatar = req.body.avatar;
  const learner_capacity = req.body.instructorCapacity;

  const queryTextMakeUser = `INSERT INTO "users" 
  ("language_id", "pronouns_id", "first_name", "last_name", 
  "username", "password", "type")
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;

  pool
    .query(queryTextMakeUser, [language_id, pronouns_id, first_name, last_name, username, password, type])
    .then(dbRes => {
      // console.log('ddRes.rows[0].id:', dbRes.rows[0].id);
      // Determine what the second query text is depending on user type (learner vs. instructor):
      let queryTextMakeSpecific;
      let queryParamSpecific;

      if (type === 'learner') {
        queryTextMakeSpecific = `INSERT INTO "learners" ("user_id", "skill_level", "moneda_count", "instructor_id")
    VALUES ($1, $2, $3, $4) RETURNING id;`;
        queryParamSpecific = [dbRes.rows[0].id, skill_level, moneda_count, instructor_id];
      } else {
        queryTextMakeSpecific = `INSERT INTO "instructors" ("user_id", "bio", "avatar", "learner_capacity")
    VALUES ($1, $2, $3, $4) RETURNING id;`;
        queryParamSpecific = [dbRes.rows[0].id, bio, avatar, learner_capacity];
      }

      pool.query(queryTextMakeSpecific, queryParamSpecific)
        .then(() => res.sendStatus(201))
        .catch(err => {
          console.log('ERROR adding Learner:', err);
          res.sendStatus(500)
        })
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// Update user info with edits
router.put('/:userId', (req, res) => {
  // console.log('user put req.body:', req.body);

  // Data common to both learners and instructors:
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const pronounId = req.body.pronoun;
  const userId = req.params.userId;
  const type = req.body.userType;

  // set language_id based on receiving learner/instructor data:
  let languageId;
  if (type === 'learner') {
    languageId = req.body.targetLanguage;
  } else {
    languageId = req.body.knownLanguage;
  }

  // Query to update user (for both learners and instructors):
  const sqlQuery = `UPDATE "users"
  SET "language_id" = $1, "username" = $2, 
  "first_name" = $3, "last_name" = $4, "pronouns_id" = $5
  WHERE "id" = $6;`

  // Data specific to learners:
  const skill_level = req.body.languageSkill;

  // Data specific to instructors:
  const bio = req.body.bio;
  const avatar = req.body.avatar;
  const learner_capacity = req.body.instructorCapacity;


  // Initial update for ALL users (both learners and instructors):
  pool.query(sqlQuery, [languageId, username,
    firstName, lastName, pronounId, userId])
    .then(dbRes => {

      // Determine what the second query text is depending on user type (learner vs. instructor):
      let specificQuery;
      let paramSpecific;

      if (type === 'learner') {
        specificQuery = `UPDATE "learners"
        SET "skill_level" = $1
        WHERE "user_id" = $2;`;
        paramSpecific = [skill_level, userId];
      } else {
        specificQuery = `UPDATE "instructors"
        SET "bio" = $1, "avatar" = $2, "learner_capacity" = $3
        WHERE "user_id" = $4;`;
        paramSpecific = [bio, avatar, learner_capacity, userId];
      }

      pool.query(specificQuery, paramSpecific)
        .then(() => res.sendStatus(200))
        .catch(err => {
          console.log('ERROR updating learner/instructor:', err);
          res.sendStatus(500);
        })
    })
    .catch(err => {
      console.log('ERROR updating user:', err);
      res.sendStatus(500);
    })
}); //end UPDATE user + learner/instructor

router.delete('/delete/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log('delete userId:', userId);

  const sqlQuery = `DELETE FROM "users"
  WHERE "id" = $1;`

  pool.query(sqlQuery, [userId])
    .then(dbRes => res.sendStatus(200))
    .catch(err => {
      console.log('ERROR deleting account:', err);
      res.sendStatus(500);
    })
}) // end delete user

module.exports = router;
