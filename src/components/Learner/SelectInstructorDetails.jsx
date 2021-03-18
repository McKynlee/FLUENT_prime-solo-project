// Detail view of instructor details during learner registration
// linked by '/learner/instructor/details/:id'

import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function SelectInstructorDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const instructorIdParam = useParams(':id');

  console.log('instructorIdParam:', instructorIdParam);

  // on page load, grab specific instructor info from reducer:
  useEffect(() => {
    dispatch({
      type: 'SELECT_INSTRUCTOR',
      payload: instructorIdParam
    });
  }, []);

  // Bring in specific instructor details from reducer:
  const instructorDetails = useSelector(store => store.instructors);
  console.log('instructor details:', instructorDetails);

  const backToList = () => {
    history.push('/learner/registration2');
  }


  return (
    <div>
      <h1>Instructor Details</h1>
      <button onClick={backToList}>
        Back to Available Instructors
      </button>
    </div>
  )
}

export default SelectInstructorDetails;