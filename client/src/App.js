import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {LoginTemplate, HomePage, ProfileTemplate, UserProfile} from './Components/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const [currentUser, setCurrentUser] = useState();

  function handleUser(user){
    setCurrentUser(user);
  }

  return (
      <Router>
      <div className="App">
        <Route exact path={["/", "/login", "/login#redirect"]} >
          <LoginTemplate handleUser={handleUser} currentUser={currentUser} />
        </Route>
        <Route path="/profile">
          <ProfileTemplate handleUser={handleUser} currentUser={currentUser} />
        </Route>
        <Route exact path="/Home" component={HomePage} />
        <Route exact path="/UserProfile" component={UserProfile} />
      </div>
      </Router>
  );
}

export default App;
