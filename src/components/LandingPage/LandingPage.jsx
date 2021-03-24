import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import img from '../images/fluent-logo.png';

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
    <div className="landing-container">
      <h1>{heading}</h1>
      <img className="landing-logo" src={img} alt="FLUENT logo" />
      <h3>Foreign Language Universal Engagement Tool</h3>
      <h4>A personalized way to practice a foreign language!</h4>

      <h4>Register to either:</h4>

      <div className="landing-user-description-container">
        <div className="landing-learner">
          <button onClick={learnerRegistration}
          >
            Become a Learner:
        </button>
          <ol>
            <li>
              We get to know you.
          </li>
            <li>
              Complete challenges & earn points!
          </li>
            <li>
              Receive tailored feedback!
          </li>
          </ol>
          <p><em>Watch the demo here</em></p>
        </div>

        <div className="landing-instructor">
          <button onClick={instructorRegistration}>
            Become an Instructor:
        </button>
          <ol>
            <li>
              Tell learners who you are.
          </li>
            <li>
              We protect your availability.
          </li>
            <li>
              Share your expertise!
          </li>
          </ol>
          <p><em>Watch the demo here</em></p>
        </div>

      </div>


    </div>
  );
}

export default LandingPage;
