import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginTemplate from './Components/Templates/LoginTemplate';
import ProfileTemplate from './Components/Templates/ProfileTemplate';

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
      </div>
      </Router>

  );
}

export default App;
