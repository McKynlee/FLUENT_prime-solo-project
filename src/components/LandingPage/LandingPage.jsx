import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS:
// import './LandingPage.css';
import img from '../images/fluent-logo.png';

function LandingPage() {
  const history = useHistory();

  const learnerRegistration = () => {
    history.push('/learner/registration');
  }

  const instructorRegistration = () => {
    history.push('/instructor/registration');
  }

  const userLogin = () => {
    history.push('/login');
  }

  return (
    <div className="text-center hero-img">
      <div className="hero-text"></div>
      <h1><em>Welcome to the </em><br />
        Foreign Language Universal Engagement Tool
      </h1>
      <img className="landing-logo"
        src={img} alt="FLUENT logo" />
      <h2>A personalized way to practice a foreign language!</h2>
      <button type="login"
        className="btn margin-btm"
        onClick={userLogin}
      >
        Login
        </button>
      <div>
        Or Register to:
      </div>

      <div className="main-flex-container">
        <div className="sub-container-left">
          <button className="btn"
            onClick={learnerRegistration}
          >
            Become a Learner:
        </button>
          <ol>
            <li>
              We get to know you.
          </li>
            <li>
              Complete challenges <br />& earn points!
          </li>
            <li>
              Receive tailored feedback.
          </li>
          </ol>
          <button type="popup" className="btn_asLink">
            <em>Watch the demo here</em>
          </button>
        </div>

        <div className="sub-container-right">
          <button className="btn"
            onClick={instructorRegistration}>
            Become an Instructor:
        </button>
          <ol>
            <li>
              Tell learners who you are.
          </li>
            <li>
              We protect your <br />availability.
            </li>

            <li>
              Share your expertise!
          </li>
          </ol>
          <button type="popup" className="btn_asLink">
            <em>Watch the demo here</em>
          </button>
        </div>

      </div>


    </div>
  );
}

export default LandingPage;
