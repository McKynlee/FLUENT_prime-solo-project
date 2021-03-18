import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import pronouns from './pronouns.reducer';
import languages from './languages.reducer';
import instructors from './instructor.reducer';
import learner from './learner.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootReducer

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  pronouns, // list of pronouns from db for registration dropdown
  languages, // list of languages from db for registration dropdown
  instructors, // list of registered instructors for learners to choose from
  learner, // details for specific logged-in learner
});

export default rootReducer;
