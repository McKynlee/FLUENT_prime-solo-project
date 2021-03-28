// Page to render all historical learner challenge submissions
// alongside corresponding instructor feedback
// path: '/learner/review'

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function LearnerReviewFeedback() {
  const dispatch = useDispatch();

  // Bring in logged in user's data:
  const user = useSelector((store) => store.user);
  // console.log('learner profile user:', user);
  const userId = user.id

  // Bring in learner's learner data:
  const learner = useSelector((store) => store.learner);
  // console.log('learner:', learner);


  // On page load, ask for all submissions corresponding with logged-in learner ID:
  useEffect(() => {
    dispatch({
      type: 'FETCH_LEARNER_SUBMISSIONS',
      payload: userId
    })
  }, [])


  // Bring in submission info:
  const submissionList = useSelector((store) => store.submissions);
  console.log('submissions:', submissionList);


  return (
    <div>

      <div className="text-center margin-top teal-underline">
        <h1>Review Your Submissions</h1>
      </div>

      <div className="grid-container-submissions">
        {submissionList.map((submission, i) => {

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
            <section className="grid-item-submissions"
              key={i}>

              <div className="date-submitted">
                {dayOfWeek}, {submission.month}-{submission.day}-{submission.year}
              </div>

              <div className="margin-sm-top make-flex-submissions">
                <div className="half-width">
                  <img className="img-submissions"
                    src={submission.picture_url} />
                </div>
                <div className="half-width">
                  {submission.picture_description}
                </div>
              </div>


              <div className="margin-sm-top make-flex-submissions-word">
                <div className="given-word">
                  {submission.word}
                </div>
                <div className="half-width">
                  {submission.word_sentence}
                </div>
              </div>

              <div className="margin-sm-top make-flex-submissions-q">
                <div>
                  Q & A: {submission.q_for_instructor}
                </div>
              </div>

              <button className="btn center">
                INSTRUCTOR'S RESPONSE
              </button>
              {/* DISPLAY THE FOLLOWING ONCLICK: */}
              {/* Instructor's Feedback:
                {submission.instructor_pic_response}
              {submission.instructor_word_response}
              {submission.instructor_q_response} */}



            </section>
          );

        })}
      </div>

    </div >
  )
}

export default LearnerReviewFeedback;