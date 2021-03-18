import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_INSTRUCTORS" actions
function* fetchLearner(action) {
  try {

    // 'response' is variable to hold data once retrieved from server:
    const response = yield axios.get(`/api/learner/${action.payload}`);
    console.log('learner response:', response);

    // Send retrieved data to reducer:
    yield put({ type: 'SET_LEARNER', payload: response.data });
  } catch (error) {
    console.log('Learner get request failed', error);
  }
}

function* learnerSaga() {
  yield takeLatest('FETCH_LEARNER', fetchLearner);
}

export default learnerSaga;