import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Step 1 of 1 for instructor to register:
function InstructorRegisterForm() {
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  // Call for pronouns and languages on page load 
  useEffect(() => {
    fetchPronouns,
      fetchLanguages
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
  console.log('pronounList:', pronounList);

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
  console.log('userInfoOnRegister:', instructorInfoOnRegister);


  const registerInstructor = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: instructorInfoOnRegister
    });
  }; // end registerInstructor

  return (
    <form className="formPanel" onSubmit={registerInstructor}>
      <h2>Register to help others become FLUENT:</h2>

      <h3><em>Step 1 of 1</em></h3>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <h3>Personal Information:</h3>
      <h4>
        We use this information to let learners know a bit
        about you as they select their instructor.
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

      <div>
        <label htmlFor="avatar">
          Insert an image URL that represents you:
          <input type="text" value={avatar}
            onChange={(event) => setAvatar(event.target.value)} />
        </label>
      </div>

      <div>
        <label htmlFor="bio">
          Tell us a little about yourself:
          <textarea value={bio}
            onChange={(event) => setBio(event.target.value)}>
            Bio
          </textarea>
        </label>
      </div>

      <div>
        <label htmlFor="language">
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
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default InstructorRegisterForm;