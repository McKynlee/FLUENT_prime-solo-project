// Store current instructor paired with learner on registration
// to be displayed on LearnerProfile:
const CurrentPairedInstructorReducer = (state = [{
  id: 0,
  avatar: "",
  bio: "",
  learner_capacity: 0,
  user_id: 0,
  first_name: '',
  last_name: '',
  pronouns_id: 0
}], action) => {
  switch (action.type) {
    case 'SET_PAIRED_INSTRUCTOR':
      return action.payload;
    default:
      return state;
  }
};

export default CurrentPairedInstructorReducer;