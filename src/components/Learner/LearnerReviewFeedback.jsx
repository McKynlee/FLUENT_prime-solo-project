// Page to render all historical learner challenge submissions
// alongside corresponding instructor feedback
// path: '/learner/review'

import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

function LearnerReviewFeedback() {
  const dispatch = useDispatch();

  // Bring in logged in user's data:
  const user = useSelector((store) => store.user);
  // console.log('learner profile user:', user);

  // Bring in learner's learner data:
  const learner = useSelector((store) => store.learner);
  // console.log('learner:', learner);
  const learnerId = learner.id

  // On page load, ask for all submissions corresponding with logged-in learner ID:
  useEffect(() => {
    dispatch({
      type: 'FETCH_LEARNER_SUBMISSIONS',
      payload: learnerId
    })
  }, [])


  // Bring in submission info:
  const submissionList = useSelector((store) => store.submissions);
  console.log('submissions:', submissionList);


  return (
    <div>
      <h1>Learner Review Feedback</h1>
      <table className="learner-review-table">
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
          </tr>
        </thead>
        <tbody>
          {submissionList.map((submission) => {
            return (
              <>
                <tr>
                  <td>
                    Your response:
                  </td>
                  <td>{submission.picture_url}</td>
                  <td>{submission.picture_description}</td>
                  <td>{submission.word}</td>
                  <td>{submission.word_sentence}</td>
                  <td>{submission.q_for_instructor}</td>
                </tr>
                <tr className="learner-table-feedback-row">
                  <td>
                    Instructor's Feedback:
                  </td>
                  <td></td>
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

export default LearnerReviewFeedback