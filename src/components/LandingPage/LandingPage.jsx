import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// CUSTOM COMPONENTS:
// import './LandingPage.css';
import img from '../images/fluent-logo.png';

function LandingPage() {
  const history = useHistory();

  // Bring in any existing errors from errors reducer:
  const errors = useSelector((store) => store.errors);

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
    <div className="text-center">
      <div className="hero-img">
        <div className="hero-text">
          <h1><em>Welcome to the </em><br />
        Foreign Language Universal Engagement Tool
      </h1>
          <img className="landing-logo"
            src={img} alt="FLUENT logo" />
          <h2>A personalized way to practice a foreign language!</h2>
        </div>
      </div>
      <button type="login"
        className="btn margin-btm"
        onClick={userLogin}
      >
        LOGIN
        </button>
      <div className="margin-sm-top">
        Or Register to:
      </div>

      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

      <div className="main-flex-container">
        <div className="sub-container-left">
          <button className="btn"
            onClick={learnerRegistration}
          >
            BECOME A LEARNER
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

          <div>
            <div>Watch the demo here</div>
            <div className="vimeo-video-container">
              <iframe
                src="https://player.vimeo.com/video/545281292?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                className="vimeo-video"
                allowfullscreen title="learnerPath.mp4">
              </iframe>
            </div>
            <script src="https://player.vimeo.com/api/player.js">
            </script>

          </div>
        </div>

        <div className="sub-container-right">
          <button className="btn"
            onClick={instructorRegistration}>
            BECOME AN INSTRUCTOR
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

          <div>
            <div>Watch the demo here</div>
            <div className="vimeo-video-container">
              <iframe
                src="https://player.vimeo.com/video/545281367?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                frameborder="0"
                title="instructorPath.mp4"
                allow="autoplay; fullscreen; picture-in-picture"
                className="vimeo-video"
                allowfullscreen>
              </iframe>
            </div>
            <script src="https://player.vimeo.com/api/player.js">
            </script>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LandingPage;
