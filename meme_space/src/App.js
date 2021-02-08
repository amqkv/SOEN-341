import logo from './logo.svg';
import Form from './Components/Form';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {
  return (
    <div className="App">
      <Form 
        form_id="login_form" 
        confirmation_btn_label="Log in"
        form_url="https://raw.githubusercontent.com/amqkv/341-json-objects/main/login_form.json"
      />
      <Form
        form_id="register_form"
        confirmation_btn_label="Sign up"
        form_url="https://raw.githubusercontent.com/amqkv/341-json-objects/main/register_form.json"
      />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
