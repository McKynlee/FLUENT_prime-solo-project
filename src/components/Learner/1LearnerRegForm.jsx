// Part 1 of learner registration: reached at nav link '/learner/registration'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Step 1 of 2 for learner to register:
function LearnerRegistration1() {
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  // Call for pronouns and languages on page load 
  useEffect(() => {
    fetchPronouns();
    fetchLanguages();
  }, []);

  // Get pronouns -->pronounSaga --> pronoun.router --> db --> pronounReducer
  const fetchPronouns = () => {
    dispatch({
      type: 'FETCH_PRONOUNS',
    });
  }

  const fetchLanguages = () => {
    dispatch({
      type: 'FETCH_LANGUAGES',
    });
  }

  // Pull in pronouns from pronounReducer:
  const pronounList = useSelector((store) => store.pronouns)
  // console.log('pronounList:', pronounList);

  // Pull in languages from languageReducer:
  const languageList = useSelector((store) => store.languages)
  // console.log('languageList:', languageList);

  // All the info a user needs to register (learner OR instructor):
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronoun, setPronoun] = useState(0);

  // Extra info for learner's to register:
  const [targetLanguage, setTargetLanguage] = useState(0);
  const [languageSkill, setLanguageSkill] = useState(0);
  const userType = 'learner';

  // instructor_id will be set in 2RegisterForm, but needs to have placeholder:
  let instructor_id = 0;

  // Variable to represent captured input info to send to user reducer:
  let userInfoOnRegister = {
    username,
    password,
    firstName,
    lastName,
    pronoun,
    targetLanguage,
    instructor_id,
    languageSkill,
    userType
  }
  // console.log('userInfoOnRegister:', userInfoOnRegister);

  // Send user input info to reducer, and navigate to 2RegisterForm:
  const goToStep2 = (event) => {
    event.preventDefault();

    dispatch({
      type: 'SET_USER',
      payload: userInfoOnRegister
    });

    //navigate to part 2 of learner registration:
    history.push('/learner/registration2')
  }; // end goToStep2

  return (
    <form className="main-container" onSubmit={goToStep2}>
      <div className="text-align-center ">
        <h2 className="teal-underline">Register to become FLUENT:</h2>
        <h3><em>Step 1 of 2</em></h3>
        <div className="meter half">
          <span></span>
        </div>
      </div>

      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

      <div className="second-main-container ">
        {/* <div className="registration-container"> */}
        <div className="sub-container-left make-flex ">
          <div className="text-align-center">
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

            <div className="select-dropdown-container">
              <label htmlFor="pronoun">
                Your Preferred Pronouns:
          <select
                  type="text"
                  name="pronoun"
                  value={pronoun}
                  required
                  onChange={(event) => setPronoun(Number(event.target.value))}
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
                  onChange={(event) => setTargetLanguage(Number(event.target.value))}
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
                  onChange={(event) => setLanguageSkill(Number(event.target.value))}
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
          </div>
        </div>

        {/* <div className="registration-container"> */}
        <div className="sub-container-left">
          <h3>Your Log-In Information:</h3>
          <h4>
            Your email address and password will be
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
        </div>
      </div>
    </form>
  );
}

export default LearnerRegistration1;
