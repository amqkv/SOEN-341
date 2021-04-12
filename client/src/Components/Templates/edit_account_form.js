import { React, useState } from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import DialogTitle from '@material-ui/core/DialogTitle';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../Templates/Login/Templates.css"
import Alert from '@material-ui/lab/Alert';

export default function EditAccountPopup(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    
    const [editEmail, setEditEmail] = useState("");
    // const [editUsername, setEditUsername] = useState("");

    const [editOldPassword, setEditOldPassword] = useState("");
    const [editNewPassword, setEditNewPassword] = useState("");
    const [editNewPassword2, setEditNewPassword2] = useState("");

    const [currentTab, setCurrentTab] = useState("editEmail");
    const { onClose, selectedValue, open } = props;

    const [editEmailValidated, setEditEmailValidated] = useState(false);
    const [editPasswordValidated, setEditPasswordValidated] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


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
        if(editEmail.length === 0 || editOldPassword.length < 8){
            e.preventDefault();
            e.stopPropagation();
            setEditEmailValidated(true);
            if(editEmail.length === 0){
                document.getElementById("editEmail").classList.add("is-invalid");
            }
            if(editOldPassword.length < 8){
                document.getElementById("editOldEmailPassword").classList.add("is-invalid");
            }
        }
        // POST form input data to the backend 
        else{
            axios.post("http://localhost:5000/api/edit/editEmail", {newEmail: editEmail, password: editOldPassword, username: user.username})
            .then(res => {
                console.log(res);
                if(res.data.success){
                    setErrorMessage("");
                    setSuccessMessage(res.data.success);
                    window.location.href="/UserProfile/" + user.username;
                }
                else if(res.data.error){
                    setSuccessMessage("")
                    setErrorMessage(res.data.error);
                }
            })
            .catch(err => console.log(err));
        }
    }


    // Handling of edit password
    function handleEditPassword(e) {
        let oldPwIsInvalid = editOldPassword.length < 8;
        let newPwIsInvalid = editNewPassword.length < 8;
        let confirmPwInvalid = (editNewPassword2 !== editNewPassword) || editNewPassword2.length < 8 ;
        // If the email or password entered are not valid then the request will not be sent to backend
        if(oldPwIsInvalid || newPwIsInvalid || confirmPwInvalid){
            e.preventDefault();
            e.stopPropagation();
            setEditPasswordValidated(true);
            if(oldPwIsInvalid) {
                document.getElementById("oldPassword").classList.add("is-invalid");
            }
            if(newPwIsInvalid) {
                document.getElementById("newPassword").classList.add("is-invalid");
            }
            if(confirmPwInvalid){
                document.getElementById("newPassword2").classList.add("is-invalid");
            }
        }
        // POST form input data to backend
        else{
            axios.post("http://localhost:5000/api/edit/editPassword", {username: user.username, oldPassword: editOldPassword, newPassword: editNewPassword})
            .then(res => {
                console.log(res);
                if(res.data.success){
                    setSuccessMessage(res.data.success);
                    setErrorMessage("");
                    window.location.href="/UserProfile/" + user.username;
                }
                else if(res.data.error){
                    setErrorMessage(res.data.error);
                    setSuccessMessage("");
                }
            })
            .catch(err => {
                console.log (err);
            })
        }
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle>Change account settings</DialogTitle>
            {/* Display success/error messages */}
            {errorMessage === "" ? <></> : <Alert severity="error">{errorMessage}</Alert>}
            {successMessage === "" ? <></> : <Alert severity="success">{successMessage}</Alert>}
            <Tabs  activeKey={currentTab} id="login_register_tabs" onSelect={handleTabSelect}>
                {/* Form to change email */}
                <Tab eventKey="editEmail" title="Change Email">
                    <Form id="edit_account_form" validated={editEmailValidated}>
                            <Form.Group>
                                <Form.Control
                                name="editEmail"
                                id="editEmail"
                                onChange={handleChange}
                                type="email"
                                placeholder="New Email"
                            />
                            <Form.Control.Feedback type="invalid">
                                    Please enter a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                name="editOldPassword"
                                id="editOldEmailPassword"
                                onChange={handleChange}
                                type="password"
                                placeholder="Old Password"
                            />    
                            <Form.Control.Feedback type="invalid">
                                    Password must be at least 8 characters.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button onClick={handleEditEmail} variant="info" >Submit</Button>
                    </Form>
                </Tab>
                {/* Form to change password */}
                <Tab eventKey="editPassword" title="Change Password">
                    <Form id="edit_account_form" validated={editPasswordValidated}>
                        <Form.Group>
                            <Form.Control
                                name="editOldPassword"
                                id="oldPassword"
                                onChange={handleChange}
                                type="password"
                                placeholder="Old Password"
                            /> 
                            <Form.Control.Feedback type="invalid">
                                Passwprd must be at least 8 characters.
                            </Form.Control.Feedback>
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
