import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  // Fetch all languages on load:
  // (would prefer to do this along with fetch_pronouns in RegisterForm)
  useEffect(() => {
    dispatch({
      type: 'FETCH_LANGUAGES',
    });
  }, []);


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
