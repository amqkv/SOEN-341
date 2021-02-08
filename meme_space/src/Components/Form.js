import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './Form.css';

let form = [{id:1, as:"input", type:"email", placeholder:"Enter email", label:"Email"},
            {id:2, as:"input", type:"password", placeholder:"Password", label:"Password"},
    ];

export default function Forms(props){
    return(
        <Form id={props.form_id}>
            {form.map(form_group => 
            {
                if(form_group.type === "email"){
                    return(
                        <Form.Group>
                            <Form.Label>{form_group.label}</Form.Label>
                            <Form.Control type={form_group.type} placeholder={form_group.placeholder} />
                        </Form.Group>
                    )
                }
                else if(form_group.type === "password"){
                    return(
                        <Form.Group>
                            <Form.Label>{form_group.label}</Form.Label>
                            <Form.Control type={form_group.type} placeholder={form_group.placeholder}/>
                        </Form.Group>
                    )
                }
            })}
            <Button variant="info">{props.confirmation_btn_label}</Button>
        </Form>
    );
}