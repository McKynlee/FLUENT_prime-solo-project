// Store number of consecutive days logged in learner (by learner.id)
// has submitted a challenge. To be displayed on LearnerProfile.jsx
const streakReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_STREAK':
      return action.payload;
    default:
      return state;
  }
};

export default streakReducer;