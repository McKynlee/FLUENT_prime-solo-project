import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_INSTRUCTORS" actions
function* fetchInstructors() {
  try {

    // 'response' is variable to hold data once retrieved from server:
    const response = yield axios.get('/api/instructors');

    // Send retrieved data to reducer:
    yield put({ type: 'SET_INSTRUCTORS', payload: response.data });
  }
  catch (error) {
    console.log('Instructor get request failed', error);
  }
}

function* fetchPairedInstructor(action) {
  // console.log('fetchLearnersInstructor action:', action);
  try {
    const response = yield axios.get(`/api/instructors/${action.payload}`);

    // Send retrieved data to reducer:
    yield put({ type: 'SET_PAIRED_INSTRUCTOR', payload: response.data[0] })
  }
  catch (error) {
    console.log('Paired Instructor get request failed', error);
  }
}

function* instructorSaga() {
  yield takeLatest('FETCH_INSTRUCTORS', fetchInstructors);
  yield takeLatest('FETCH_PAIRED_INSTRUCTOR', fetchPairedInstructor)
}

export default instructorSaga;