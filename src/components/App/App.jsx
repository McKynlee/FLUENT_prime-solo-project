import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// CUSTOM COMPONENTS:
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import LearnerProfile from '../Learner/ProfilePage';
import ChallengePage from '../Learner/ChallengePage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import LearnerRegistration1 from '../Learner/1LearnerRegForm';
import LearnerRegistration2 from '../Learner/2LearnerRegForm';
import InstructorRegistration from '../Instructor/InstructorRegisterPage';
import SelectInstructorDetails from '../Learner/SelectInstructorDetails';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LandingPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <LearnerProfile />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Challenge Page else shows LoginPage
            exact
            path="/challenge"
          >
            <ChallengePage />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/user"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows Landing Page at "/home" to start registration
            exact
            path="/home"
            authRedirect="/user"
          >
            <LandingPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/user"
          >
            <LandingPage />
          </ProtectedRoute>

          {/* Anyone can access registration pages: */}
          <Route exact
            path="/instructor/registration"
          >
            <InstructorRegistration />
          </Route>

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
