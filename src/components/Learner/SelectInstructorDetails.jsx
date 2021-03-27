// Detail view of instructor details during learner registration
// linked by '/learner/instructor/details/:id'

import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function SelectInstructorDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const idParam = useParams(':id');
  const instructorIdParam = idParam.id

  console.log('idParam:', idParam);
  console.log('instructorIdParam:', instructorIdParam);

  // on page load, ask for specific instructor info from reducer:
  useEffect(() => {
    dispatch({
      type: 'FETCH_THIS_INSTRUCTOR',
      payload: instructorIdParam
    });
  }, []);

  // Bring in specific instructor details from reducer:
  const instructorDetails = useSelector(store => store.thisInstructor);
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
      buttons: {
        cancel: 'Cancel',
        confirm: { text: 'Confirm', className: 'btn' }
      },
    })
      .then((register) => {
        if (register) {
          // Now that info is complete, Register learner in db:
          registerUser(learnerInfo);

          swal("You're all set- Welcome to F.L.U.E.N.T.!", {
            // button: { confirm: { className: 'btn' } },
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
    <div className="main-flex-container text-center">
      <div className="detail-card">
        <h1 className="teal-underline">Instructor Details</h1>

        <section
          key={instructorDetails.instructorID}
          value={instructorDetails.instructorID}
        >
          <div className="instructor-name-container">
            <h2>
              {instructorDetails.first_name} {instructorDetails.last_name}
              <div className="pronouns">
                ({instructorDetails.pronoun})
              </div>
            </h2>
          </div>

          <img className="detail-avatar"
            src={instructorDetails.avatar}
            alt="Self-representative photo selected by instructor." />
          <h3 className="teal-underline">
            A little about {instructorDetails.first_name}:
          </h3>
          <div>{instructorDetails.bio}</div>
        </section>

        <div className="btn-container margin-top">
          <button type="return" className='btn'
            onClick={backToList}>
            Back to All Instructors
        </button>

          <button type="submit" className="btn"
            onClick={() => onSelectInstructor(instructorDetails)}>
            Select this Instructor
      </button>
        </div>

      </div>
    </div>
  )
}

export default SelectInstructorDetails;