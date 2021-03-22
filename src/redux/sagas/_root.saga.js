import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import pronounSaga from './pronoun.saga';
import languageSaga from './language.saga';
import instructorSaga from './instructor.saga';
import learnerSaga from './learner.saga';
import wordSaga from './words.saga';
import photoSaga from './photo.saga';
import challengeSaga from './challenge.saga';
import monedaSaga from './moneda.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    pronounSaga(),
    languageSaga(),
    instructorSaga(),
    learnerSaga(),
    wordSaga(),
    photoSaga(),
    challengeSaga(),
    monedaSaga(),
  ]);
}
