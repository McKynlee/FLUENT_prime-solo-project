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
    <div className="text-center margin-top">
      <h1 className="teal-underline">{thisInstructor.first_name}, you're helping others become F.L.U.E.N.T!</h1>

      <div className="main-flex-container-column margin-top">
        <section className="instructor-profile"
          key={thisInstructor.instructorId}
          value={thisInstructor.instructorId}
        >
          <div>
            <img className="img-instructor-profile "
              src={thisInstructor.avatar} />
          </div>

          <div>
            <button type="edit" className="btn margin-sm-top"
              onClick={editInstructorInfo}>
              EDIT YOUR INFO
        </button>
          </div>
        </section>

        <div className="flex-container-column-inst-profile ">
          <section >
            <div>
              <div className="flex-container-column">
                <h4 className="teal-underline">Your learners:</h4>
                <div>{learnerCountLanguage}</div>
              </div>
              <div >

                {learnerList.map((learner, i) => {
                  if (learner.user_id) {
                    return (
                      <section key={i} className="learner-list">
                        <div className="quarter-width">
                          <div className="teal-underline ">
                            {learner.first_name} {learner.last_name}
                          </div>
                          <div>
                            ({learner.pronouns})
                          </div>
                        </div>

                        <div className="seventy-five-width ">
                          <div>
                            is learning {learner.language} and self-ranked at level {learner.skill_level} out of 5.
                        </div>
                          <div>
                            Contact {learner.first_name} at {learner.username}
                          </div>
                        </div>
                      </section>
                    )
                  }
                })}

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
