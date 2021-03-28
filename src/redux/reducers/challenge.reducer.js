// Store list of submissions connected with user.id 
// (applies to both learners and instructors) 
// to be displayed on both learner and instructor review submission pages
const submissionReducer = (state = [{
  id: 0,
  learner_id: 0,
  picture_url: '',
  picture_description: '',
  word: '',
  word_sentence: '',
  q_for_instructor: '',
  time_stamp: '',
  responseShowing: false,
  instructor_feedback_id: 0,
  inst_picture_description: '',
  inst_word_sentence: '',
  instructor_q_response: '',
  time_stamp: '',
}], action) => {
  switch (action.type) {
    case 'SET_SUBMISSIONS':
      return action.payload;
    default:
      return state;
  }
};

export default submissionReducer;