import React from 'react';
import ReactDOM from 'react-dom';
import UserProfile, { checkFollow } from "../Components/Templates/UserProfile/UserProfile";

import { render, screen } from '@testing-library/react';
import axiosMock from 'axios';
import axios from "axios";

jest.mock("axios");

describe("when a user's profile url is entered", () => {
    window.location.href = "/UserProfile/pooja";
        it("should redirect to login page if not logged in", () => {
            localStorage.clear();
            expect(window.location === "/login#redirect");
        });
        it("should render user profile without crashing if user is logged in",() => {
            const div = document.createElement("div");
            localStorage.setItem("user", JSON.stringify({username: "pooja"}));
            ReactDOM.render(<UserProfile/>, div);
        });
});

// test("check folow", () => {
//     const usernames = { currentUsername: "pooja", visitedUsername: "pooja" }
//     const followersList = checkFollow().followersList;
//     let follows = false;
//     for(let i = 0; i < followersList.length; i++){
//         if(followersList.includes("pooja")){
//             follows = true; 
//         }
//     }
//     expect(follows);
// })
// describe("when rendering", () => {
//     it("should fetch and display that specific user's posts only", async () => {
//         // Rendering component
//         const username = "pooja";
//         localStorage.setItem("user", JSON.stringify({username: username}));
//         window.location.href = "/UserProfile/pooja";
//         let madeByVisitedUser = true;
//         axios.post("http://localhost:5000/api/posts/getUserPosts", {username: username})
//             .then(res => {
//                 for(let i = 0; i < res.data.length; i++){
//                     if(res.data[i].username !=  username)
//                         madeByVisitedUser = false;
//                 }
//                 expect(madeByVisitedUser);
//             })
//     })
// })
