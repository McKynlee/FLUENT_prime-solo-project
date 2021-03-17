import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import img from '../images/fluent-logo.png';

// CUSTOM COMPONENTS
import RegisterForm from '../Learner/1RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to');
  const history = useHistory();

  const learnerRegistration = () => {
    history.push('/learner/registration');
  }

  const instructorRegistration = () => {
    history.push('/instructor/registration');
  }

  return (
    <div className="container">
      <h2>{heading}</h2>
      <img className="landing-logo" src={img} />
      <h3>Foreign Language Universal Engagement Tool</h3>
      <h4>A personalized way to practice a foreign language!</h4>

      <h4>Register to either:</h4>

      <div className="landing-learner">
        <button onClick={learnerRegistration}
        >
          Become a Learner:
        </button>

        <p>1. Tell us about so so that we
          tailor your learning experience.</p>
        <p>2. Complete languages to enhance your
            reading, listening, speaking and writing abilities. </p>
        <p>3. Pair with an instructor and receive
           feedback to take your skills to the next level!</p>
        <p><em>Watch the demo here</em></p>
      </div>

      <div className="landing-instructor">
        <button onClick={instructorRegistration}>
          Become an Instructor:
        </button>
        <p>1. Create a bio so learners can know
        who you are.
        </p>
        <p>2. Set limit on how many learners you would like to work with. </p>
        <p>3. Pair with a learners and give them real-world language
          advice to help them grow!</p>
        <p><em>Watch the demo here</em></p>
      </div>
    </div>
  );
}

export default LandingPage;
