import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'FETCH_LEARNER' actions
function* fetchLearner(action) {
  console.log('fetchLearner action:', action);
  try {

    // 'response' is variable to hold data once retrieved from server:
    const response = yield axios.get(`/api/learner/${action.payload}`);
    console.log('learner response:', response.data.instructor_id);

    // Pass selected instructor id to instructor saga to store
    // instructor details for Learner Profile page:
    yield put({
      type: 'FETCH_PAIRED_INSTRUCTOR',
      payload: response.data.instructor_id
    })

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