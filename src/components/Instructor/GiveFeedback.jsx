// Page to render specific click-on learner challenge submission
// so the instructor may leave corresponding feedback
// path: '/instructor/feedback'

import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function InstructorGiveFeedback() {
  const dispatch = useDispatch();
  const history = useHistory();

  /////////// ASK FOR ALL DETAILS LINKED TO THIS SUBMISSION /////////////
  // use submission_id passed as param to fetch submission details:
  const idParam = useParams(':id');
  const submissionId = idParam.id

  console.log('idParam:', idParam);
  console.log('submissionIdParam:', submissionId);

  useEffect(() => {
    dispatch({
      type: 'FETCH_THIS_SUBMISSION',
      payload: submissionId
    })
  }, [])

  // Bring in specific submission details from reducer:
  // const submissionDetails = useSelector(store => store.thisSubmission);
  // console.log('submission details:', submissionDetails);


  /////// BRING IN ALREADY-STORED REDUCER DATA ////////
  // Bring in logged in user's data:
  const user = useSelector((store) => store.user);
  console.log('give feedback "user":', user);
  const userId = user.id;

  // Bring in instructor-specific data:
  const thisInstructor = useSelector((store) => store.thisInstructor);
  console.log('instructorId give feedback:', thisInstructor);

  // Bring in paired learners:  
  const learnerList = useSelector((store) => store.pairedLearners);
  console.log('learnerList:', learnerList);




  // on Click of 'Submit Feedback', pair instructor feedback
  // with learner submission
  const onSubmitFeedback = () => {
    console.log(':',);

    // Update this submission info with instructor's feedback:
    // thisSubmission.instructor_pic_response = ;
    // thisSubmission.instructor_q_response = ;
    // thisSubmission.instructor_word_response = ;


    // Alert learner to confirm that this is their instructor choice:
    swal({
      title: `Pair with ${selectedInstructor.first_name}?`,
      text: "This will finalize your registration.",
      buttons: true,
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


  //////////////////// RENDER JSX ////////////////////////

  // Bring in submission info:
  const submissionList = useSelector((store) => store.submissions);
  console.log('submissions:', submissionList);


  //////////////////// RENDER JSX ////////////////////////
  return (
    <div>
      <h1>Instructor Review Submissions</h1>
      <form onSubmit={onSubmitFeedback}>
        <table className="instructor-review-table">
          <thead>
            <tr>
              <th></th>
              <th>
                Given Image
            </th>
              <th>
                Image Description
            </th>
              <th>
                Given Word
            </th>
              <th>
                Sentence with Word
            </th>
              <th>
                Q & A
            </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                LearnerName's response:
                  </td>
              {/* <td rowspan="2">
                    <img src={submission.picture_url}
                      alt="randomly-generated photo for learner challenge" />
                  </td>
                  <td><input value={thisSubmission.picture_description} /></td>
                  <td>{submission.word}</td>
                  <td>{submission.word_sentence}</td>
                  <td>{submission.q_for_instructor}</td> */}
              <td>
              </td>
            </tr>
            <tr className="instructor-table-feedback-row">
              <td>
                Your Feedback:
                  </td>

              {/* <td>{submission.instructor_picture_response}</td>
                  <td></td>
                  <td>{submission.instructor_word_response}</td>
                  <td>{submission.instructor_q_response}</td>
                  <td></td> */}
              <td>
                <button>
                  Submit Feedback
                    </button>
              </td>
            </tr>

          </tbody>
        </table>
      </form>
    </div>
  )
}

export default InstructorGiveFeedback