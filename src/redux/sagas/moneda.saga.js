import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'INCREASE_MONEDAS' 
function* increaseMonedas(action) {
  console.log('increaseMonedas action:', action);

  const learnerId = action.payload;

  try {
    // 'response' is variable to hold data once retrieved from server:
    yield axios.post('/api/challenge/monedas', learnerId);
    // yield action.payload.onComplete();

    // Update learner reducer since we've added monedas:
    yield put({
      type: 'FETCH_LEARNER',
      payload: learnerId
    });

  } catch (error) {
    console.log('increaseMonedas saga failed', error);
  }
} //end increaseMonedas


function* monedaSaga() {
  yield takeLatest('INCREASE_MONEDAS', increaseMonedas);
}

export default monedaSaga;