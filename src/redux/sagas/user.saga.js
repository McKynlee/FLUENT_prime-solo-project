import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);
    // console.log('fetch user response:', response);

    // If the user is a learner, fetch specific learner data
    if (response.data.type === 'learner') {
      yield put({ type: 'FETCH_LEARNER', payload: response.data.id });
    }

    // If the user is a instructor, fetch specific instructor data
    if (response.data.type === 'instructor') {
      yield put({ type: 'FETCH_THIS_INSTRUCTOR', payload: response.data.id });
    }

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });



  } catch (error) {
    console.log('User get request failed', error);
  }
} // end fetchUser


// worker Saga: will be fired on "FETCH_USER" actions
function* updateUser(action) {
  const updatedUserInfo = action.payload;
  const userId = action.payload.userId;

  try {

    // update user on server, and subsequently update Learner/Instructor
    yield axios.put(`/api/user/${userId}`, updatedUserInfo);

    // update user with edits:
    yield put({ type: 'FETCH_USER' });

  } catch (error) {
    console.log('User UPDATE failed', error);
  }
} // end updateUser

function* deleteAccount(action) {
  const userId = action.payload;

  try {
    yield axios.delete(`/api/user/delete/${userId}`)
  }
  catch (error) {
    console.log('Saga ERROR deleting account:', error);
  }
}// end deleteAccount


function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('UPDATE_USER', updateUser);
  yield takeLatest('DELETE_ACCOUNT', deleteAccount);
}

export default userSaga;
