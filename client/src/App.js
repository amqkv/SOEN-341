import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginTemplate from './Components/Templates/LoginTemplate';
import HomePage from './Components/Templates/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UserProfile from './Components/Templates/UserProfile';


function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path="/" component={LoginTemplate} />
      <Route exact path="/login" component={LoginTemplate} />
      <Route exact path="/Home" component={HomePage} />
      <Route exact path="/UserProfile" component={UserProfile} />
    </div>
    </Router>

  );
}

export default App;
