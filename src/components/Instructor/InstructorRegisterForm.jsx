import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Step 1 of 1 for instructor to register:
function InstructorRegisterForm() {
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

  // All the info a user needs to register (learner OR instructor):
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronoun, setPronoun] = useState(0);

  // Extra info for learner's to register:
  const [instructorCapacity, setInstructorCapacity] = useState(0);
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [knownLanguage, setKnownLanguage] = useState(0);
  const userType = 'instructor';

  // Test to make sure input info is captured:
  let instructorInfoOnRegister = {
    username,
    password,
    firstName,
    lastName,
    pronoun,
    knownLanguage,
    bio,
    avatar,
    instructorCapacity,
    userType
  }
  // console.log('userInfoOnRegister:', instructorInfoOnRegister);


  const registerInstructor = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: instructorInfoOnRegister,
      onComplete: history.push('/instructor')
    });
  }; // end registerInstructor

  return (
    <form onSubmit={registerInstructor}>
      <div className="text-center">
        <h1 className="teal-underline">
          Register to help others become FLUENT:
      </h1>
        <h2><em>Step 1 of 1</em></h2>
        <div className="meter full">
          <span></span>
        </div>
      </div>

      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

      <div className="main-flex-container margin-top">
        <div className="sub-container-left make-flex-column ">
          <h3 className="teal-underline">Personal Information:</h3>
          <h4>
            We use this information to let learners know a bit
            about you as they select their instructor.
      </h4>
          <p><em>*Denotes a required field.</em></p>
          <div className="input-full">
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

          <div className="input-full">
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

          <div className="select-dropdown-container input-full">
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

          <div className="select-dropdown-container input-full">
            <label htmlFor="language">
              Language you are able to teach:
          <select
                type="text"
                name="language"
                value={knownLanguage}
                required
                onChange={(event) => setKnownLanguage(event.target.value)}
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

          <div className="select-dropdown-container input-full">
            <label htmlFor="avatar">
              Insert an image URL that represents you:
          <input type="text" value={avatar}
                onChange={(event) => setAvatar(event.target.value)} />
            </label>
          </div>

          <div>
            <label htmlFor="bio">
              Tell us a little about yourself:
          <textarea className="bg-white"
                rows="2" cols="29"
                value={bio}
                onChange={(event) => setBio(event.target.value)}>
                Bio
          </textarea>
            </label>
          </div>

          <div className="select-dropdown-container input-full">
            <label htmlFor="capacity margin-sm-top">
              Maximum learners with whom you'd like to work:
          <select
                type="text"
                name="capacity"
                value={instructorCapacity}
                required
                onChange={(event) => setInstructorCapacity(event.target.value)}
              >
                <option value=''>Choose One</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
              </select>
            </label>
          </div>
        </div>



        <div className="sub-container-right make-flex-column">
          <h3 className="teal-underline">Your Log-In Information:</h3>
          <h4>
            your email address and password will be
            your log-in credentials each time you return to F.L.U.E.N.T.
        </h4>
          <div className="login-container input-full">
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
          <div className="input-full">
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
            <button className="btn margin-top" type="submit">
              REGISTER
            </button>
          </div>
        </div>
      </div>

    </form>
  );
}

export default InstructorRegisterForm;