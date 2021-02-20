import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import LoginTemplate from './Components/Templates/LoginTemplate';
import ProfileTemplate from './Components/Templates/ProfileTemplate';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// const loginStatus = "";




function App() {


  return (
      <Router>
      <div className="App">
        <Route exact path="/" component={LoginTemplate} />
        <Route exact path="/login" >
          <LoginTemplate />
        </Route>
        <Route path="/profile">
          <ProfileTemplate/>
        </Route>
      </div>
      </Router>

  );
}

export default App;
