import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_PRONOUNS" actions
function* fetchPronouns() {
  try {

    // 'response' is variable to hold pronouns once retrieved from server:
    const response = yield axios.get('/api/pronouns');

    // Send retrieved pronouns to pronoun reducer:
    yield put({ type: 'SET_PRONOUNS', payload: response.data });
  } catch (error) {
    console.log('Pronoun get request failed', error);
  }
}

function* pronounSaga() {
  yield takeLatest('FETCH_PRONOUNS', fetchPronouns);
}

export default pronounSaga;