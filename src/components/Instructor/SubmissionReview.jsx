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

      <div className="text-center margin-top teal-underline">
        <h1>Review Learner Submissions</h1>
      </div>

      <div className="">
        {submissionList.map((submission, i) => {

          // Render learner's name next to submission row:
          let correspondingLearnerName;
          let correspondingLearnerPronoun;
          let correspondingLearnerSkill;

          for (let learner of learnerList) {
            if (learner.learner_id === submission.learner_id) {
              correspondingLearnerName = learner.first_name;
              correspondingLearnerPronoun = learner.pronouns;
              correspondingLearnerSkill = learner.skill_level;
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
            <section className="make-flex-column"
              key={i}>
              <div className="main-feedback-container">
                <div className="make-flex-feedback-header">
                  <div className="learner-response">

                    <div className="learner-name-response">
                      <span className="teal-underline">
                        {correspondingLearnerName}'s
                        </span>
                        response:
                    </div>

                    <div className="tiny-margin">({correspondingLearnerPronoun})</div>
                    <div>Self-assessed skill level: {correspondingLearnerSkill}</div>
                  </div>

                  <div className="date-submitted">
                    {dayOfWeek}, {submission.month}-{submission.day}-{submission.year}
                  </div>
                </div>


                <div className="instructor-review-submissions-container">
                  <div className="half-width tiny-top-margin">
                    <div className="margin-sm-top make-flex-feedback">
                      <div className="half-width">
                        <img className="img-submissions"
                          src={submission.picture_url}
                          alt="randomly-generated photo for learner challenge" />
                      </div>
                      <div className="half-width">
                        {submission.picture_description}
                      </div>
                    </div>

                    <div className="margin-sm-top make-flex-feedback-word">
                      <div className="given-word">
                        {submission.word}
                      </div>
                      <div className="half-width">
                        {submission.word_sentence}
                      </div>
                    </div>

                    <div className="margin-sm-top make-flex-feedback-q">
                      <div className="half-width">
                        Question:
                  </div>
                      <div className="half-width">
                        {submission.q_for_instructor}
                      </div>
                    </div>
                  </div>


                  <div class="instructor-response">
                    <div>
                      Your Feedback:
                    </div>

                    <div className="feedback photo-feedback">
                      <div className="quarter-width">Photo:</div>
                      <div className="seventy-five-width">
                        {submission.instructor_pic_response}
                      </div>
                    </div>
                    <div className="feedback word-feedback">
                      <div className="quarter-width">
                        Word:
                  </div>
                      <div className="seventy-five-width">
                        {submission.instructor_word_response}
                      </div>
                    </div>
                    <div className="feedback answer-feedback">
                      <div className="quarter-width">Answer:</div>
                      <div className="seventy-five-width">
                        {submission.instructor_q_response}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="feedback-btn-container">
                  {submission.feedback_id ?
                    (<button className="delete-btn"
                      onClick={() => deleteFeedback(submission)}>
                      DELETE YOUR FEEDBACK
                    </button>) : (<button className="btn-navy-gray-feedback"
                      onClick={() => giveFeedback(submission.submission_id)}>
                      GIVE FEEDBACK
                    </button>)}
                </div>
              </div>
            </section>
          );
        })}
      </div>

    </div >
  )
}

export default InstructorReviewSubmissions