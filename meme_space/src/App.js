import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginTemplate from './Templates/LoginTemplate';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path="/" component={LoginTemplate} />
      <Route exact path="/login" component={LoginTemplate} />
    </div>
    </Router>

  );
}

export default App;
