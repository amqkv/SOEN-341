import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import './Form.css';

// let login_form = [{id:1, as:"input", type:"email", placeholder:"Enter email", label:"Email"},
//                   {id:2, as:"input", type:"password", placeholder:"Password", label:"Password"},
//                 ];
// let register_form = [{id: 1, as: "input", type: "email", placeholder: "Enter email", label: "Email"},
//                      {id: 2, as: "input", type: "text", placeholder: "Enter usernamne", label: "Username"},
//                      {id: 3, as: "input", type: "text", placeholder: "Enter full name", label: "Full name"},
//                      {id: 4, as: "input", type:"password", placeholder:"Password", label:"Password"},
// ];

export default function Forms(props){
    const [form, setForm] = useState([]);

    useEffect(() => {
        axios.get(props.form_url)
            .then(response => {
                setForm(response.data);
            })
    })
    console.log(form)
    return(
        <Form id={props.form_id}>
            {form.map(form_group => 
                <Form.Group>
                    <Form.Label>{form_group.label}</Form.Label>
                    <Form.Control type={form_group.type} placeholder={form_group.placeholder}/>
                </Form.Group>
                    )
            }
            <Button variant="info">{props.confirmation_btn_label}</Button>
        </Form>
    );
}