import ReactDOM from 'react-dom';
import React from 'react';
import LoginTemplate from "../Components/Templates/Login/LoginTemplate";
import UserProfile from "../Components/Templates/UserProfile/UserProfile";

import logDummyUser from "../setupTests";
import HomePage from "../Components/Templates/HomePage/HomePage";
beforeEach(() => {
    logDummyUser();
})


it("renders login page without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<LoginTemplate/>, div);
});

describe("when going on a user profile", () => {
    localStorage.clear();
    it("redirects to login page if not logged in", () => {
        expect(window.location === "/login#redirect");
    });
    logDummyUser();
    it("renders user profile page without crashing", () =>{
        const div = document.createElement("div");
        ReactDOM.render(<UserProfile/>, div);
    });


})

it("Load home page without crashing", function() {
    const div = document.createElement("home");
    ReactDOM.render(<HomePage/>, div);
});
