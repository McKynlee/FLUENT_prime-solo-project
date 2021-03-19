import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_WORDS" actions
function* fetchAllWords() {
  try {

    // 'response' holds all words once retrieved from server:
    const response = yield axios.get('/api/words');

    // Send retrieved data to reducer:
    yield put({ type: 'SET_WORDS', payload: response.data });
  } catch (error) {
    console.log('Words get request failed', error);
  }
} // end fetchAllWords


function* fetchRandomWord(action) {
  try {
    // 'response' is variable to hold data once retrieved from server:
    const response = yield axios.get(`/api/words/${action.payload}`);

    // Send retrieved data to reducer:
    yield put({ type: 'SET_RANDOM_WORD', payload: response.data });
  } catch (error) {
    console.log('Words get request failed', error);
  }
} //end fetchRandomWord

function* wordSaga() {
  yield takeLatest('FETCH_WORDS', fetchAllWords);
  yield takeLatest('FETCH_RANDOM_WORD', fetchRandomWord);
}

export default wordSaga;