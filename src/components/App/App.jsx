import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// CUSTOM COMPONENTS:
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import LearnerProfile from '../Learner/LearnerProfilePage';
import ChallengePage from '../Learner/ChallengePage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import LearnerRegistration1 from '../Learner/1LearnerRegForm';
import LearnerRegistration2 from '../Learner/2LearnerRegForm';
import InstructorRegistration from '../Instructor/InstructorRegisterPage';
import SelectInstructorDetails from '../Learner/SelectInstructorDetails';
import LearnerReviewFeedback from '../Learner/LearnerReviewFeedback';
import SubmissionSuccess from '../Learner/SubmissionSuccess';
import InstructorProfile from '../Instructor/InstructorProfilePage';
import InstructorSubmissionReview from '../Instructor/SubmissionReview';
import InstructorGiveFeedback from '../Instructor/GiveFeedback';
import EditLearnerProfile from '../Learner/EditLearnerProfile';
import EditInstructorProfile from '../Instructor/EditInstructorProfile';

// CSS COMPONENTS:
import './CSS/App.css';
import './CSS/FlexLayout.css';
import './CSS/Element.css';
import './CSS/Button.css';
import './CSS/2LearnerRegForm.css';
import './CSS/SelectInstructor.css';
import './CSS/LearnerProfile.css';
import './CSS/Challenge.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  // Conditional render links depending if user.type = 
  // learner OR instructor:
  const user = useSelector((store) => store.user);

  let userTypeLink;

  if (user.id != null) {
    if (user.type === 'instructor') {
      userTypeLink = '/instructor'
    }
    else if (user.type === 'learner') {
      userTypeLink = '/learner'
    }
  }

  return (
    <Router>
      <div>
        <Nav />
        <Switch>

          {/* ///////// ALL USER ROUTES ////////// */}
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />
          {/* Home landing page available to all: */}
          <Route exact
            path="/home">
            <LandingPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LandingPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}


          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to userTypeLink (set above)
            // - else shows Landing Page at "/home" to start registration
            exact
            path="/home"
            authRedirect={userTypeLink}
          >
            <LandingPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to userTypeLink (set above)
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect={userTypeLink}
          >
            <LoginPage />
          </ProtectedRoute>


          {/* ///////// LEARNER ROUTES ////////// */}
          {/* Registration available to non-users, so not protected */}
          <Route exact
            path="/learner/registration"
          >
            <LearnerRegistration1 />
          </Route>

          <Route exact
            path="/learner/registration2"
          >
            <LearnerRegistration2 />
          </Route>

          <Route exact
            path="/learner/instructor/details/:id"
          >
            <SelectInstructorDetails />
          </Route>

          <ProtectedRoute
            // logged in shows LearnerPage else shows LoginPage
            exact
            path="/learner"
          >
            <LearnerProfile />
          </ProtectedRoute>

          <Route exact
            path="/learner/edit"
          >
            <EditLearnerProfile />
          </Route>

          <ProtectedRoute
            // logged in shows Challenge Page else shows LoginPage
            exact
            path="/challenge"
          >
            <ChallengePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Submission Success Page else shows LoginPage
            exact
            path="/success"
          >
            <SubmissionSuccess />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/learner/review"
            // - else shows LandingPage at "/home"
            exact
            path="/learner/review"
          // authRedirect="/learner/review"
          >
            <LearnerReviewFeedback />
          </ProtectedRoute>



          {/* ///////// INSTRUCTOR ROUTES ////////// */}
          <Route exact
            path="/instructor/registration"
          >
            <InstructorRegistration />
          </Route>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/instructor"
          >
            <InstructorProfile />
          </ProtectedRoute>

          <Route exact
            path="/instructor/edit"
          >
            <EditInstructorProfile />
          </Route>

          <ProtectedRoute
            // logged in shows Instructor's review table of Learner submissions 
            // else shows LoginPage
            exact
            path="/instructor/review"
          >
            <InstructorSubmissionReview />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows page for instructor to write feedback to learners 
            // else shows LoginPage
            exact
            path="/instructor/feedback/:id"
          >
            <InstructorGiveFeedback />
          </ProtectedRoute>




          {/* ///////// IF NO MATCHING ROUTES ////////// */}
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
