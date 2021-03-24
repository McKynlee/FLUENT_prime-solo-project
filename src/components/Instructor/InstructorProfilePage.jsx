// Instructor's main landing/profile page, reached by "/instructor"

import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function InstructorProfile() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Bring in learner's user data:
  const user = useSelector((store) => store.user);
  console.log('learner profile user:', user);

  // Bring in instructor-specific data:
  const thisInstructor = useSelector((store) => store.thisInstructor);
  console.log('thisInstructor:', thisInstructor);

  // Bring in paired learners:
  const learnerList = useSelector((store) => store.pairedLearners);
  // console.log('learnerList:', learnerList);


  // Control grammar depending on number of paired learners:
  let learnerCountLanguage;
  if (Number(thisInstructor.learner_count) === 1) {
    learnerCountLanguage = 'You are currently working with 1 learner.';
  }
  if (Number(thisInstructor.learner_count) === 0) {
    learnerCountLanguage = 'You are not currently paired with any learners.';
  }
  if (Number(thisInstructor.learner_count) > 1) {
    learnerCountLanguage = `You are currently working with ${thisInstructor.learner_count} learners.`;
  }

  // Open Edit information pop-up when Edit Your Info button clicked:
  const editInstructorInfo = () => {
    history.push('/instructor/edit')
  }

  const reviewSubmissions = () => {
    history.push('/instructor/review');
  }

  return (
    <div className="instructor-container">
      <h1>Instructor Profile</h1>

      <section className="instructor-profile"
        key={thisInstructor.instructorId}
        value={thisInstructor.instructorId}
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
        <ul>
          {learnerList.map((learner, i) => {
            return (
              <li key={i}>
                {learner.first_name} {learner.last_name}, {learner.pronouns},
              is learning {learner.language} and self-ranked at level
                {learner.skill_level} out of 5.  Contact {learner.first_name} at {learner.username}</li>
            )
          })}
        </ul>
        <button onClick={reviewSubmissions}>
          Review Your Learner's Submissions
        </button>
      </section>


      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default InstructorProfile;
