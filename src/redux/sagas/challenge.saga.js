import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_LEARNER_SUBMISSIONS" 
function* fetchLearnerSubmissions(action) {
  // console.log('fetchSubmission action:', action);

  const userId = action.payload;

  try {

    // 'response' is variable to hold all submissions linked with logged-in user's id:
    const response = yield axios.get(`/api/challenge/learner/${userId}`);
    console.log('All Submissions response:', response.data);

    // Send retrieved data to reducer:
    yield put({ type: 'SET_SUBMISSIONS', payload: response.data });
  } catch (error) {
    console.log('Challenge submission GET failed', error);
  }
} // end fetchLearnerSubmissions


// worker Saga: will be fired on "FETCH_INSTRUCTOR_SUBMISSIONS" 
function* fetchInstructorSubmissions(action) {
  console.log('fetchInstructorSubmission action:', action);

  const userId = action.payload;

  try {

    // 'response' is variable to hold all submissions linked with logged-in user's id:
    const response = yield axios.get(`/api/challenge/instructor/${userId}`);
    console.log('All Submissions response:', response.data);

    // Send retrieved data to reducer:
    yield put({ type: 'SET_SUBMISSIONS', payload: response.data });
  } catch (error) {
    console.log('Challenge submission GET failed', error);
  }
} // end fetchInstructorSubmissions


// worker Saga: will be fired on 'CREATE_SUBMISSION' 
function* createSubmission(action) {
  console.log('createSubmission action:', action);
  console.log('action.payload:', action.payload);

  try {
    // 'response' is variable to hold data once retrieved from server:
    yield axios.post('/api/challenge', action.payload);
    // yield action.payload.onComplete();

    //learner_id
    const learnerId = action.payload.learnerId;

    // Update submissions reducer since we've added a submission:
    yield put({
      type: 'FETCH_LEARNER_SUBMISSIONS',
      payload: learnerId
    });

  } catch (error) {
    console.log('Challenge submission POST failed', error);
  }
} //end createSubmission


function* challengeSaga() {
  yield takeLatest('FETCH_LEARNER_SUBMISSIONS', fetchLearnerSubmissions);
  yield takeLatest('CREATE_SUBMISSION', createSubmission);
  yield takeLatest('FETCH_INSTRUCTOR_SUBMISSIONS', fetchInstructorSubmissions)
}

export default challengeSaga;