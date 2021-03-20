// Instructor's main landing page, reached by "/instructor"

import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

function InstructorProfile() {
  const dispatch = useDispatch();

  // Bring in learner's user data:
  const user = useSelector((store) => store.user);
  console.log('learner profile user:', user);

  // Bring in instructor-specific data:
  const thisInstructor = useSelector((store) => store.instructors);
  console.log('thisInstructor:', thisInstructor);

  // Request information about learners paired with instructor:


  // Control grammar depending on number of paired learners:
  let learnerCountLanguage;
  if (Number(thisInstructor.learner_count) === 1) {
    learnerCountLanguage = 'You are currently working with 1 learner.';
  }
  if (Number(thisInstructor.learner_count) === 0) {
    learnerCountLanguage = 'You are not currently paired with any learners.';
  }
  if (Number(thisInstructor.learner_count) > 1) {
    learnerCountLanguage = `You are currently working with ${thisInstructor.learner_count} learner.`;
  }

  // Open Edit information pop-up when Edit Your Info button clicked:
  const editInstructorInfo = () => {
    console.log('editInstructorInfo');
  }

  return (
    <div className="instructor-container">
      <h1>Instructor Profile</h1>

      <section className="instructor-profile"
        key={thisInstructor.id}
        value={thisInstructor.id}
      >
        <h4>Your Information:</h4>
        <div>Name: {thisInstructor.first_name} {thisInstructor.last_name}</div>
        <div>Preferred Pronouns:{thisInstructor.pronoun}</div>
        <div>Username: {user.username}</div>
        <div>Languages you can teach: {thisInstructor.languages_taught}</div>
        <img src={thisInstructor.avatar} />
        <div>Bio: </div>
        <div>{thisInstructor.bio}</div>
        <button onClick={editInstructorInfo}>
          Edit Your Information
        </button>
      </section>

      <section>
        <h4>Your learners:</h4>
        <div>{learnerCountLanguage}</div>

      </section>


      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default InstructorProfile;
