// Page to render all historical learner challenge submissions
// alongside corresponding instructor feedback
// path: '/learner/review'

import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

function LearnerReviewFeedback() {
  const dispatch = useDispatch();

  // Bring in logged in user's data:
  const user = useSelector((store) => store.user);
  console.log('learner profile user:', user);

  // Ask for corresponding instructor info


  return (
    <div>
      <h1>Learner Review Feedback</h1>
      <LogOutButton className="btn" />
    </div>
  )
}

export default LearnerReviewFeedback