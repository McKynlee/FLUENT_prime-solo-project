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

// worker Saga: will be fired on "FETCH_SUBMISSION_STREAK" 
function* fetchStreak(action) {
  const learnerId = action.payload;
  console.log('fetchStreak learnerId:', learnerId);

  try {
    // 'response' captures streak number calculated on server:
    const response = yield axios.get(`/api/challenge/streak/${learnerId}`);
    console.log('fetchStreak challengeSaga response:', response.data);

    const streakNumber = response.data.length;

    // Send retrieved data to reducer:
    yield put({ type: 'SET_STREAK', payload: streakNumber });
  } catch (error) {
    console.log('Challenge submission GET failed', error);
  }
}//end fetchStreak


// worker Saga: will be fired on 'CREATE_SUBMISSION' 
function* createSubmission(action) {
  console.log('createSubmission action:', action);

  const learnerSubmissionInputs = action.payload;

  try {
    // 'response' is variable to hold data once retrieved from server:
    yield axios.post('/api/challenge', learnerSubmissionInputs);
    // yield action.payload.onComplete();

    const learnerId = action.payload.learnerId;
    const userId = action.payload.userId;

    // Update submissions reducer since we've added a submission:
    yield put({
      type: 'FETCH_LEARNER_SUBMISSIONS',
      payload: learnerId
    });

    // Add monedas each time the learner submits a challenge:
    yield put({
      type: 'INCREASE_MONEDAS',
      payload: userId
    })

  } catch (error) {
    console.log('Challenge submission POST failed', error);
  }
} //end createSubmission


function* createFeedback(action) {
  console.log('createSubmission action:', action);

  const instructorFeedbackInputs = action.payload;

  try {
    // 'response' is variable to hold data once retrieved from server:
    yield axios.post('/api/challenge/feedback', instructorFeedbackInputs);

    const instructorUserId = instructorFeedbackInputs.instructors_userId;
    console.log('instructorUserId:', instructorUserId);

    // Update submissions reducer since we've added feedback:
    yield put({
      type: 'FETCH_INSTRUCTOR_SUBMISSIONS',
      payload: instructorUserId
    });

  } catch (error) {
    console.log('Feedback submission POST failed', error);
  }
} // end createFeedback


function* fetchThisSubmission(action) {
  // console.log('fetchThisSubmission action:', action);

  const submissionId = Number(action.payload);
  console.log('Saga submissionId:', submissionId);

  try {

    // 'response' is variable to hold this submission data once retrieved from server:
    const response = yield axios.get(`/api/challenge/this/${submissionId}`);
    console.log('thisSubmission response:', response.data[0]);

    const thisSubmissionInfo = response.data[0];

    // Send retrieved data to reducer:
    yield put({ type: 'SET_THIS_SUBMISSION', payload: thisSubmissionInfo });
  } catch (error) {
    console.log('thisSubmission get request failed', error);
  }
} //end thisSubmission


// Delete row of feedback by id:
function* deleteFeedback(action) {
  const feedbackId = action.payload.feedbackId;
  const instructorUserId = action.payload.instructorUserId;

  try {
    yield axios.delete(`/api/challenge/delete/${feedbackId}`)

    // Update submissions reducer since we've deleted a feedback:
    yield put({
      type: 'FETCH_INSTRUCTOR_SUBMISSIONS',
      payload: instructorUserId
    });
  }
  catch (error) {
    console.log('deleteFeedback saga failed', error);
  }
} // end deleteFeedback


function* challengeSaga() {
  yield takeLatest('FETCH_LEARNER_SUBMISSIONS', fetchLearnerSubmissions);
  yield takeLatest('CREATE_SUBMISSION', createSubmission);
  yield takeLatest('FETCH_INSTRUCTOR_SUBMISSIONS', fetchInstructorSubmissions);
  yield takeLatest('FETCH_THIS_SUBMISSION', fetchThisSubmission);
  yield takeLatest('CREATE_FEEDBACK', createFeedback);
  yield takeLatest('DELETE_FEEDBACK', deleteFeedback);
  yield takeLatest('FETCH_SUBMISSION_STREAK', fetchStreak);
}

export default challengeSaga;