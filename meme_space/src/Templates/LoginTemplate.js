import React from 'react';
import Form from '../Components/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './Templates.css';

export default function LoginTemplate(){
    return(
        <div id="Login_Template">
            <div id="login_register_form_container">
                <Tabs defaultActiveKey="login" id="login_register_tabs">
                    <Tab eventKey="login" title="Log in">
                        <Form
                            form_id="login_form" 
                            confirmation_btn_label="Log in"
                            form_url="https://raw.githubusercontent.com/amqkv/341-json-objects/main/login_form.json"
                        />
                    </Tab>
                    <Tab eventKey="register" title="Register">
                        <Form
                            form_id="register_form"
                            confirmation_btn_label="Sign up"
                            form_url="https://raw.githubusercontent.com/amqkv/341-json-objects/main/register_form.json"
                        />
                    </Tab>
                </Tabs>
            </div>

        </div>

    );
}
