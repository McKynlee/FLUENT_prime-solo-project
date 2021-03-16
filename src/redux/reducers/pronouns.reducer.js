// Store list of pronouns once retrieved from server
// to be displayed on both learner and instructor registration pages
const pronounReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PRONOUNS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default pronounReducer;