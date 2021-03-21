// Store all learners paired with instructor on instructor login
// to be displayed on InstructorProfile:
const CurrentPairedLearnersReducer = (state = [{
  user_id: 0,
  first_name: '',
  last_name: '',
  pronouns: '',
  language: '',
  username: '',
  skill_level: '',
  learner_id: 0
}], action) => {
  switch (action.type) {
    case 'SET_PAIRED_LEARNERS':
      return action.payload;
    default:
      return state;
  }
};

export default CurrentPairedLearnersReducer;