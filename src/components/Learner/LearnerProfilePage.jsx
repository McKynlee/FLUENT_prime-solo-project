// Learner's main landing page, reached by "/learner"

import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

function LearnerProfile() {
  const dispatch = useDispatch();

  // Bring in learner's user data:
  const user = useSelector((store) => store.user);
  console.log('learner profile user:', user);

  // Bring in instructor data (with whom learner is paired):
  const pairedInstructor = useSelector((store) => store.pairedInstructor);
  console.log('pairedInstructor:', pairedInstructor[0]);

  // on page load, call for this learner's learner data:
  useEffect(() => {
    dispatch({
      type: 'FETCH_LEARNER',
      payload: Number(user.id)
    })
  }, []);

  // Bring in learner's learner data:
  const learner = useSelector((store) => store.learner[0]);
  console.log('learner profile learner:', learner);

  // Control grammar depending on number of monedas:
  let monedaLanguage = 'monedas';
  if (learner.moneda_count === 1) {
    monedaLanguage = 'moneda';
  }

  // Open Edit information pop-up when Edit Your Info button clicked:
  const editLearnerInfo = () => {
    console.log('editLearnerInfo');
  }

  return (
    <div className="container">
      <h1>{user.first_name}, you're on your way to being F.L.U.E.N.T!</h1>
      <p>
        Placeholder for calculating learner submission streak
        once submissions are saving in db
      </p>
      <div className='learner-profile-moneda'>
        You have {learner.moneda_count} {monedaLanguage}!
      </div>

      <div className="learner-profile-personal">
        <h4>Your Information:</h4>
        <p>First name: {user.first_name}</p>
        <p>Last name: {user.last_name}</p>
        <p>Preferred Pronouns: {user.pronouns}</p>
        <p>Language you're learning: {user.language}</p>
        <p>Skill level in above language: {learner.skill_level}</p>
        <p>NOTE TO SELF: can we update username?</p>
        <p>Username: {user.username}</p>
        <button onClick={editLearnerInfo}>
          Edit Your Information
        </button>
      </div>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default LearnerProfile;
