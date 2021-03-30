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

    // Update this submission info with instructor's inputs:
    submissionDetails.instructor_pic_response = picDescription;
    submissionDetails.instructor_q_response = answerToQ;
    submissionDetails.instructor_word_response = wordSentence;


    // Alert instructor to confirm that they are ready to share feedback with learner:
    swal({
      title: `Submit feedback?`,
      text: "This will share your feedback with the learner.",
      buttons: {
        cancel: 'Cancel',
        confirm: { text: 'Confirm', className: 'swal-btn' }
      },
    })
      .then((submit) => {
        if (submit) {
          // Now that info is complete, send feedback to db:
          saveFeedback(submissionDetails);

          swal("Your feedback has been shared!", {
            icon: "success",
          });
        }
      });
  }; //end onSubmitFeedback

  const saveFeedback = (feedback) => {
    dispatch({
      type: 'CREATE_FEEDBACK',
      payload: feedback,
    });

    // and navigate to Instructor's review page:
    history.push('/instructor/review');
  }

  // Go back to full list of available instructors
  const onCancel = () => {

    // Alert instructor to confirm that they are ready to share feedback with learner:
    swal({
      title: 'Lose your feedback and go back?',
      text: "This will delete any edits you made.",
      icon: "warning",
      buttons: {
        cancel: 'Cancel',
        confirm: { text: 'Confirm', className: 'swal-delete-btn' }
      },
      dangerMode: true,
    })
      .then((cancel) => {
        if (cancel) {
          history.push('/instructor/review');
        }
      });
  }

  ////////// MANAGE AUTOFILL FOR DEMO PRESENTATION ///////////////
  // const autoFill = () => {
  //   setPicDescription('A complete sentence might be: Yo veo un perrito negra en la foto.');
  //   setWordSentence('This is a tough one- ver is conjugated as "veo" for the "yo" tense: "Digo, "hola" cada vez que veo a mis amigos".');
  //   setAnswerToQ('Absolutely! The informal "tu" is used to speak to people with whom you are intimately friendly, or who are younger/less experienced than you are in general. The formal "Usted" is a safer default to use, as if conveys respect for the person with whom you are speaking.');
  // }

  //////////////////// RENDER JSX ////////////////////////
  return (
    <div>
      <div className="text-center margin-top teal-underline">
        <h1>Give Feedback</h1>
      </div>

      <div>
        <section
          // onClick={autoFill}
          className="make-flex-column">
          <div className="main-feedback-container">
            <div className="make-flex-feedback-header">
              <div className="learner-response">

                <div className="learner-name-response">
                  Learner's response:
                </div>



                <div className="instructor-review-submissions-container">
                  <div className=" tiny-top-margin">
                    <div className="margin-sm-top make-flex-feedback">
                      <div className="half-width">
                        <img className="img-submissions"
                          src={submissionDetails.picture_url}
                          alt="randomly-generated photo for learner challenge" />
                      </div>
                      <div className="half-width">
                        {submissionDetails.picture_description}
                      </div>
                    </div>

                    <div className="margin-sm-top make-flex-feedback-word">
                      <div className="given-word">
                        {submissionDetails.word}
                      </div>
                      <div className="half-width">
                        {submissionDetails.word_sentence}
                      </div>
                    </div>

                    <div className="margin-sm-top make-flex-feedback-q">
                      <div className="half-width">
                        Question:
                  </div>
                      <div className="half-width">
                        {submissionDetails.q_for_instructor}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="instructor-response-give">
                <div>
                  Your Feedback:
                    </div>

                <div className="feedback photo-feedback">
                  <div className="quarter-width">Photo:</div>
                  <div className="seventy-five-width">
                    <textarea className="give-feedback-textarea-photo"
                      value={picDescription}
                      onChange={(event) => setPicDescription(event.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="feedback word-feedback">
                  <div className="quarter-width">
                    Word:
                  </div>
                  <div className="seventy-five-width">
                    <textarea className="give-feedback-textarea-word"
                      value={wordSentence}
                      onChange={(event) => setWordSentence(event.target.value)}>
                    </textarea>
                  </div>
                </div>
                <div className="feedback answer-feedback-give">
                  <div className="quarter-width">Answer:</div>
                  <div className="seventy-five-width">
                    <textarea className="give-feedback-textarea-answer"
                      value={answerToQ}
                      onChange={(event) => setAnswerToQ(event.target.value)}
                    >
                    </textarea>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="feedback-give-btn-container">

        <button className="btn-navy-gray feedback-give-btn"
          onClick={onCancel}>
          GO BACK
      </button>

        <button onClick={onSubmitFeedback}
          className="btn-navy-gray feedback-give-btn">
          SUBMIT FEEDBACK
        </button>

      </div>

    </div>
  )
}

export default InstructorGiveFeedback