// Houses login form for all users, path = '/login'
import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function LoginPage() {
  const history = useHistory();

  // Bring in any existing errors from errors reducer:
  const errors = useSelector((store) => store.errors);

  return (
    <div className="make-flex-column">

      <div className="login-container">
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
      </div>

      <div className="login-container make-flex-column">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
