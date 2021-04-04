import ReactDOM from 'react-dom';
import React from 'react';
import HomePage from "../Components/Templates/HomePage/HomePage";
import LoginTemplate from "../Components/Templates/Login/LoginTemplate";
import UserProfile from "../Components/Templates/UserProfile/UserProfile";

it("renders login page without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<LoginTemplate/>, div);
});

// describe("when going on a user profile", () => {
//     // ReactDOM.render(<UserProfile/>);
//     window.location.href = "/UserProfile/pooja"
//     if(localStorage.getItem("user") == null){
//         it("redirects to login page if not logged in", () => {
//             expect(window.location === "/login#redirect");
//         });
//     }else{
//         it("renders user profile page without crashing", () =>{
//             expect(window.location.href.toUpperCase().includes(("/UserProfile")).toUpperCase())
//         });
//     }
// }) 
