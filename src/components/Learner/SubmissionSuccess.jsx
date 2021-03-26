// Celebratory page to confirm learner's challenge has been submitted
// '/success'

import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS:
import starImg from '../images/star.png';

function SubmissionSuccess() {
  const history = useHistory();

  // Bring in learner's user data:
  const user = useSelector((store) => store.user);
  // console.log('user:', user);

  // Bring in learner's learner data:
  const learner = useSelector((store) => store.learner);
  // console.log('learner:', learner);

  return (
    <div className="text-center">
      <h1>¡Buen trabajo, {user.first_name}!</h1>
      <h2>Nice work!</h2>

      <div className='moneda-star-container-xl'>
        <img src={starImg} alt="star"
          className="star-image-xl" />
        <div className="moneda-announcement">
          You now have
          <div className="moneda-number-xl">
            {learner.moneda_count}
          </div>
          monedas!
        </div>
      </div>

      <button type="challenge"
        className="btn"
        onClick={() => history.push('/challenge')}>
        Complete Another Challenge
      </button>
    </div>
  )
} // end submissionSuccess

export default SubmissionSuccess;