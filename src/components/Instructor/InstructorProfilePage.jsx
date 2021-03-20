// Instructor's main landing page, reached by "/instructor"

import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

function InstructorProfile() {
  const dispatch = useDispatch();

  // Bring in learner's user data:
  const user = useSelector((store) => store.user);
  console.log('learner profile user:', user);

  // Bring in instructor-specific data:


  // Request information about learners paired with instructor:



  // Open Edit information pop-up when Edit Your Info button clicked:
  const editInstructorInfo = () => {
    console.log('editInstructorInfo');
  }

  return (
    <div className="instructor-container">
      <h1>Instructor Profile</h1>
      {/* <h1>{user.first_name}, you're on your way to being F.L.U.E.N.T!</h1>
      <p>
        Placeholder for calculating learner submission streak
        once submissions are saving in db
      </p>
      <div className='learner-profile-moneda'>
        You have {learner.moneda_count} {monedaLanguage}!
      </div> */}

      {/* <div className="learner-profile-personal">
        <h4>Your Information:</h4>
        <p>First name: {user.first_name}</p>
        <p>Last name: {user.last_name}</p>
        <p>Preferred Pronouns: {user.pronouns}</p>
        <p>You are currently paired with XX(link to review?) learners.</p>
        <img src={pairedInstructor.avatar} alt={pairedInstructor.first_name} />
        <p>Language taught: {pairedInstructor.languages_taught}</p>
        <p>Username: {user.username}</p>
        <button onClick={editInstructorInfo}>
          Edit Your Information
        </button>
      </div> */}




      {/* <button onClick={changeInstructor}>
          Change Instructor
        </button> */}


      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default InstructorProfile;
