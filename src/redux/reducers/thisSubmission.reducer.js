// Store specific submission that instructor clicked on 
// for detail view in GiveFeedback 
const thisSubmissionReducer = (state = [{
  id: 0,
  learner_id: 0,
  picture_url: '',
  picture_description: '',
  word: '',
  word_sentence: '',
  q_for_instructor: '',
  time_stamp: '',

  instructor_feedback_id: 0,
  inst_picture_description: '',
  inst_word_sentence: '',
  instructor_q_response: '',
  time_stamp: '',
}], action) => {
  switch (action.type) {
    case 'SET_THIS_SUBMISSION':
      return action.payload;
    default:
      return state;
  }
};

export default thisSubmissionReducer;