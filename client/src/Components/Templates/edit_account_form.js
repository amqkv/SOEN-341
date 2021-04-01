import FormData from 'form-data';
import { React, useRef, useState } from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import DialogTitle from '@material-ui/core/DialogTitle';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./Form.css";
import Alert from '@material-ui/lab/Alert';

export default function EditAccountPopup(props) {
    const [editEmail, setEditEmail] = useState("");
    const [editUsername, setEditUsername] = useState("");
    const [editOldPassword, setEditOldPassword] = useState("");
    const [editNewPassword, setEditNewPassword] = useState("");
    const [editNewPassword2, setEditNewPassword2] = useState("");
    const [currentTab, setCurrentTab] = useState("editEmail");
    const { onClose, selectedValue, open } = props;
    const [editValidated, setEditValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [editPasswordValidated, setEditPasswordValidated] = useState("false");

    // Function handling the closing of the dialog box (popup)
    const handleClose = () => {
        onClose(selectedValue);
    };

    // Storing the values of the user input on change
    function handleChange(e) {
        const { name, value } = e.target;

        switch (name) {
            case "editEmail":
                setEditEmail(value);
                break;
            case "editUsername":
                setEditUsername(value);
                break;
            case "editOldPassword":
                setEditOldPassword(value);
                break;
            case "editNewPassword":
                setEditNewPassword(value);
                break;
            case "editNewPassword2":
                setEditNewPassword2(value);
                break;
            default:
                break;
        }
    }

    // Function to handle the sliding of the tabs
    function handleTabSelect(tab){
        setCurrentTab(tab);
    }

    //Handling of edit email
    function handleEditEmail(e) {
        if(editEmail.length === 0){
            e.preventDefault();
            e.stopPropagation();
            setEditValidated(true);
        }
        //else for axios
    }

    //Handling of edit username
    function handleEditUsername(e) {
        if(editUsername.length < 5) {
            e.preventDefault();
            e.stopPropagation();
            setEditValidated(true);
        }
        //else for axios
    }

    // Handling of edit password
    function handleEditPassword(e) {
        let oldPwIsInvalid = editOldPassword.length < 8;
        let newPwIsInvalid = editNewPassword.length < 8;
        let confirmPwInvalid = editNewPassword2 !== editNewPassword;
        // If the email or password entered are not valid then the request will not be sent to backend
        if(oldPwIsInvalid || newPwIsInvalid || confirmPwInvalid){
            e.preventDefault();
            e.stopPropagation();
            if(oldPwIsInvalid) {
                document.getElementById("oldPassword").classList.add("is-invalid");
            }
            if(newPwIsInvalid) {
                document.getElementById("newPassword").classList.add("is-invalid");
            }
            if(confirmPwInvalid){
                document.getElementById("newPassword2").classList.add("is-invalid");
            }
            else {
                document.getElementById("oldPassword").classList.remove("is-invalid");
                document.getElementById("newPassword").classList.remove("is-invalid");
                document.getElementById("newPassword2").classList.remove("is-invalid");
                setEditPasswordValidated(true); 
            }      
        }
        //else for axios
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle>Change account settings</DialogTitle>
            {errorMessage === "" ? <></> : <Alert severity="error">{errorMessage}</Alert>}
            {successMessage === "" ? <></> : <Alert severity="success">{successMessage}</Alert>}
            <Tabs  activeKey={currentTab} id="login_register_tabs" onSelect={handleTabSelect}>
                    <Tab eventKey="editEmail" title="Change Email">
                    <Form id="edit_account_form">
                        <Form.Group>
                            <Form.Control
                            name="editEmail"
                            onChange={handleChange}
                            type="text"
                            placeholder="New Email"
                            />  
                            <Form.Control.Feedback type="invalid">
                                    Please enter a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button onClick={handleEditEmail} variant="info" >Submit</Button>
                    </Form>
                    </Tab>
                    <Tab eventKey="editUsername" title="Change Username">
                        <Form id="edit_account_form">
                            <Form.Group>
                               <Form.Control
                                name="editUsername"
                                onChange={handleChange}
                                type="text"
                                placeholder="New Username"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Username must be at least 5 characters.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button onClick={handleEditUsername} variant="info">Submit</Button>
                        </Form>
                    </Tab>
                    <Tab eventKey="editPassword" title="Change Password">
                        <Form id="edit_account_form">
                            <Form.Group>
                               <Form.Control
                                name="editOldPassword"
                                id="oldPassword"
                                onChange={handleChange}
                                type="password"
                                placeholder="Old Password"
                                /> 
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                name="editNewPassword"
                                id="newPassword"
                                onChange={handleChange}
                                type="password"
                                placeholder="New Password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Password must be at least 8 characters.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                name="editNewPassword2"
                                id="newPassword2"
                                onChange={handleChange}
                                type="password"
                                placeholder="Confirm Password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Passwords must match.
                                </Form.Control.Feedback>
                            </Form.Group>                            
                            <Button onClick={handleEditPassword} variant="info">Submit</Button>
                        </Form>
                    </Tab>
            </Tabs>
        </Dialog>

    );
}
