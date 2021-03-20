// Store specific clicked-on instructor for learner registration detail view:
// to be displayed on Learner 2RegisterForm and instructor detail view
const thisInstructorReducer = (state = [{
  id: 0,
  avatar: "",
  bio: "",
  learner_capacity: 0,
  user_id: 0,
  first_name: '',
  last_name: '',
  pronouns_id: 0,
  learner_count: 0
}], action) => {
  switch (action.type) {
    case 'SET_THIS_INSTRUCTOR':
      return action.payload;
    default:
      return state;
  }
};

export default thisInstructorReducer;