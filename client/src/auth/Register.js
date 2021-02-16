import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import { Link, withRouter } from "react-router-dom";
import "../Components/Templates/Templates.css";


class Register extends Component {
    constructor() {
      super();
      this.state = {
        registerName: "",
        registerEmail: "",
        registerUsername: "",
        registerPw: "",
        confirmPw: "",
        registerValidated: false,
        errors: {}
      };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
    }
    
    onChange = e => {
      console.log({ [e.target.id]: e.target.value });
      this.setState({ [e.target.name]: e.target.value });
    };
    
    onSubmit = e => {
        let pwIsInvalid = this.state.registerPw.length < 8;
        let confirmPwInvalid = this.state.registerPw !== this.state.confirmPw;

        // If the email or password entered are not valid then the request will not be sent to backend
        if(this.state.registerEmail.length === 0 || pwIsInvalid || confirmPwInvalid){
            e.preventDefault();
            e.stopPropagation();
            if(pwIsInvalid) {
                document.getElementById("registerPw").classList.add("is-invalid");
            }
            if(confirmPwInvalid) {
                document.getElementById("confirmPw").classList.add("is-invalid");
            }  
            else {
                document.getElementById("registerPw").classList.remove("is-invalid");
                document.getElementById("confirmPw").classList.remove("is-invalid");
            } 

            this.setState({registerValidated: true});
        }
        else{
          const newUser = {
            name: this.state.registerName,
            email: this.state.registerEmail,
            username: this.state.registerUsername,
            password: this.state.registerPw,
            confirmPassword: this.state.confirmPw
          };
          this.props.registerUser(newUser, this.props.history); 
          console.log(newUser);
        }


    };
    
    render() {
      const { errors } = this.state;
      
      return (
            <Form id="register_form" noValidate validated={this.state.registerValidated}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        id="registerEmail"
                        name="registerEmail"
                        value={this.state.email}
                        error={errors.email}
                        onChange={this.onChange} 
                        type="email" 
                        placeholder="Enter email"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        id="registerName"
                        name="registerName"
                        type="text" 
                        placeholder="Enter name"
                        required
                        onChange={this.onChange}
                        value={this.state.name}
                        error={errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        Username must be at least 5 characters.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        id="registerUsername"
                        name="registerUsername"
                        onChange={this.onChange} 
                        type="text" 
                        placeholder="Enter username"
                        required
                        value={this.state.username}
                        error={errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                        Username must be at least 5 characters.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        id="registerPw"
                        name="registerPw"
                        type="password" 
                        placeholder="Enter password"
                        onChange={this.onChange}
                        value={this.state.registerPw}
                        error={errors.registerPw}
                    />
                    <Form.Control.Feedback type="invalid">
                        Password must be at least 8 characters.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        id="confirmPw"
                        name="confirmPw"
                        type="password" 
                        placeholder="Confirm password"
                        onChange={this.onChange}
                        value={this.state.confirmPw}
                        error={errors.confirmPw}
                    />
                    <Form.Control.Feedback type="invalid">
                        Passwords must match.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button onClick={this.onSubmit} variant="info">Register</Button>
            </Form>
      );
    }
  }

  Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

  export default connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Register));