// Page to render all historical learner challenge submissions
// that are linked with the logged-in instructor
// path: '/instructor/review'

import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

function InstructorReviewSubmissions() {
  const dispatch = useDispatch();


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
  const giveFeedback = () => {
    console.log('giveFeedback');
  }


  //////////////////// RENDER JSX ////////////////////////
  return (
    <div>
      <h1>Instructor Review Submissions</h1>
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
          {submissionList.map((submission, i) => {
            let correspondingPairedLearner;


            return (
              <>
                <tr key={i}>
                  <td>
                    Learner's response:
                  </td>
                  <td rowspan="2">
                    <img src={submission.picture_url}
                      alt="randomly-generated photo for learner challenge" />
                  </td>
                  <td>{submission.picture_description}</td>
                  <td>{submission.word}</td>
                  <td>{submission.word_sentence}</td>
                  <td>{submission.q_for_instructor}</td>
                  <td>
                    <button onClick={giveFeedback}>
                      Give Feedback
                    </button>
                  </td>
                </tr>
                <tr className="learner-table-feedback-row">
                  <td>
                    Your Feedback:
                  </td>

                  <td>{submission.instructor_picture_response}</td>
                  <td></td>
                  <td>{submission.instructor_word_response}</td>
                  <td>{submission.instructor_q_response}</td>
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