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
    text: 'LOGIN',
  };

  if (user.id > 0) {
    if (user.type === 'instructor') {
      loginProfile.path = '/instructor';
      loginProfile.text = 'YOUR PROFILE';
    }
    else if (user.type === 'learner') {
      loginProfile.path = '/learner';
      loginProfile.text = 'YOUR PROFILE';
    }
  }

  //////////////////////////////////////////////////////////

  let registerChallenge = {
    path: '/learner/registration',
    text: 'REGISTER TO LEARN'
  }

  if (user.id > 0) {
    if (user.type === 'instructor') {
      registerChallenge.path = '',
        registerChallenge.text = ''
    }
    else if (user.type === 'learner') {
      registerChallenge.path = '/challenge',
        registerChallenge.text = 'NEW CHALLENGE'
    }
  }

  //////////////////////////////////////////////////////////

  let reviewSubmissions = {
    path: '/instructor/registration',
    text: 'REGISTER TO INSTRUCT'
  };

  if (user.id > 0) {
    if (user.type === 'instructor') {
      reviewSubmissions.path = '/instructor/review';
      reviewSubmissions.text = 'REVIEW SUBMISSIONS';
    }
    else if (user.type === 'learner') {
      reviewSubmissions.path = '/learner/review';
      reviewSubmissions.text = 'REVIEW SUBMISSIONS';
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

        <div className="nav-logo-container">
          <Link to={homeProfile.path}>
            <img className="nav-logo-img" src={img} alt="F.L.U.E.N.T. logo" />

          </Link>
        </div>

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
