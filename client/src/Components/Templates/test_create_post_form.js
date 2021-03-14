import FormData from 'form-data'
import {React, useRef,useState} from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./Form.scss";

export default function CreatePost(props){
    const fileInput = useRef(null);
    const [caption,setInputValue] = useState("");
    const { onClose, selectedValue, open } = props;

    // Function handling the closing of the dialog box (popup)
    const handleClose = () => {
      onClose(selectedValue);
    };

    // Storing the values of the user input on change
    function handleChange(e){
        console.log(e)
        setInputValue(e.target.value)
    }
    
    // Handling of submition
    function handleSubmit(event) {
        event.preventDefault();
        console.log(fileInput)

        // Groom data obtained from front end

        // TODO verify file is not empty, etc.

        var data = new FormData();
        data.append("ownerID",123124)
        data.append("description",caption)
        data.append("image",fileInput.current.files[0].name)
        data.append('file', fileInput.current.files[0]);
        data.append('username', JSON.parse(localStorage.getItem("user")).username);

        // Send data to backend
        axios.post("/api/posts/addPost", data, {
          headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          }
        }).then(res => { 
          console.log(res) 
          window.location.href="/Home"
        })
        .catch(error => { console.log(error.response) });
    }

    return(
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle>Create a post</DialogTitle>
          <Form id="create_post_form" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Upload photo</Form.Label>
              <Form.Control 
                type="file"
                ref={fileInput}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Caption</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={caption}
                type="text"
                placeholder="Write a caption..."
              />
            </Form.Group>
        <Button variant="info" type="submit" disabled={caption.length === 0 ? true : false}>Submit</Button>
      </Form>
      </Dialog>

    );
}