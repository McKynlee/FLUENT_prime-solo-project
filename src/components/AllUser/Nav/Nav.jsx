import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import img from '../../images/fluent-logo.png';

function Nav() {
  const user = useSelector((store) => store.user);
  // console.log('nav user=', user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
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

  return (
    <div>
      <div className="nav">
        <Link to="/home">
          <img className="nav-logo" src={img} />
          {/* <h2 className="nav-title">F.L.U.E.N.T.</h2> */}
        </Link>
        <div>
          {/* <Link className="navLink" to="/about">
            About
          </Link> */}
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
