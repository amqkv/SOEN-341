import ReactDOM from 'react-dom';
import React from 'react';
import HomePage from "../Components/Templates/HomePage/HomePage";
import LoginTemplate from "../Components/Templates/Login/LoginTemplate";
import UserProfile from "../Components/Templates/UserProfile/UserProfile";

it("renders login page without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<LoginTemplate/>, div);
});
