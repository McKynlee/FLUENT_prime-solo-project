import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import InstructorRegisterForm from './InstructorRegisterForm';

function InstructorRegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div>
      <InstructorRegisterForm />

      {/* <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center> */}
    </div>
  );
}

export default InstructorRegisterPage;
