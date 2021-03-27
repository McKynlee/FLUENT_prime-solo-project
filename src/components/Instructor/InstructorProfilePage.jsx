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
    <div className="text-center">
      <h1>{thisInstructor.first_name}, you're helping others become F.L.U.E.N.T!</h1>

      <div className="main-flex-container margin-top">
        <section className="instructor-profile"
          key={thisInstructor.instructorId}
          value={thisInstructor.instructorId}
        >
          <div className="sub-container-left make-flex ">
            <h3 className="teal-underline">Your Information:</h3>
            <div><span className="teal-underline">Name:</span> {thisInstructor.first_name} {thisInstructor.last_name}</div>
            <div><span className="teal-underline">Preferred Pronouns:</span>{thisInstructor.pronoun}</div>
            <div><span className="teal-underline">Username:</span> {user.username}</div>
            <div><span className="teal-underline">Languages you can teach:</span> {thisInstructor.languages_taught}</div>

            <div><span className="teal-underline">Bio:</span> </div>
            <div>{thisInstructor.bio}</div>

            <img className="detail-avatar"
              src={thisInstructor.avatar} />
          </div>

          <button type="edit" className="btn margin-sm-top"
            onClick={editInstructorInfo}>
            EDIT YOUR INFO
        </button>
        </section>

        <div >

          <section className="flex-container-column  align-space-around">
            <div className="sub-container-top">
              <div className="flex-container-column">
                <h4 className="teal-underline">Your learners:</h4>
                <div>{learnerCountLanguage}</div>
              </div>
              <div className="learner-list">
                <ul>
                  {learnerList.map((learner, i) => {
                    if (learner.user_id) {
                      return (
                        <li key={i}>
                          <span className="teal-underline">{learner.first_name} {learner.last_name}</span>, {learner.pronouns},
              is learning {learner.language} and self-ranked at level
                          {learner.skill_level} out of 5.  Contact {learner.first_name} at {learner.username}</li>
                      )
                    }
                  })}
                </ul>
              </div>

              <div>
                {(Number(thisInstructor.learner_count) > 0) ?
                  <button className="btn"
                    onClick={reviewSubmissions}>
                    REVIEW SUBMISSIONS
          </button>
                  : <></>}
              </div>
            </div>
          </section>

        </div>
      </div>
      {/* <LogOutButton className="btn" /> */}
    </div >
  );
}

// this allows us to use <App /> in index.js
export default InstructorProfile;
