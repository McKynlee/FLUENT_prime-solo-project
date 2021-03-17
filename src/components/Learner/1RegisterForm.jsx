import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Step 1 of 2 for learner to register:
function RegisterForm() {
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  // Call for pronouns on page load -->pronounSaga 
  // --> pronoun.router --> db --> pronounReducer
  useEffect(() => {
    dispatch({
      type: 'FETCH_PRONOUNS',
    });
  }, []);


  // Pull in pronouns from pronounReducer:
  const pronounList = useSelector((store) => store.pronouns)
  console.log('pronounList:', pronounList);

  // Pull in languages from languageReducer:
  const languageList = useSelector((store) => store.languages)
  console.log('pronounList:', pronounList);

  console.log('languageList:', languageList);

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
            <option value=''>Choose One</option>
            {pronounList.map((pronoun) => {
              return (
                <option key={pronoun.id}
                  value={pronoun.id}
                >
                  {pronoun.pronoun}
                </option>
              )
            })}
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
            {languageList.map((language) => {
              return (
                <option key={language.id}
                  value={language.id}
                >
                  {language.name}
                </option>
              )
            })}
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
            <option value='1'>1: I know a few words.</option>
            <option value='2'>2: I can kind of make a sentence.</option>
            <option value='3'>3: I'm feeling strong with writing sentences.</option>
            <option value='4'>4: I can speak some.</option>
            <option value='5'>5: I can speak well, maybe just some grammar tweaks.</option>
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
          Email address:
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
        <input className="btn" type="submit" name="submit" value="Go to Step 2" />
      </div>
    </form>
  );
}

export default RegisterForm;