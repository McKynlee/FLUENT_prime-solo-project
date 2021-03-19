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
      type: 'FETCH_SUBMISSIONS',
      payload: learnerId
    })
  }, [])


  // Bring in submission info:
  const submissionList = useSelector((store) => store.submissions);
  console.log('submissions:', submissionList);


  return (
    <div>
      <h1>Learner Review Feedback</h1>
      <LogOutButton className="btn" />
    </div>
  )
}

export default LearnerReviewFeedback