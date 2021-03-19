// Store list of currently logged-in learner
// to be displayed on Learner Profile, Submission Success, Challenge:
const learnerReducer = (state = [{
  id: 0,
  user_id: 0,
  instructor_id: 0,
  skill_level: 0,
  moneda_count: 0,
  daily_reminder: false
}], action) => {
  switch (action.type) {
    case 'SET_LEARNER':
      return action.payload;
    default:
      return state;
  }
};

export default learnerReducer;