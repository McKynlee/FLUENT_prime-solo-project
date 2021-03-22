// Page to render specific click-on learner challenge submission
// so the instructor may leave corresponding feedback
// path: '/instructor/feedback'

import React, { useEffect, useState } from 'react';
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
  const submissionDetails = useSelector(store => store.thisSubmission);
  // console.log('submission details:', submissionDetails);


  /////// BRING IN ALREADY-STORED REDUCER DATA ////////
  // Bring in logged-in user's data:
  const user = useSelector((store) => store.user);
  console.log('give feedback "user":', user);
  const userId = user.id;

  // Bring in instructor-specific data:
  const thisInstructor = useSelector((store) => store.thisInstructor);
  console.log('instructorId give feedback:', thisInstructor);


  /////// CREATE VARIABLE TO HOLD INPUT DATA ////////
  const [picDescription, setPicDescription] = useState('');
  const [wordSentence, setWordSentence] = useState('');
  const [answerToQ, setAnswerToQ] = useState('');

  console.log('picDescription:', picDescription);
  console.log('wordSentence:', wordSentence);
  console.log('answerToQ:', answerToQ);

  /////// HANDLE SUBMIT FEEDBACK ////////
  // on Click of 'Submit Feedback', pair instructor feedback
  // with learner submission
  const onSubmitFeedback = () => {
    console.log(':',);

    // Update this submission info with instructor's feedback:
    // submissionDetails.instructor_pic_response = ;
    // submissionDetails.instructor_q_response = ;
    // submissionDetails.instructor_word_response = ;


    // Alert instructor to confirm that they are ready to share feedback with learner:
    swal({
      title: `Submit feedback?`,
      text: "This will share your feedback with the learner.",
      buttons: true,
    })
      .then((submit) => {
        if (submit) {
          // Now that info is complete, send feedback to db:
          submitFeedback(submissionDetails);

          swal("Your feedback has been shared!", {
            icon: "success",
          });
        }
      });
  }; //end onSubmitFeedback


  //////////////////// RENDER JSX ////////////////////////
  return (
    <div>
      <h1>Give Feedback to your Learner</h1>
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
              <td rowspan="2">
                <img src={submissionDetails.picture_url}
                  alt="randomly-generated photo for learner challenge" />
              </td>
              <td>{submissionDetails.picture_description}</td>
              <td rowspan="2">{submissionDetails.word}</td>
              <td>{submissionDetails.word_sentence}</td>
              <td>{submissionDetails.q_for_instructor}</td>
              <td></td>
            </tr>
            <tr className="instructor-table-feedback-row">
              <td>
                Your Feedback:
              </td>
              <td><textarea value={submissionDetails.picture_description}
                onChange={(event) => setPicDescription(event.target.value)}
              ></textarea></td>
              <td><textarea value={submissionDetails.word_sentence}></textarea></td>
              <td><textarea value={submissionDetails.q_for_instructor}></textarea></td>
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