import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import "../Components/Templates/Templates.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
        loginEmail: "",
        loginPw: "",
        loginValidated: false,
        errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/protected");
    }
    
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    console.log({ [e.target.id]: e.target.value });
  };
  
  onSubmit = e => {
    let pwIsInvalid = this.state.loginPw.length < 8;
    // If the email or password entered are not valid then the request will not be sent to backend
    if(this.state.loginEmail.length === 0 || pwIsInvalid){
        e.preventDefault();
        e.stopPropagation();
        if(pwIsInvalid)
            document.getElementById("loginPw").classList.add("is-invalid");
        else
            document.getElementById("loginPw").classList.remove("is-invalid");

        this.setState({loginValidated: true});
    }
    else{
      const userData = {
        email: this.state.loginEmail,
        password: this.state.loginPw
      };
      console.log(userData);
      this.props.loginUser(userData); 

    }
  };
  
  render() {
    const { errors } = this.state;
    
    return (
        <Form id="login_form" noValidate validated={this.state.loginValidated}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    id="loginEmail"
                    name="loginEmail"
                    onChange={this.onChange}
                    value={this.state.loginEmail}
                    error={errors.loginEmail}
                    type="email" 
                    placeholder="Enter email"
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid email.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    id="loginPw"
                    name="loginPw"
                    onChange={this.onChange}
                    value={this.state.loginPw}
                    error={errors.loginPw}
                    type="password" 
                    placeholder="Enter password"
                />
                <Form.Control.Feedback type="invalid">
                    Password must be at least 8 characters.
                </Form.Control.Feedback>
            </Form.Group>
            <Button onClick={this.onSubmit} variant="info">Log in</Button>
        </Form>
    );
  }

}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);