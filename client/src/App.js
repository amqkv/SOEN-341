import { React, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreatePost from './Components/Templates/test_create_post_form';
import {LoginTemplate, HomePage, Search, UserProfile} from './Components/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {


  return (
      <Router>
      <div className="App">
        <Route exact path={["/", "/login", "/login#redirect"]} component={LoginTemplate}/>
        <Route path="/Home" component={HomePage} />
        <Route path="/UserProfile" component={UserProfile}/>
        <Route path="/Search" component={Search} />
      </div>
      </Router>
  );
}

export default App;
