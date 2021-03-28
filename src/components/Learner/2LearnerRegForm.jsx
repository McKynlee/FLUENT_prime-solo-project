// Part 2 of learner registration to select instructor: 
// reached at nav link '/learner/registration2'

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';



// Step 2 of 2 for learner to register: add instructor_id
function LearnerRegistration2() {
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();


  ////////////////////// HANDLE ERROR MESSAGE /////////////////////
  // If the registration page gives an error, send user back to home page:
  if (errors.registrationMessage) {
    history.push('/home');
  }


  ////////////////////// BRING IN USER REDUCER DATA /////////////////////
  // Bring in saved user inputs so instructor_id can be added:
  const user = useSelector(store => store.user)
  console.log('user on Learner reg:', user);


  /////// ASK FOR INSTRUCTORS WHO SPEAK TARGET LANGUAGE ////////////
  const userLanguageId = Number(user.targetLanguage);
  console.log('userLanguage:', userLanguageId);

  // On page load, GET available instructor info:
  useEffect(() => {
    dispatch({
      type: 'FETCH_INSTRUCTORS',
      payload: userLanguageId
    })
  }, []);


  ///////////////// BRING IN INSTRUCTOR REDUCER DATA ////////////////
  const instructorList = useSelector(store => store.instructors);
  console.log('instructorList:', instructorList);


  ///////////////// PAIR USER WITH SELECTED INSTRUCTOR ///////////////
  // on Click of 'Select Instructor', pair instructor_id with learner
  const onSelectInstructor = (selectedInstructor) => {
    console.log('selectedInstructor:', selectedInstructor);

    // Update learner info with selected instructor_id:
    let instructorIdToPair = selectedInstructor.instructorID;
    console.log('instructorIdToPair:', instructorIdToPair);

    user.instructor_id = instructorIdToPair;

    // Alert learner to confirm that this is their instructor choice:
    swal({
      title: `Pair with ${selectedInstructor.first_name}?`,
      text: "This will finalize your registration.",
      buttons: {
        cancel: 'Cancel',
        confirm: { text: 'Confirm', className: 'swal-btn' }
      },
    })
      .then((register) => {
        if (register) {
          // Now that info is complete, Register learner in db:
          registerUser(user);

          swal("You're all set- Welcome to F.L.U.E.N.T.!", {
            icon: "success",
          });
        }
      });
  } // end onSelectInstructor


  ////////////////////// REGISTER USER AS LEARNER /////////////////////
  const registerUser = (learner) => {
    dispatch({
      type: 'REGISTER',
      payload: learner,
    });

    // and navigate to Learner Profile page:
    history.push('/learner');
  }


  /////////////// USE INSTRUCTOR USER ID TO SHOW DETAIL VIEW //////////////
  const onMoreInfo = (selectedInstructorUserId) => {
    console.log('selectedInstructorId:', selectedInstructorUserId);

    history.push(`/learner/instructor/details/${selectedInstructorUserId}`);
  }


  ////////////////////// JSX TO RENDER /////////////////////
  return (
    <div>
      <div className="text-center margin-top">
        <h1>Choose Your Instructor:</h1>
        <h2><em>Step 2 of 2</em></h2>
        <div className="meter full">
          <span></span>
        </div>
        <p><em>*Required</em></p>
      </div>

      <div>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}


        <div className="grid-container">
          {/* LOOP THROUGH INSTRUCTOR LIST */}
          {instructorList.map((instructor) => {
            //Only render instructors whose learner_capacity is
            //greater than current learner_count
            let availableInstructors = [];

            if (instructor.learner_capacity > Number(instructor.learner_count)) {
              availableInstructors.push(instructor)
            }


            {/* LOOP THROUGH ONLY AVAILABLE INSTRUCTORS FROM INSTRUCTOR LIST */ }
            return (
              availableInstructors.map((availableInstructor, i) => {
                // Set "learnerCountDescription" based on how many learners the
                // instructor is already working with:
                let learnerCountDescription = 'learners';

                if (Number(availableInstructor.learner_count) === 1) {
                  learnerCountDescription = `${availableInstructor.first_name} 
              is currently working with ${Number(availableInstructor.learner_count)} 
              other learner`
                }
                if (Number(availableInstructor.learner_count) > 1) {
                  learnerCountDescription = `${availableInstructor.first_name} 
              is currently working with ${Number(availableInstructor.learner_count)} 
              other learners`
                }
                if (Number(availableInstructor.learner_count) === 0) {
                  learnerCountDescription = `${availableInstructor.first_name} 
              is not currently working with any other learners`
                }

                return (
                  <section className="grid-item"
                    key={i}
                    value={availableInstructor.instructorID}
                  >
                    <h4 className="instructor-name">
                      {availableInstructor.first_name} {availableInstructor.last_name}
                    </h4>
                    <div>({availableInstructor.pronoun})</div>
                    <div className="registration-avatar-container">
                      <img className="instructor-avatar-registration"
                        src={availableInstructor.avatar}
                        alt="Representative photo selected by instructor" />
                    </div>
                    <div className="text-center">
                      {learnerCountDescription}
                    </div>
                    <div className="btn-container">
                      <button type="more" className="btn btn_sizeSm"
                        onClick={() => onMoreInfo(availableInstructor.user_id)}>
                        MORE INFO
                      </button>
                      <button type="submit" className="btn btn_sizeSm"
                        onClick={() => onSelectInstructor(availableInstructor)}>
                        SELECT INSTRUCTOR
                      </button>
                    </div>
                  </section>

                )
              })
            )
          })}
        </div>


      </div>
    </div>
  );
}

export default LearnerRegistration2;