// Handle request for random photo ID:
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchRandomPhoto(action) {
  try {
    // 'response' is variable to hold data once retrieved from server:
    const response = yield axios.get(`/api/photo/${action.payload}`);

    // Send retrieved data to reducer:
    yield put({ type: 'SET_RANDOM_PHOTO', payload: response.data });
  } catch (error) {
    console.log('Photo GET request failed', error);
  }
} //end fetchRandomPhoto

function* photoSaga() {
  yield takeLatest('FETCH_RANDOM_PHOTO', fetchRandomPhoto);
}

export default photoSaga;