// Store list of languages once it is retrieved from server
// to be displayed on both learner and instructor registration pages
const languageReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LANGUAGES':
      return action.payload;
    default:
      return state;
  }
};

export default languageReducer;