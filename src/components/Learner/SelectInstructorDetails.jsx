// Detail view of instructor details during learner registration
// linked by '/learner/instructor/details/:id'

import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function SelectInstructorDetails() {
  const history = useHistory();
  const dispatch = useDispatch();

  ///////////////////// HANDLE PASSED URL PARAM ///////////////////////
  const idParam = useParams(':id');
  const instructorIdParam = idParam.id

  console.log('idParam:', idParam);
  console.log('instructorIdParam:', instructorIdParam);


  ///////////////////// FETCH INTRUCTOR INFO ///////////////////////
  // on page load, ask for specific instructor info from reducer:
  useEffect(() => {
    dispatch({
      type: 'FETCH_THIS_INSTRUCTOR',
      payload: instructorIdParam
    });
  }, []);


  //////////////// BRING IN INFO FROM REDUCERS /////////////////////

  // Bring in specific instructor details from reducer:
  const instructorDetails = useSelector(store => store.thisInstructor);
  console.log('instructor details:', instructorDetails);

  // Bring in user info to register when they select instructor:
  const learnerInfo = useSelector(store => store.user);

  // Bring in learner info (if exists) to render different features
  // If this is an already-registered learner getting here from their profile page:
  const registeredLearner = useSelector(store => store.learner);
  console.log('selectInstructor page "learner":', registeredLearner);


  ///////////////////// HANDLE SELECT INSTRUCTOR ///////////////////////
  // on Click of 'Select Instructor', pair instructor_id with learner
  const onSelectInstructor = (selectedInstructor) => {
    console.log('selectedInstructorId:', selectedInstructor.user_id);

    // Update learner info with selected instructor_id:
    learnerInfo.instructor_id = selectedInstructor.instructorId;

    // Alert learner to confirm that this is their instructor choice:
    swal({
      title: `Pair with ${selectedInstructor.first_name}?`,
      text: "This will finalize your registration.",
      buttons: {
        // cancel: { text: 'Cancel', className: 'cancel-btn' },
        cancel: 'Cancel',
        confirm: { text: 'Confirm', className: 'swal-btn' }
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
    <div className="main-flex-container text-center margin-top">
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

        {learnerInfo.id && registeredLearner.user_id === learnerInfo.id ?
          (<button className='btn margin-top'
            onClick={() => history.push('/learner')}>
            BACK TO YOUR PROFILE
          </button>) :
          (<div className="btn-container margin-top">
            <button type="return" className='btn'
              onClick={backToList}>
              BACK TO ALL INSTRUCTORS
            </button>

            <button type="submit" className="btn"
              onClick={() => onSelectInstructor(instructorDetails)}>
              SELECT THIS INSTRUCTOR
    </button>
          </div>)}


      </div>
    </div>
  )
}

export default SelectInstructorDetails;