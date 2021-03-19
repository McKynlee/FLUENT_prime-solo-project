// Store random photo id once it is retrieved from server
// to be displayed on learner challenge page utilizing Lorem Picsum website
const photoReducer = (state = 0,
  action) => {
  switch (action.type) {
    case 'SET_RANDOM_PHOTO':
      return action.payload;
    default:
      return state;
  }
};

export default photoReducer;