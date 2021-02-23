import { BrowserRouter as Router, Route } from 'react-router-dom';
import {LoginTemplate, HomePage} from './Components/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path="/" component={LoginTemplate} />
      <Route exact path="/login" component={LoginTemplate} />
      <Route exact path="/Home" component={HomePage} />
    </div>
    </Router>

  );
}

export default App;
