import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginTemplate from './Components/Templates/LoginTemplate';
import CreatePost from './Components/Templates/test_create_post_form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path="/" component={LoginTemplate} />
      <Route exact path="/login" component={LoginTemplate}/>
      <Route exact path="/post" component={CreatePost}/>
    </div>
    </Router>

  );
}

export default App;
