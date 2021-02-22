import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginTemplate from './Components/Templates/LoginTemplate';
import HomePage from './Components/Templates/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path="/" component={LoginTemplate} />
      <Route exact path="/login" component={LoginTemplate} />
      <Route exact parth="/Home" component={HomePage} />
    </div>
    </Router>

  );
}

export default App;
