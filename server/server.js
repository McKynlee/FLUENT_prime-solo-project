const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Routes include:
const userRouter = require('./routes/user.router');
const pronounRouter = require('./routes/pronoun.router');
const languageRouter = require('./routes/language.router');
const instructorRouter = require('./routes/instructor.router');
const learnerRouter = require('./routes/learner.router');
const wordRouter = require('./routes/word.router');
const photoRouter = require('./routes/photo.router');
const challengeRouter = require('./routes/challenge.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/pronouns', pronounRouter);
app.use('/api/languages', languageRouter);
app.use('/api/instructors', instructorRouter);
app.use('/api/learner', learnerRouter);
app.use('/api/words', wordRouter);
app.use('/api/photo', photoRouter);
app.use('/api/challenge', challengeRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
