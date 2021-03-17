import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RegisterForm from './1RegisterForm';

function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div>
      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
