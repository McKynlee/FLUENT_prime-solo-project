// Part 2 of learner registration: reached at nav link '/learner/registration2'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Step 2 of 2 for learner to register: add instructor_id
function LearnerRegistration2() {
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

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
  console.log('learnerInfoOnRegister1:', learnerInfoOnRegister1);


  // on Click of 'Select Instructor', pair instructor_id with learner
  const onSelectInstructor = (selectedInstructorId) => {
    console.log('selectedInstructorId:', selectedInstructorId);
    // Update learner info with selected instructor_id:
    learnerInfoOnRegister1.instructor_id = Number(selectedInstructorId);
    console.log('learner complete info:', learnerInfoOnRegister1);
    // Now that info is complete, Register learner in db:
    registerUser(learnerInfoOnRegister1);
  }

  const registerUser = (learner) => {
    dispatch({
      type: 'REGISTER',
      payload: learner,
    });

    // and navigate to Learner Profile page:
    history.push('/learner');
  }


  const onMoreInfo = (selectedInstructorId) => {
    console.log('selectedInstructorId:', selectedInstructorId);

    history.push(`/learner/instructor/details/${selectedInstructorId}`);
  }

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
        //Only render instructors whose learner_capacity is
        //greater than current learner_count
        let availableInstructors = [];

        if (instructor.learner_capacity > Number(instructor.learner_count)) {
          availableInstructors.push(instructor)
        }
        return (
          availableInstructors.map((availableInstructor) => {
            // Set "learnerLanguage" based on how many learners the
            // instructor is working with:
            let learnerLanguage = 'learners';

            if (Number(availableInstructor.learner_count) === 1) {
              learnerLanguage = `${availableInstructor.first_name} 
              is currently working with ${availableInstructor.learner_count} 
              other learner`
            }
            if (availableInstructor.learner_count > 1) {
              learnerLanguage = `${availableInstructor.first_name} 
              is currently working with ${availableInstructor.learner_count} 
              other learners`
            }
            if (Number(availableInstructor.learner_count) === 0) {
              learnerLanguage = `${availableInstructor.first_name} 
              is not currently working with any other learners`
            }

            return (
              <section className="learner-instructor-section"
                key={availableInstructor.id}
                value={availableInstructor.id}
              >
                <div>{availableInstructor.first_name} {availableInstructor.last_name}</div>
                <div>{availableInstructor.pronoun}</div>
                <div>{availableInstructor.bio}</div>
                <img src={availableInstructor.avatar} />
                <div>{learnerLanguage}</div>
                <button onClick={() => onMoreInfo(availableInstructor.id)}>
                  More Info
                </button>
                <button onClick={() => onSelectInstructor(availableInstructor.id)}>
                  Select Instructor
                </button>
              </section>

            )
          })
        )
      })}

    </div>
  );
}

export default LearnerRegistration2;