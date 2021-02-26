import FormData from 'form-data'
import {React, useRef,useState} from 'react';
import axios from 'axios';

export default function CreatePost(){
    const fileInput = useRef(null);
    const [caption,setInputValue] = useState("");
    
    // Storing the values of the user input on change
    function handleChange(e){
        console.log(e)
        setInputValue(e.target.value)
    }
    
    // Handling of submittion
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

        // Send data to backend
        axios.post("/api/posts/addPost", data, {
          headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          }
        }).then(res => { console.log(res) })
        .catch(error => { console.log(error.response) });
 
    }

    return(
        <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input type="text" value={caption} onChange={handleChange} />
        </label>
      <label>
        Upload file:
        <input type="file" ref={fileInput} name="post_picture"/>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    );
}