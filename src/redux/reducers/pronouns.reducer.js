// Store list of pronouns once retrieved from server
// to be displayed on both learner and instructor registration pages
const pronounReducer = (state = [{ id: 0, pronoun: '' }], action) => {
  switch (action.type) {
    case 'SET_PRONOUNS':
      return action.payload;
    default:
      return state;
  }
};

export default pronounReducer;