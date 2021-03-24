// Page to render all historical learner challenge submissions
// that are linked with the logged-in instructor
// path: '/instructor/review'

import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function InstructorReviewSubmissions() {
  const dispatch = useDispatch();
  const history = useHistory();


  /////// BRING IN ALREADY-STORED REDUCER DATA ////////
  // Bring in logged in user's data:
  const user = useSelector((store) => store.user);
  console.log('learner profile user:', user);
  const userId = user.id;

  // Bring in instructor-specific data:
  const thisInstructor = useSelector((store) => store.thisInstructor);
  console.log('instructorId submission review:', thisInstructor);

  // Bring in paired learners:  
  const learnerList = useSelector((store) => store.pairedLearners);
  // console.log('learnerList:', learnerList);


  /////////// ASK FOR ALL SUBMISSIONS LINKED TO THIS INSTRUCTOR /////////////
  // On page load, ask for all submissions corresponding with logged-in learner ID:
  useEffect(() => {
    dispatch({
      type: 'FETCH_INSTRUCTOR_SUBMISSIONS',
      payload: userId
    })
  }, [])

  // Bring in submission info:
  const submissionList = useSelector((store) => store.submissions);
  console.log('submissions:', submissionList);

  ////////////// HANDLE 'GIVE FEEDBACK' CLICK ///////////////////
  // When instructor selects 'Give Feedback' button, open submission detail view
  const giveFeedback = (submissionId) => {
    console.log('submissionId:', submissionId);

    // navigate to Give Feedback view passing submission id as param:
    history.push(`/instructor/feedback/${submissionId}`)
  }

  ////////////// HANDLE 'GIVE FEEDBACK' CLICK ///////////////////
  const deleteFeedback = (submission) => {
    const feedbackId = submission.feedback_id
    console.log('deleteFeedback:', feedbackId);

    const instructorUserId = submission.instructors_userId
    console.log('instructorUserId:', instructorUserId);

    dispatch({
      type: 'DELETE_FEEDBACK',
      payload: {
        feedbackId,
        instructorUserId
      }
    })
  } // end deleteFeedback



  //////////////////// RENDER JSX ////////////////////////
  return (
    <div>


      {/* W3 schools non-React example:
      <div class="popup" onclick={myFunction}>Click me!
        <span class="popuptext" id="myPopup">Popup text...</span>
      </div> */}



      <h1>Instructor Review Submissions</h1>
      <table className="instructor-review-table">
        <thead>
          <tr>
            <th></th>
            <th>
              When Submitted
            </th>
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
          {submissionList.map((submission, i) => {
            // Render a delete button at end of row if feedback
            // already exists
            let existingFeedback = <button
              onClick={() => giveFeedback(submission.submission_id)}>
              Give Feedback
            </button>;
            if (submission.feedback_id) {
              existingFeedback = <button className="delete-btn"
                onClick={() => deleteFeedback(submission)}>
                DELETE
                </button>
            }

            // Render learner's name next to submission row:
            let correspondingPairedLearner;
            for (let learner of learnerList) {
              if (learner.learner_id === submission.learner_id) {
                correspondingPairedLearner = learner.first_name;
              }
            }

            // Render correct Day-of-week for when submitted date:
            let dayOfWeek;
            if (submission.DOW === 0) {
              dayOfWeek = 'Sunday';
            }
            if (submission.DOW === 1) {
              dayOfWeek = 'Monday';
            }
            if (submission.DOW === 2) {
              dayOfWeek = 'Tuesday';
            }
            if (submission.DOW === 3) {
              dayOfWeek = 'Wednesday';
            }
            if (submission.DOW === 4) {
              dayOfWeek = 'Thursday';
            }
            if (submission.DOW === 5) {
              dayOfWeek = 'Friday';
            }
            if (submission.DOW === 6) {
              dayOfWeek = 'Saturday';
            }



            return (
              <>
                <tr key={i}>
                  <td>
                    {correspondingPairedLearner}'s response:
                  </td>
                  <td>
                    {dayOfWeek}, {submission.month}-{submission.day}-{submission.year}
                  </td>
                  <td rowspan="2">
                    <img src={submission.picture_url}
                      alt="randomly-generated photo for learner challenge" />
                  </td>
                  <td>{submission.picture_description}</td>
                  <td rowspan="2">{submission.word}</td>
                  <td>{submission.word_sentence}</td>
                  <td>{submission.q_for_instructor}</td>
                  <td></td>
                </tr>
                <tr className="instructor-table-feedback-row">
                  <td>
                    Your Feedback:
                  </td>
                  <td></td>
                  <td>{submission.instructor_pic_response}</td>
                  <td>{submission.instructor_word_response}</td>
                  <td>{submission.instructor_q_response}</td>
                  <td>{existingFeedback}</td>
                </tr>
              </>
            );
          })}

        </tbody>
      </table>

    </div>
  )
}

export default InstructorReviewSubmissions