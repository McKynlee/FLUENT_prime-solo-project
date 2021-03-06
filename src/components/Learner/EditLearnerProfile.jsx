// Edit Learner Profile info: imitating learner registration1
// path: '/learner/edit'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';


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
  const userId = user.id;
  const userType = 'learner';

  // Extra info for learner's to register:
  const [languageSkill, setLanguageSkill] = useState(learner.skill_level);

  // Variable to represent captured input info to send to user reducer:
  let userLearnerEdits = {
    userId,
    username,
    firstName,
    lastName,
    pronoun,
    targetLanguage,
    languageSkill,
    userType
  }
  // console.log('userLearnerEdits:', userLearnerEdits);


  ////////////////// HANDLE SUBMIT ////////////////////
  // Send user edits to UPDATE, and navigate back to LearnerProfile:
  const onSubmitEdit = (event) => {
    event.preventDefault();

    // Alert learner to confirm that this is their instructor choice:
    swal({
      title: 'Submit Your Edits?',
      text: "This will officially change your info to match your edits.",
      buttons: {
        cancel: 'Cancel',
        confirm: { text: 'Confirm', className: 'swal-btn' }
      },
    })
      .then((update) => {
        if (update) {

          /////////////// CONVERT NECESSARY VALUES TO NUMBERS ///////////////
          // Transform selected language.name back into language.id:
          switch (userLearnerEdits.targetLanguage) {
            case 'Spanish':
              userLearnerEdits.targetLanguage = 1;
              break;
            case 'Italian':
              userLearnerEdits.targetLanguage = 2;
              break;
            case 'French':
              userLearnerEdits.targetLanguage = 3;
              break;
            case 'German':
              userLearnerEdits.targetLanguage = 4;
              break;
            case 'Swedish':
              userLearnerEdits.targetLanguage = 5;
              break;
            case 'Czech':
              userLearnerEdits.targetLanguage = 6;
              break;
            case 'Portuguese':
              userLearnerEdits.targetLanguage = 7;
              break;
            default:
              userLearnerEdits.targetLanguage = 0;
          }

          // Transform selected pronoun.pronoun back into pronoun.id:
          switch (userLearnerEdits.pronoun) {
            case 'he/him/his':
              userLearnerEdits.pronoun = 1;
              break;
            case 'she/her/hers':
              userLearnerEdits.pronoun = 2;
              break;
            case 'they/them/theirs':
              userLearnerEdits.pronoun = 3;
              break;
            case 'xe/xem/xyr':
              userLearnerEdits.pronoun = 4;
              break;
            case 'zie/hir/hir':
              userLearnerEdits.pronoun = 5;
              break;
            case 'ey/em/eir':
              userLearnerEdits.pronoun = 6;
              break;
            case 'other':
              userLearnerEdits.pronoun = 7;
              break;
            default:
              userLearnerEdits.pronoun = 0;
          }

          // Send new info to edit learner & user info:
          dispatch({
            type: 'UPDATE_USER',
            payload: userLearnerEdits
          })
          swal("Your information has been updated!", {
            icon: "success",
          });
          // navigate back to learner profile:
          history.push('/learner')
        }
      });
  }; // end onSubmitEdit

  ////////////////// HANDLE CANCEL ////////////////////
  const cancelEdit = () => {
    console.log('cancelEdit');

    // Confirm cancel edit
    swal({
      title: 'Cancel Editing?',
      text: "Any edits you made will be lost.",
      icon: "warning",
      buttons: {
        cancel: 'Back to Edit',
        confirm: { text: 'Confirm', className: 'btn' }
      },
      dangerMode: true,
    })
      .then((cancelEdit) => {
        if (cancelEdit) {
          // Send user back to profile page:
          history.push('/learner')
        }
        // swal("Your account has been deleted!", {
        //   icon: "success",
        // });
      });
  } // end cancelEdit


  ////////////////// HANDLE DELETE ////////////////////
  const deleteAccount = () => {
    console.log('deleteAccount');

    // Confirm that instructor wants to delete account
    swal({
      title: 'Delete your account?',
      text: "All of your information will be permanently deleted.",
      icon: "warning",
      buttons: {
        cancel: 'Cancel',
        confirm: { text: 'Confirm', className: 'swal-delete-btn' }
      },
      dangerMode: true,
    })
      .then((deleteUser) => {
        if (deleteUser) {

          // Delete user account (includes deleting learner info):
          dispatch({
            type: 'DELETE_ACCOUNT',
            payload: {
              userId,
              onComplete: () => history.push('/home')
            }
          })
          swal("Your account has been deleted!", {
            icon: "success",
          });
        }
      });

  } // end deleteAccount


  ////////////////// RENDER JSX ////////////////////
  return (
    <div>
      {/* <form> */}
      <div className="text-center">
        <h1 className="teal-underline">
          Update Your Info:
        </h1>
      </div>

      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

      <div className="main-flex-container margin-top">
        <div className="sub-container-left make-flex-column">
          <h2 className="teal-underline">Personal Information:</h2>
          <h4>
            We use this information to tailor your learning experience!
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
            <label
              htmlFor="lastName">
              Last Name:
          <input type="text"
                name="lastName"
                value={lastName}
                required
                onChange={(event) => setLastName(event.target.value)}
              />
            </label>
          </div>

          <div className="input-full">
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

          <div className="input-full">
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
                      value={language.name}
                    >
                      {language.name}
                    </option>
                  )
                })}
              </select>
            </label>
          </div>

          <div className="input-full">
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
          <div className="delete-btn-margin">
            <button
              type="delete" className="delete-btn"
              onClick={deleteAccount}>
              DELETE ACCOUNT
            </button>
          </div>
        </div>


        <div className="sub-container-right make-flex-column">
          <div>
            <h2 className="teal-underline">Your Log-In Information:</h2>
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

              <div>
                <button onClick={cancelEdit}
                  className="cancel-btn" type="cancel" name="cancel">
                  CANCEL
                </button>
                <button onClick={onSubmitEdit}
                  className="btn btn-space" type="submit" name="submit">
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </form> */}

    </div>

  );
} // end EditLearnerProfile

export default EditLearnerProfile;
