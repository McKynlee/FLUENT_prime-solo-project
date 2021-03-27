// Feeds into LoginPage to create path '/login'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  ///////////////// HANDLE AUTO FILL FOR DEMO PRESENTATION /////////////
  const autoFillLogin = () => {
    setUsername('luigi@gmail.com');
    setPassword('123456789');
  }

  return (
    <form className="detail-card text-center margin-top"
      onSubmit={login}>
      <div onClick={autoFillLogin}>
        <h1 className="teal-underline">
          Login
      </h1>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            Email Address:
          <input
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
          <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div>
        <input className="btn margin-sm-top" type="submit" name="submit" value="LOG IN" />
      </div>
    </form>
  );
}

export default LoginForm;
