import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'INCREASE_MONEDAS' 
function* increaseMonedas(action) {
  console.log('increaseMonedas action:', action);

  const userId = action.payload;

  try {
    // 'response' is variable to hold data once retrieved from server:
    yield axios.put(`/api/challenge/monedas/${userId}`);

    // Update learner reducer since we've added monedas:
    yield put({
      type: 'FETCH_LEARNER',
      payload: userId
    });

  } catch (error) {
    console.log('increaseMonedas saga failed', error);
  }
} //end increaseMonedas


function* monedaSaga() {
  yield takeLatest('INCREASE_MONEDAS', increaseMonedas);
}

export default monedaSaga;