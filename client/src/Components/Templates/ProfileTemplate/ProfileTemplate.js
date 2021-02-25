import { React, useEffect } from 'react';
import Button from 'react-bootstrap/Button'

export default function Profile(props){
    // Checking the backend to see if the user is logged in
    useEffect(() => {
        if(localStorage.getItem("user") === null)
            window.location = "/login#redirect";
    }, [])

    function handleLogout(){
        props.handleUser(null);
        localStorage.clear();
        console.log(localStorage.getItem("user"))
        window.location = "/login";
    }

    return(
        <div>
            <h1>Insert profiler here lmao</h1>
            <Button onClick={handleLogout} variant="secondary">Logout</Button>
        </div>
    )
}