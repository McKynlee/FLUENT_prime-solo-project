// Edit Learner Profile info: imitating learner registration1
// path: '/learner/edit'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function EditLearnerProfile() {
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  ////////////////// PULL DB DATA FOR DROPDOWNS ////////////////////
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


  ////////////////// BRING IN REDUCER DATA ////////////////////
  // Bring in logged-in user's info:
  const user = useSelector((store) => store.user);
  // console.log('logged-in user:', user);

  // Bring in learner info:
  const learner = useSelector((store) => store.learner)
  // console.log('learner:', learner);

  // Bring in pronouns from pronounReducer:
  const pronounList = useSelector((store) => store.pronouns)
  // console.log('pronounList:', pronounList);

  // Bring in languages from languageReducer:
  const languageList = useSelector((store) => store.languages)
  // console.log('languageList:', languageList);


  ////////////////// CAPTURE EDIT INPUTS ////////////////////
  // All the info a user needs to register (learner OR instructor):
  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [pronoun, setPronoun] = useState(user.pronouns);
  const [targetLanguage, setTargetLanguage] = useState(user.language);

  // Extra info for learner's to register:
  const [languageSkill, setLanguageSkill] = useState(learner.skill_level);

  // Variable to represent captured input info to send to user reducer:
  let userLearnerEdits = {
    username,
    firstName,
    lastName,
    pronoun,
    targetLanguage,
    languageSkill,
  }
  // console.log('userLearnerEdits:', userLearnerEdits);


  ////////////////// HANDLE SUBMIT ////////////////////
  // Send user edits to UPDATE, and navigate back to LearnerProfile:
  const onSubmitEdit = (event) => {
    event.preventDefault();

    dispatch({
      type: 'UPDATE_USER',
      payload: userLearnerEdits
    });

    history.push('/learner')
  }; // end onSubmitEdit


  ////////////////// RENDER JSX ////////////////////
  return (
    <form className="formPanel" onSubmit={onSubmitEdit}>
      <h2>Update Your Info:</h2>

      <h3><em>Step 1 of 1</em></h3>
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
            onChange={(event) => setPronoun(Number(event.target.value))}
          >
            <option value=''>Choose One</option>
            {pronounList.map((pronoun) => {

              return (
                <option key={pronoun.id}
                  value={pronoun.pronoun}
                  selectedOrNot
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
                  value={language.name}
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
        <input className="btn" type="submit" name="submit" value="Go to Step 2" />
      </div>
    </form>
  );
}

export default EditLearnerProfile;
