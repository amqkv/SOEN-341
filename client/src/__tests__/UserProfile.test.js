import React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from "../Components/Templates/UserProfile/UserProfile";

// Checking if the component renders
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
