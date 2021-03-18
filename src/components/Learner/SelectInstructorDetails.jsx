// Detail view of instructor details during learner registration
// linked by '/learner/instructor/details/:id'

import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function SelectInstructorDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const instructorIdParam = useParams(':id');

  console.log('instructorIdParam:', instructorIdParam);

  // on page load, ask for specific instructor info from reducer:
  useEffect(() => {
    dispatch({
      type: 'SELECT_INSTRUCTOR',
      payload: instructorIdParam
    });
  }, []);

  // Bring in specific instructor details from reducer:
  const instructorDetails = useSelector(store => store.instructors[0]);
  console.log('instructor details:', instructorDetails);

  // Bring in learner info to register them if they select instructor:
  const learnerInfo = useSelector(store => store.user);


  // on Click of 'Select Instructor', pair instructor_id with learner
  const onSelectInstructor = (selectedInstructor) => {
    console.log('selectedInstructorId:', selectedInstructor);

    // Update learner info with selected instructor_id:
    learnerInfo.instructor_id = Number(selectedInstructor.id);

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
          registerUser(learnerInfo);

          swal("You're all set- Welcome to F.L.U.E.N.T.!", {
            icon: "success",
          });
        }
      });
  }

  const registerUser = (learnerDetails) => {
    dispatch({
      type: 'REGISTER',
      payload: learnerDetails,
    });

    // and navigate to Learner Profile page:
    history.push('/learner');
  }

  // Go back to full list of available instructors
  const backToList = () => {
    history.push('/learner/registration2');
  }


  return (
    <div>
      <h1>Instructor Details</h1>

      <section className="select-instructor-details"
        key={instructorDetails.id}
        value={instructorDetails.id}
      >
        <div>{instructorDetails.first_name} {instructorDetails.last_name}</div>
        <div>{instructorDetails.pronoun}</div>
        <img src={instructorDetails.avatar} />
        <h4>A little bit about </h4>
        <div>{instructorDetails.bio}</div>
      </section>

      <button onClick={() => onSelectInstructor(instructorDetails)}>
        Select this Instructor
      </button>
      <button onClick={backToList}>
        Back to Available Instructors
      </button>
    </div>
  )
}

export default SelectInstructorDetails;