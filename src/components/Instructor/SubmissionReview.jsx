// Page to render all historical learner challenge submissions
// that are linked with the logged-in instructor
// path: '/instructor/review'

import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

function InstructorReviewSubmissions() {
  const dispatch = useDispatch();

  // Bring in logged in user's data:
  const user = useSelector((store) => store.user);
  // console.log('learner profile user:', user);

  // Bring in instructor-specific data:


  // On page load, ask for all submissions corresponding with logged-in learner ID:
  // useEffect(() => {
  //   dispatch({
  //     type: 'FETCH_INSTRUCTOR_SUBMISSIONS',
  //     payload: instructorId
  //   })
  // }, [])


  // Bring in submission info:
  const submissionList = useSelector((store) => store.submissions);
  console.log('submissions:', submissionList);


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

export default InstructorReviewSubmissions