// Edit Instructor Profile info: imitating instructor registration
// path: '/instructor/edit'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function EditInstructorProfile() {
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
  const instructor = useSelector((store) => store.thisInstructor)
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
  const [knownLanguage, setKnownLanguage] = useState(user.language);
  const userId = user.id;
  const userType = 'instructor';

  // Info specific to Instructors:
  const [instructorCapacity, setInstructorCapacity] = useState(instructor.learner_capacity);
  const [avatar, setAvatar] = useState(instructor.avatar);
  const [bio, setBio] = useState(instructor.bio);

  // Variable to represent captured input info to send to user reducer:
  let userInstructorEdits = {
    userId,
    username,
    firstName,
    lastName,
    pronoun,
    knownLanguage,
    userType,
    instructorCapacity,
    avatar,
    bio
  }
  // console.log('userInstructorEdits:', userInstructorEdits);


  ////////////////// HANDLE SUBMIT ////////////////////
  // Send user edits to UPDATE, and navigate back to InstructorProfile:
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
          switch (userInstructorEdits.knownLanguage) {
            case 'Spanish':
              userInstructorEdits.knownLanguage = 1;
              break;
            case 'Italian':
              userInstructorEdits.knownLanguage = 2;
              break;
            case 'French':
              userInstructorEdits.knownLanguage = 3;
              break;
            case 'German':
              userInstructorEdits.knownLanguage = 4;
              break;
            case 'Swedish':
              userInstructorEdits.knownLanguage = 5;
              break;
            case 'Czech':
              userInstructorEdits.knownLanguage = 6;
              break;
            case 'Portuguese':
              userInstructorEdits.knownLanguage = 7;
              break;
            default:
              userInstructorEdits.knownLanguage = 0;
          }

          // Transform selected pronoun.pronoun back into pronoun.id:
          switch (userInstructorEdits.pronoun) {
            case 'he/him/his':
              userInstructorEdits.pronoun = 1;
              break;
            case 'she/her/hers':
              userInstructorEdits.pronoun = 2;
              break;
            case 'they/them/theirs':
              userInstructorEdits.pronoun = 3;
              break;
            case 'xe/xem/xyr':
              userInstructorEdits.pronoun = 4;
              break;
            case 'zie/hir/hir':
              userInstructorEdits.pronoun = 5;
              break;
            case 'ey/em/eir':
              userInstructorEdits.pronoun = 6;
              break;
            case 'other':
              userInstructorEdits.pronoun = 7;
              break;
            default:
              userInstructorEdits.pronoun = 0;
          }

          // Send new info to edit instructor & user info:
          dispatch({
            type: 'UPDATE_USER',
            payload: userInstructorEdits
          })
          swal("Your information has been updated!", {
            icon: "success",
          });
          // navigate back to learner profile:
          history.push('/instructor')
        }
      });
  }; // end onSubmitEdit


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
          // navigate to home page:
          // history.push('/home')
        }
      });
  } // end deleteAccount


  ////////////////// RENDER JSX ////////////////////
  return (
    <div>
      <form className="text-center" onSubmit={onSubmitEdit}>
        <h2>Update Your Info:</h2>

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
          <label htmlFor="capacity">
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
          <input className="btn" type="submit" name="submit" value="Update Your Info" />
        </div>
      </form>
      <button onClick={deleteAccount}>
        DELETE ACCOUNT
    </button>
    </div>
  );
}

export default EditInstructorProfile;
