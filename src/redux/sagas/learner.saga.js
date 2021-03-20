import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'FETCH_LEARNER' actions
function* fetchLearner(action) {
  console.log('fetchLearner action:', action);

  const registeredLearnerId = action.payload;
  try {

    // 'response' is variable to hold data once retrieved from server:
    const response = yield axios.get(`/api/learner/${registeredLearnerId}`);
    console.log('learner response:', response.data);

    const allLearnerInfo = response.data;

    // Pass selected instructor id to instructor saga to store
    // instructor details for Learner Profile page:
    yield put({
      type: 'FETCH_PAIRED_INSTRUCTOR',
      payload: allLearnerInfo.instructor_id
    })

    // Send retrieved data to reducer:
    yield put({ type: 'SET_LEARNER', payload: allLearnerInfo });
  } catch (error) {
    console.log('Learner get request failed', error);
  }
} //end fetchLearner

function* learnerSaga() {
  yield takeLatest('FETCH_LEARNER', fetchLearner);
}

export default learnerSaga;