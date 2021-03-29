// Page to render all historical learner challenge submissions
// alongside corresponding instructor feedback
// path: '/learner/review'

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function LearnerReviewFeedback() {
  const dispatch = useDispatch();


  ////////////////// BRING IN DATA FROM REDUCERS ////////////////////
  // Bring in logged in user's data:
  const user = useSelector((store) => store.user);
  // console.log('learner profile user:', user);
  const userId = user.id

  // Bring in learner's learner data:
  const learner = useSelector((store) => store.learner);
  // console.log('learner:', learner);


  ////////////////// GET CHALLENGE SUBMISSIONS ////////////////////
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


  ////////////////// VARIABLE FOR TOGGLING FEEDBACK ////////////////////
  const [showResponse, setShowResponse] = useState(true);

  ////////////////// RENDER JSX ////////////////////
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


          /////// HANDLE INSTRUCTOR RESPONSE TOGGLE ////////////
          //add boolean value to individual submission object:

          const toggleResponse = (clickedEvent) => {
            console.log('toggleResponse clickedEvent:', clickedEvent);
            console.log('submission with responseShowing?', submission);

            if (submission.submission_id === Number(clickedEvent)) {
              submission.response_showing = showResponse;
            }
            setShowResponse(!showResponse);
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
                    src={submission.picture_url}
                    alt="randomly-generated photo for learner challenge" />
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
                <div className="half-width">
                  Question:
                  </div>
                <div className="half-width">
                  {submission.q_for_instructor}
                </div>
              </div>

              <button value={submission.submission_id}
                onClick={(event) => toggleResponse(event.target.value)}
                className="btn center add-margin">
                INSTRUCTOR'S RESPONSE
              </button>

              {/* TOGGLE THE FOLLOWING ONCLICK: */}

              {submission.response_showing && (
                <div className="instructor-response">
                  <div className="feedback">
                    <div className="half-width">Photo:</div>
                    <div className="half-width">
                      {submission.instructor_pic_response}
                    </div>
                  </div>
                  <div className="feedback">
                    <div className="half-width">Word:</div>
                    <div className="half-width">{submission.instructor_word_response}</div>
                  </div>
                  <div className="feedback">
                    <div className="half-width">Answer:</div>
                    <div className="half-width">
                      {submission.instructor_q_response}
                    </div>
                  </div>
                </div>
              )}



            </section>
          );

        })}
      </div>

    </div >
  )
}

export default LearnerReviewFeedback;