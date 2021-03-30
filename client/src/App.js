import { React } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {LoginTemplate, HomePage, UserProfile} from './Components/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {


  return (
      <Router>
      <div className="App">
        <Route exact path={["/", "/login", "/login#redirect"]} component={LoginTemplate}/>
        <Route exact path="/Home" component={HomePage} />
        <Route path="/UserProfile" component={UserProfile}/>
      </div>
      </Router>
  );
}

export default App;
