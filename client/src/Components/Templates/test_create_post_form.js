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
        // axios.post("api/users/login", { username: loginEmail, password: loginPw })
        // .then(res => { console.log(res) })
        // .catch(error => { console.log(error) });
    }

    return(
        <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={caption} onChange={handleChange} />
        </label>
      <label>
        Upload file:
        <input type="file" ref={fileInput} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    );
}