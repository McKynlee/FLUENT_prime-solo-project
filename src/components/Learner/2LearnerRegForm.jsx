// Part 2 of learner registration: reached at nav link '/learner/registration2'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Step 2 of 2 for learner to register: add instructor_id
function LearnerRegistration2() {
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  // On page load, GET available instructor info:
  useEffect(() => {
    dispatch({
      type: 'FETCH_INSTRUCTORS'
    })
  }, []);

  // Bring available instructors in from the store
  const instructorList = useSelector(store => store.instructors);

  // Bring in learner 1RegisterForm inputs so instructor_id can be added:
  const learnerInfoOnRegister1 = useSelector(store => store.user)
  console.log('userInfoOnRegister1:', learnerInfoOnRegister1);

  // Variable to capture selected instructor:
  const [selectedInstructor, setSelectedInstructor] = useState(0);

  // on Click of 'Select Instructor', pair instructor_id with learner
  const onSelectInstructor = () => {
    // Update learner info with selected instructor_id:
    learnerInfoOnRegister1.instructor_id = selectedInstructor;

    // Now that info is complete, Register learner in db:
    registerLearner();
  }

  const registerLearner = (event) => {
    event.preventDefault();

    // Register user with complete info
    dispatch({
      type: 'REGISTER',
      payload: learnerInfoOnRegister1,
    });
  }; // end registerUser

  return (
    <div>
      <h2>Choose Your Instructor:</h2>
      <h3><em>Step 2 of 2</em></h3>
      <p><em>*Required</em></p>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

      {instructorList.map((instructor) => {
        return (
          <section className="learner-instructor-section"
            key={instructor.id}
            value={instructor.id}
          >
            <div>{instructor.first_name} {instructor.last_name}</div>
            <div>{instructor.pronoun}</div>
            <div>{instructor.bio}</div>
            <img src={instructor.avatar} />
            <div>{instructor.first_name} is currently working with
              {instructor.learner_count} other learner(s)
            </div>
            <button>More Info</button>
            <button>Select Instructor</button>
          </section>
        )
      })}

    </div>
  );
}

export default LearnerRegistration2;