import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import img from '../images/fluent-logo.png';

function Nav() {
  const user = useSelector((store) => store.user);
  // console.log('nav user=', user);

  // Condition rendering nav links depending on whether logged in or not:
  let loginProfile = {
    path: '/login',
    text: 'Login',
  };

  if (user.id > 0) {
    if (user.type === 'instructor') {
      loginProfile.path = '/instructor';
      loginProfile.text = 'Your Profile';
    }
    else if (user.type === 'learner') {
      loginProfile.path = '/learner';
      loginProfile.text = 'Your Profile';
    }
  }

  //////////////////////////////////////////////////////////

  let registerChallenge = {
    path: '/learner/registration',
    text: 'Register to learn'
  }

  if (user.id > 0) {
    if (user.type === 'instructor') {
      registerChallenge.path = '',
        registerChallenge.text = ''
    }
    else if (user.type === 'learner') {
      registerChallenge.path = '/challenge',
        registerChallenge.text = 'New Challenge'
    }
  }

  //////////////////////////////////////////////////////////

  let reviewSubmissions = {
    path: '/instructor/registration',
    text: 'Register to instruct'
  };

  if (user.id > 0) {
    if (user.type === 'instructor') {
      reviewSubmissions.path = '/instructor/review';
      reviewSubmissions.text = 'Review Submissions';
    }
    else if (user.type === 'learner') {
      reviewSubmissions.path = '/learner/review';
      reviewSubmissions.text = 'Review Submissions';
    }
  }

  //////////////////////////////////////////////////////////

  // Have logo click link to /home if not logged in, or
  // respective profile pages if logged in:
  let homeProfile = {
    path: '/home'
  };

  if (user.id > 0) {
    if (user.type === 'instructor') {
      homeProfile.path = '/instructor'
    }
    else if (user.type === 'learner') {
      homeProfile.path = '/learner'
    }
  }

  //////////////////////////////////////////////////////////

  return (
    <div>
      <div className="nav">
        <Link to={homeProfile.path}>
          <img className="nav-logo" src={img} />
          <h6>Foreign Language Universal Engagement Tool</h6>
        </Link>
        <div>

          <Link className="navLink" to={loginProfile.path}>
            {loginProfile.text}
          </Link>

          <Link className="navLink" to={registerChallenge.path}>
            {registerChallenge.text}
          </Link>

          <Link className="navLink" to={reviewSubmissions.path}>
            {reviewSubmissions.text}
          </Link>



          {user.id > 0 && (
            <>
              <LogOutButton className="navLink" />
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default Nav;
