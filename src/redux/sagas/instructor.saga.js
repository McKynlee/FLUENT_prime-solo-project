import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_INSTRUCTORS" actions
function* fetchInstructors() {
  try {

    // 'response' is variable to hold data once retrieved from server:
    const response = yield axios.get('/api/instructors');

    // Send retrieved data to reducer:
    yield put({ type: 'SET_INSTRUCTORS', payload: response.data });
  } catch (error) {
    console.log('Instructor get request failed', error);
  }
}

function* instructorSaga() {
  yield takeLatest('FETCH_INSTRUCTORS', fetchInstructors);
}

export default instructorSaga;