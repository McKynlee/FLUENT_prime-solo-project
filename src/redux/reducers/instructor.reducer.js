// Store list of available instructors once retrieved from server
// to be displayed on Learner 2RegisterForm and instructor detail view:
const instructorReducer = (state = [{
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
    case 'SET_INSTRUCTORS':
      return action.payload;
    default:
      return state;
  }
};

export default instructorReducer;