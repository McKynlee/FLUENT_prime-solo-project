import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_SUBMISSIONS" 
function* fetchSubmissions(action) {
  console.log('fetchSubmission action:', action);
  try {

    // 'response' is variable to hold data once retrieved from server:
    const response = yield axios.get('/api/challenge');
    console.log('All Submissions response:', response.data);

    // Send retrieved data to reducer:
    yield put({ type: 'SET_SUBMISSIONS', payload: response.data });
  } catch (error) {
    console.log('Challenge submission GET failed', error);
  }
} // end fetchSubmissions


// worker Saga: will be fired on 'CREATE_SUBMISSION' 
function* createSubmission(action) {
  console.log('createSubmission action:', action);
  try {

    // 'response' is variable to hold data once retrieved from server:
    yield axios.post('/api/challenge');

    // Update submissions reducer:
    yield put({ type: 'FETCH_SUBMISSIONS' });

  } catch (error) {
    console.log('Challenge submission POST failed', error);
  }
} //end createSubmission

function* challengeSaga() {
  yield takeLatest('FETCH_SUBMISSIONS', fetchSubmissions);
  yield takeLatest('CREATE_SUBMISSION', createSubmission);
}

export default challengeSaga;