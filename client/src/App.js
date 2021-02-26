import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {LoginTemplate, HomePage, UserProfile} from './Components/index';
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
        <Route exact path="/Home" component={HomePage} />
        <Route path="/UserProfile">
          <UserProfile  handleUser={handleUser} currentUser={currentUser} />
        </Route>
      </div>
      </Router>
  );
}

export default App;
