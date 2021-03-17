import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import img from '../../images/fluent-logo.png';

function Nav() {
  const user = useSelector((store) => store.user);
  // console.log('nav user=', user);

  // Condition rendering nav links depending on whether logged in or not:
  let loginLinkData = {
    path: '/login',
    text: 'Login',
  };

  if (user.id != null) {
    if (user.type === 'instructor') {
      loginLinkData.path = '/instructor';
      loginLinkData.text = 'Your Profile';
    }
    else {
      loginLinkData.path = '/learner';
      loginLinkData.text = 'Your Profile';
    }
  }
  // Condition rendering nav links depending on whether instructor vs. learner:
  let userTypeLinkData = {
    path: '/login',
    text: ''
  }
  if (user.type === 'instructor') {
    userTypeLinkData.path = '/instructor',
      userTypeLinkData.text = 'You are an instructor!'
  }
  if (user.type === 'learner') {
    userTypeLinkData.path = '/challenge',
      userTypeLinkData.text = 'New Challenge'
  }

  let userTypeLinkData2 = {
    path: '/learner/registration',
    text: 'Register to learn'
  }
  if (user.type === 'instructor') {
    userTypeLinkData.path = '/instructor',
      userTypeLinkData.text = 'Instructor Path?'
  }
  if (user.type === 'learner') {
    userTypeLinkData.path = '/challenge',
      userTypeLinkData.text = 'Learner Path?'
  }

  let userTypeLinkData3 = {
    path: '/instructor/registration',
    text: 'Register to instruct'
  }
  if (user.type === 'instructor') {
    userTypeLinkData.path = '/instructor',
      userTypeLinkData.text = 'Instructor Path?'
  }
  if (user.type === 'learner') {
    userTypeLinkData.path = '/challenge',
      userTypeLinkData.text = 'Learner Path?'
  }

  return (
    <div>
      <div className="nav">
        <Link to="/home">
          <img className="nav-logo" src={img} />
        </Link>
        <div>

          <Link className="navLink" to={userTypeLinkData3.path}>
            {userTypeLinkData3.text}
          </Link>

          <Link className="navLink" to={userTypeLinkData2.path}>
            {userTypeLinkData2.text}
          </Link>

          <Link className="navLink" to={loginLinkData.path}>
            {loginLinkData.text}
          </Link>

          <Link className="navLink" to={userTypeLinkData.path}>
            {userTypeLinkData.text}
          </Link>

          {user.id && (
            <>
              <Link className="navLink" to="/info">
                Review Submissions
            </Link>
              <LogOutButton className="navLink" />
            </>
          )}


        </div>
      </div>

    </div>
  );
}

export default Nav;
