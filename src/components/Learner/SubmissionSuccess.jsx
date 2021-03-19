// Celebratory page to confirm learner's challenge has been submitted
// '/success'

import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';

function SubmissionSuccess() {
  return (
    <div>
      <h1>Success!</h1>
    </div>
  )
} // end submissionSuccess

export default SubmissionSuccess;