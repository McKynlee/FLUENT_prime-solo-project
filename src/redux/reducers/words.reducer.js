// Store list of words once it is retrieved from server
// to be displayed on learner challenge page
const wordReducer = (state = [{ id: 0, language_id: 0, word: '' }],
  action) => {
  switch (action.type) {
    case 'SET_WORDS':
      return action.payload;
    default:
      return state;
  }
};

export default wordReducer;