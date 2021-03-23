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
  let loginLinkData = {
    path: '/login',
    text: 'Login',
  };

  if (user.id != null) {
    if (user.type === 'instructor') {
      loginLinkData.path = '/instructor';
      loginLinkData.text = 'Your Profile';
    }
    else if (user.type === 'learner') {
      loginLinkData.path = '/learner';
      loginLinkData.text = 'Your Profile';
    }
  }

  // Condition rendering nav links depending on whether instructor vs. learner:
  let userTypeLinkData = {
    path: '',
    text: ''
  }
  if (user.type === 'learner') {
    userTypeLinkData.path = '/challenge',
      userTypeLinkData.text = 'New Challenge'
  }
  //////////////////////////////////////////////////////////

  let userTypeLinkData2 = {
    path: '/learner/registration',
    text: 'Register to learn'
  }
  if (user.type === 'instructor') {
    userTypeLinkData2.path = '',
      userTypeLinkData2.text = ''
  }
  if (user.type === 'learner') {
    userTypeLinkData2.path = '',
      userTypeLinkData2.text = ''
  }
  //////////////////////////////////////////////////////////

  let userTypeLinkData3 = {
    path: '/instructor/registration',
    text: 'Register to instruct'
  }
  if (user.type === 'instructor') {
    userTypeLinkData3.path = '',
      userTypeLinkData3.text = ''
  }
  if (user.type === 'learner') {
    userTypeLinkData3.path = '',
      userTypeLinkData3.text = ''
  }
  //////////////////////////////////////////////////////////
  let userTypeLinkData4;

  if (user.type === 'instructor') {
    userTypeLinkData4 = '/instructor/review';
  }
  if (user.type === 'learner') {
    userTypeLinkData4 = '/learner/review';
  }

  // Have logo click link to /home if not logged in, or
  // respective profile pages if logged in:
  let loginLinkData4 = {
    path: '/home',
    text: ''
  };

  // if (user.id != null) {
  if (user.type === 'instructor') {
    loginLinkData4.path = '/instructor';
    loginLinkData4.text = 'Review Submissions'
  }
  else if (user.type === 'learner') {
    loginLinkData4.path = '/learner';
    loginLinkData4.text = 'Review Submissions'
  }
  // }

  return (
    <div>
      <div className="nav">
        <Link to={loginLinkData4.path}>
          <img className="nav-logo" src={img} />
          <h6>Foreign Language Universal Engagement Tool</h6>
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

          <Link className="navLink" to={userTypeLinkData4}>
            {loginLinkData4.text}
          </Link>


          {user.id && (
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
