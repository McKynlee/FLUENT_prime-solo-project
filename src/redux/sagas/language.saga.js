import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_LANGUAGES" actions
function* fetchLanguages() {
  try {

    // 'response' is variable to hold data once retrieved from server:
    const response = yield axios.get('/api/languages');

    // Send retrieved data to reducer:
    yield put({ type: 'SET_LANGUAGES', payload: response.data });
  } catch (error) {
    console.log('Language get request failed', error);
  }
}

function* languageSaga() {
  yield takeLatest('FETCH_LANGUAGES', fetchLanguages);
}

export default languageSaga;