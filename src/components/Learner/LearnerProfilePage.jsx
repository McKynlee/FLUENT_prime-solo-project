// Learner's main landing page, reached by "/learner"

import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
    streakDescription = "You're 1 day into your new submission streak!"
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


  ///////////////////// RENDER JSX ///////////////////////
  return (
    <div className="container">
      <h1>{user.first_name}, you're on your way to being F.L.U.E.N.T!</h1>
      <p>
        {streakDescription}
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
        <p>Username: {user.username}</p>
        <button onClick={editLearnerInfo}>
          Edit Your Information
        </button>
      </div>

      <div className="learner-profile-personal">
        <h4>Your Instructor:</h4>
        <p>Name: {pairedInstructor.first_name}</p>
        <p>Last name: {pairedInstructor.last_name}</p>
        <p>Preferred Pronouns: {pairedInstructor.pronoun}</p>
        <p>A little about {pairedInstructor.first_name}: {pairedInstructor.bio}</p>
        <img src={pairedInstructor.avatar} alt={pairedInstructor.first_name} />
        <p>Language taught: {pairedInstructor.languages_taught}</p>
      </div>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default LearnerProfile;
