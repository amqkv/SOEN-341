import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import DisplayImage from "./DisplayImage";
import {makeStyles, TextField} from "@material-ui/core";
import {Form} from "react-bootstrap";
import {handleSubmit} from "./HandleSubmit";
import Button from "@material-ui/core/Button";

export function AddPhotoDialog(props) {
    const {onClose, open} = props;


    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
                display: "flex",
            },
        },
    }));

    const classes = useStyles();

    const handleClose = () => {
        onClose();
    };

    return (

        <Dialog onClose={handleClose}
                aria-labelledby="adding-photo-dialog"
                open={open}
                fullWidth={true}
                maxWidth= "sm" >

            <Form id="image_submited" noValidate
            >

                <DisplayImage />
                <TextField
                    id="image-description"
                    name="ImageDescription"
                    label="Description"
                    variant="outlined"
                    multiline={true}
                />


            </Form>
            <Button onClick={handleSubmit()}>Add picture</Button>




        </Dialog>
    );
}

AddPhotoDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
}

