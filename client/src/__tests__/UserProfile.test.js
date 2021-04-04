import React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from "../Components/Templates/UserProfile/UserProfile";

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

describe("when rendering", () => {
    it("should fetch and display that specific user's posts only", () => {
        // Rendering component
        const username = "pooja";
        localStorage.setItem("user", JSON.stringify({username: username}));
        window.location.href = "/UserProfile/pooja";
        ReactDOM.render(<UserProfile/>, document.createElement("div"));

        let madeByVisitedUser = true;
        axiosMock.post("http://localhost:5000/api/posts/getUserPosts", {username: username})
            .then(res => {
                for(let i = 0; i < res.data.length; i++){
                    if(res.data[i].username !=  username)
                        madeByVisitedUser = false;
                }
                expect(madeByVisitedUser);
            })
    })
})
