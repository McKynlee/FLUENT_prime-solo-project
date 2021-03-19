import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_WORDS" actions
function* fetchWords() {
  try {

    // 'response' is variable to hold data once retrieved from server:
    const response = yield axios.get('/api/words');

    // Send retrieved data to reducer:
    yield put({ type: 'SET_WORDS', payload: response.data });
  } catch (error) {
    console.log('Words get request failed', error);
  }
}

function* wordSaga() {
  yield takeLatest('FETCH_WORDS', fetchWords);
}

export default wordSaga;