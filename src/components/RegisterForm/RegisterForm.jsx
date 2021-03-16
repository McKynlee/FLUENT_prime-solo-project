import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  // Pronouns from reducer:
  const pronounList = useSelector((store) => store.pronouns)
  console.log('pronounList:', pronounList);

  // All the info a user needs to register (learner OR instructor):
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronoun, setPronoun] = useState('');
  const [userType, setUserType] = useState('learner');

  // Extra info for learner's to register:
  const [targetLanguage, setTargetLanguage] = useState('');
  const [languageSkill, setLanguageSkill] = useState(0);

  // Test to make sure input info is captured:
  let userInfoOnRegister = {
    username,
    password,
    firstName,
    lastName,
    pronoun,
    targetLanguage,
    languageSkill,
    userType
  }
  console.log('userInfoOnRegister:', userInfoOnRegister);


  // Bring in data from db for dropdown options:
  useEffect(() => {
    fetchDropdownData()
  }, [])

  const fetchDropdownData = () => {
    dispatch({
      type: 'FETCH_PRONOUNS'
    })
  } // end fetchDropdownData

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username,
        password,
        firstName,
        lastName,
        pronoun,
        targetLanguage,
        languageSkill,
        userType
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register to become FLUENT:</h2>

      <h3><em>Step 1 of 2</em></h3>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <h3>Personal Information:</h3>
      <h4>
        We use this information to tailor your learning experience!
      </h4>
      <p><em>*Denotes a required field.</em></p>
      <div>
        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            name="firstName"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="pronoun">
          Your Preferred Pronouns:
          <select
            type="text"
            name="pronoun"
            value={pronoun}
            required
            onChange={(event) => setPronoun(event.target.value)}
          >
            <option value=''>Choose Pronouns</option>
            <option value='1'>test pronoun 1</option>
            <option value='2'>test pronoun 2</option>
          </select>
        </label>
      </div>

      <div>
        <label htmlFor="language">
          Language You Want to Learn:
          <select
            type="text"
            name="language"
            value={targetLanguage}
            required
            onChange={(event) => setTargetLanguage(event.target.value)}
          >
            <option value=''>Choose One</option>
            <option value='1'>test lang 1</option>
            <option value='2'>test lang 2</option>
          </select>
        </label>
      </div>

      <div>
        <label htmlFor="language">
          Current Skill Level with your Selected Language:
          <select
            type="text"
            name="skill"
            value={languageSkill}
            required
            onChange={(event) => setLanguageSkill(event.target.value)}
          >
            <option value=''>Choose One</option>
            <option value='1'>test skill 1</option>
            <option value='2'>test skill 2</option>
          </select>
        </label>
      </div>

      <h3>Your Log-In Information:</h3>
      <h4>
        your email address and password will be
        your log-in credentials each time you return to F.L.U.E.N.T.
        </h4>
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
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
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
