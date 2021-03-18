// Part 2 of learner registration: reached at nav link '/learner/registration2'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';



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
  const onSelectInstructor = (selectedInstructor) => {
    console.log('selectedInstructorId:', selectedInstructor);

    // Update learner info with selected instructor_id:
    learnerInfoOnRegister1.instructor_id = Number(selectedInstructor.id);

    // Alert learner to confirm that this is their instructor choice:
    swal({
      title: `Pair with ${selectedInstructor.first_name}?`,
      text: "This will finalize your registration.",
      buttons: true,
      dangerMode: true,
    })
      .then((register) => {
        if (register) {
          // Now that info is complete, Register learner in db:
          registerUser(learnerInfoOnRegister1);

          swal("You're all set- Welcome to F.L.U.E.N.T.!", {
            icon: "success",
          });
        }
      });



  }

  const registerUser = () => {
    dispatch({
      type: 'REGISTER',
      payload: learnerInfoOnRegister1,
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
                <button onClick={() => onSelectInstructor(availableInstructor)}>
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