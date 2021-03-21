import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_INSTRUCTORS" actions
// fetch ALL instructors for a given language name
function* fetchInstructors(action) {
  const languageId = action.payload;

  try {

    // 'response' is variable to hold data once retrieved from server:
    const response = yield axios.get(`/api/instructors/all/${languageId}`);

    // Send retrieved data to reducer:
    yield put({ type: 'SET_INSTRUCTORS', payload: response.data });
  }
  catch (error) {
    console.log('Instructor get request failed', error);
  }
} // end fetchInstructors

function* fetchPairedInstructor(action) {
  // console.log('fetchLearnersInstructor action:', action);
  const instructorToPairInstructorId = action.payload;

  try {
    const response = yield axios.get(`/api/instructors/detail/${instructorToPairInstructorId}`);

    // Send retrieved data to reducer:
    yield put({ type: 'SET_PAIRED_INSTRUCTOR', payload: response.data[0] })
  }
  catch (error) {
    console.log('Paired Instructor get request failed', error);
  }
} //end fetchPairedInstructor


// worker Saga: will be fired on 'FETCH_THIS_INSTRUCTOR' actions
function* fetchThisInstructor(action) {
  // console.log('fetchThisInstructor action:', action);

  const userId = action.payload;
  // console.log('Saga userId:', userId);

  try {

    // 'response' is variable to hold data once retrieved from server:
    const response = yield axios.get(`/api/instructors/profile/${userId}`);
    // console.log('thisInstructor response:', response.data[0]);

    const thisInstructorInfo = response.data[0];

    // Pass thisInstructor's ID to learner saga to fetch corresponding learners
    // for Instructor Profile page:
    yield put({
      type: 'FETCH_PAIRED_LEARNERS',
      payload: thisInstructorInfo.instructorId
    })

    // Send retrieved data to reducer:
    yield put({ type: 'SET_THIS_INSTRUCTOR', payload: response.data[0] });
  } catch (error) {
    console.log('thisInstructor get request failed', error);
  }
} //end fetchThisInstructor

function* instructorSaga() {
  yield takeLatest('FETCH_INSTRUCTORS', fetchInstructors);
  yield takeLatest('FETCH_PAIRED_INSTRUCTOR', fetchPairedInstructor);
  yield takeLatest('FETCH_THIS_INSTRUCTOR', fetchThisInstructor)
}

export default instructorSaga;