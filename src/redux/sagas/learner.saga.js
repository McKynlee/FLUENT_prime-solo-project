import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'FETCH_LEARNER' actions
function* fetchLearner(action) {
  // console.log('fetchLearner action:', action);

  const userId = action.payload;

  try {

    // 'response' is variable to hold data once retrieved from server:
    const response = yield axios.get(`/api/learner/${userId}`);
    console.log('learner response:', response.data);

    const allLearnerInfo = response.data;

    // Pass selected instructor id to instructor saga to store
    // instructor details for Learner Profile page:
    yield put({
      type: 'FETCH_PAIRED_INSTRUCTOR',
      payload: allLearnerInfo.instructor_id
    })

    // Pass learner id to challenge saga to fetch
    // streak of how many consecutive submission days learner has:
    yield put({
      type: 'FETCH_SUBMISSION_STREAK',
      payload: allLearnerInfo.id
    })

    // Send retrieved data to reducer:
    yield put({ type: 'SET_LEARNER', payload: allLearnerInfo });
  } catch (error) {
    console.log('Learner get request failed', error);
  }
} //end fetchLearner

// worker Saga: fired on "FETCH_PAIRED_LEARNERS" to
// GET all learners associated with thisInstructor's ID:
function* fetchPairedLearners(action) {
  const thisInstructorId = action.payload;

  try {
    const response = yield axios.get(`/api/learner/paired/${thisInstructorId}`);

    // Send retrieved list of learners to reducer:
    yield put({ type: 'SET_PAIRED_LEARNERS', payload: response.data })
  }
  catch (error) {
    console.log('Paired Learners get request failed', error);
  }
} // end fetchPairedLearners

function* learnerSaga() {
  yield takeLatest('FETCH_LEARNER', fetchLearner);
  yield takeLatest('FETCH_PAIRED_LEARNERS', fetchPairedLearners)
}

export default learnerSaga;