import {React, useState} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import './Templates.css';

export default function LoginTemplate(){
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPw, setLoginPw] = useState("");
    const [loginValidated, setLoginValidated] = useState(false);

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPw, setRegisterPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [registerValidated, setRegisterValidated] = useState(false);

    // Login form validation
    function handleLogin(e){
        let pwIsInvalid = loginPw.length < 8 || loginPw.length > 16;
        // If the email or password entered are not valid then the request will not be sent to backend
        if(loginEmail.length === 0 || pwIsInvalid){
            e.preventDefault();
            e.stopPropagation();
            if(pwIsInvalid)
                document.getElementById("loginPw").classList.add("is-invalid");
            else
                document.getElementById("loginPw").classList.remove("is-invalid");
        }
        setLoginValidated(true);
    }

    // Register form validation
    function handleRegister(e){
        let pwIsInvalid = registerPw.length < 8 || registerPw.length > 16;
        let confirmPwInvalid = registerPw !== confirmPw;
        // If the email or password entered are not valid then the request will not be sent to backend
        if(registerEmail.length === 0 || pwIsInvalid || confirmPwInvalid){
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
        }
        setRegisterValidated(true);
    }

    // Storing the values of the user input on change
    function handleChange(e){
        const { name, value } = e.target;

        switch(name){
            case "loginEmail":
                setLoginEmail(value);
            break;
            case "loginPw":
                setLoginPw(value);
            break;
            case "registerEmail":
                setRegisterEmail(value);
                console.log(registerEmail);
            break;
            case "registerPw":
                setRegisterPw(value);
            break;
            case "confirmPw":
                setConfirmPw(value);
            break;
            default:
            break;
        }
    }

    return(
        <div id="Login_Template">
            {/* Welcome message */}
            <div id="login_register_header_msg">Sign in (or register!) to post those <img id="pepe_okei_sighn" alt="Pepe Okey Sighn" src="https://emoji.gg/assets/emoji/2676_Pepe_Okei_Sighn.png" height="40px"/> mémés</div>
            {/* Tabs containing the login & register forms */}
            <div id="login_register_form_container">
                <Tabs defaultActiveKey="login" id="login_register_tabs">
                    <Tab eventKey="login" title="Log in">
                        {/* Login form */}
                        <Form id="login_form" onSubmit={handleLogin} noValidate validated={loginValidated}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    id="loginEmail"
                                    name="loginEmail"
                                    onChange={handleChange} 
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
                                    onChange={handleChange} 
                                    type="password" 
                                    placeholder="Enter password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Password must be at least 8 characters.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" variant="info">Log in</Button>
                        </Form>
                    </Tab>

                    <Tab eventKey="register" title="Register">
                         {/* Register form */}
                         <Form id="register_form" onSubmit={handleRegister} noValidate validated={registerValidated}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    id="registerEmail"
                                    name="registerEmail"
                                    onChange={handleChange} 
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
                                    id="registerPw"
                                    name="registerPw"
                                    onChange={handleChange} 
                                    type="password" 
                                    placeholder="Enter password"
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
                                    onChange={handleChange} 
                                    type="password" 
                                    placeholder="Confirm password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Passwords must match.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" variant="info">Register</Button>
                        </Form>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}
