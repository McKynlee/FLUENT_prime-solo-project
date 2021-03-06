// Learner's main landing page, reached by "/learner"

import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS:
import starImg from '../images/star.png';

function LearnerProfile() {
  const dispatch = useDispatch();
  const history = useHistory();

  ////////////////// BRING IN REDUCER DATA ////////////////////
  // Bring in learner's user data:
  const user = useSelector((store) => store.user);
  // console.log('learner profile user:', user);

  // Bring in learner's learner data:
  const learner = useSelector((store) => store.learner);
  // console.log('learner profile learner:', learner);

  // Bring in instructor data (with whom learner is paired):
  const pairedInstructor = useSelector((store) => store.pairedInstructor);
  console.log('pairedInstructor:', pairedInstructor);

  // Bring in submission streak data 
  // (consecutive days this learner has submitted a challenge)
  const submissionStreak = useSelector((store) => store.submissionStreak);
  console.log('submissionStreak on learner profile:', submissionStreak);


  ///////////////// CONDITIONAL RENDERING /////////////////////
  // Control grammar depending on number of monedas learner has:
  let monedaLanguage = 'monedas';
  if (learner.moneda_count === 1) {
    monedaLanguage = 'moneda';
  }

  // Control grammar depending on number of days in learner's submission streak:
  let streakDescription;
  if (submissionStreak === 0) {
    streakDescription = "You're at the very beginning of a new submission streak!"
  }
  if (submissionStreak === 1) {
    streakDescription = `You're 1 day into your new submission streak!`
  }
  if (submissionStreak > 1) {
    streakDescription = `You have a ${submissionStreak}-day submission streak - keep it up!`
  }


  ///////////////////// HANDLE EDIT INFORMATION ///////////////////////
  // Open Edit information pop-up when Edit Your Info button clicked:
  const editLearnerInfo = () => {
    console.log('editLearnerInfo');

    history.push('/learner/edit')
  } // end editLearnerInfo


  ///////////////////// HANDLE INSTRUCTOR DETAILS ///////////////////////
  const goToInstructorDetail = () => {
    console.log('pairedInstructor.instructorID:', pairedInstructor.instructorID);
    history.push(`/learner/instructor/details/${pairedInstructor.instructorID}`)
  }

  ///////////////////// RENDER JSX ///////////////////////
  return (
    <div className="text-center margin-top">
      <h1>{user.first_name}, you're on your way to being F.L.U.E.N.T!</h1>
      <h2 className="streak-title">
        {streakDescription}
      </h2>

      <div className='moneda-star-container'>
        <img src={starImg} alt="star" className="star-img" />
        <div className="moneda-announcement">
          You have <br />
          <span className="moneda-number">{learner.moneda_count}</span>
          <br />
          {monedaLanguage}!
        </div>
      </div>
      <div><em>'Monedas' are coins you earn each time you submit a challenge.</em></div>

      <button type="challenge" className="btn margin-sm-top"
        onClick={() => history.push('/challenge')}>
        NEW CHALLENGE
      </button>

      <div className="btn-container-profile">
        <button type="edit" className="btn profile-btn-width"
          onClick={editLearnerInfo}>
          EDIT YOUR INFO
        </button>
        {(pairedInstructor.user_id) && (
          <button type="edit" className="btn profile-btn-width btn-space"
            onClick={goToInstructorDetail}>
            INSTRUCTOR {pairedInstructor.first_name.toUpperCase()}'S INFO
          </button>)}


        <LogOutButton className="btn profile-btn-width" />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default LearnerProfile;
