import ReactDOM from 'react-dom';
import React from 'react';
import {Header, Footer, UserProfile, LoginTemplate, HomePage} from "../Components/index";
import {screen, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import logDummyUser from "../setupTests";

beforeEach(() => {
    logDummyUser();
})


it("renders login page without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<LoginTemplate/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe("when going on a user profile", () => {
    //Will make user be null so the redirect happens
    // we need to save the original object for later to not affect tests from other files
    const realLocation = window.location
    beforeAll(() => {
        delete window.location
        window.location = { assign: jest.fn(), href: realLocation.href }
    })
    afterAll(() => {
        window.location = realLocation
    })
    it("redirects to login page if not logged in", () => {
        localStorage.clear();
        render(<UserProfile/>);
        expect(window.location.assign).toHaveBeenCalled()
    });
    it("renders user profile page without crashing", () =>{
        logDummyUser();
        const div = document.createElement("div");
        ReactDOM.render(<UserProfile/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})

it("renders home page without crashing", function() {
    const div = document.createElement("home");
    ReactDOM.render(<HomePage/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe("Test Header Component", () => {
    const sections = [
        { title: 'Please', url: '#' },
        { title: 'Give', url: '#' },
        { title: 'Us', url: '#' },
        { title: 'A', url: '#' },
        { title: 'Good', url: '#' },
        { title: 'Grade', url: '#' },
        { title: 'Because', url: '#' },
        { title: 'We', url: '#' },
        { title: 'Worked', url: '#' },
        { title: 'Hard', url: '#' },
    ];
    const realLocation = window.location
    beforeAll(() => {
        delete window.location
        window.location = { assign: jest.fn(), href: realLocation.href, open: jest.fn() }
    })
    afterAll(() => {
        window.location = realLocation
    })

    it("renders header without crashing", function() {
        const div = document.createElement("home");

        ReactDOM.render(<Header sections={sections}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it("logout using the button in the header", () =>{
        render(<Header sections={sections}/>)
        userEvent.click(screen.getByText('Logout'))
        expect(window.location.assign).toHaveBeenCalled();
    });
    it("go to repo using the button in the header", () =>{
        render(<Header sections={sections}/>)
        window.open = jest.fn();
        const spy = jest.spyOn(window, "open")
        userEvent.click(screen.getByText('The Github Repo'))
        expect(spy).toBeCalled()
    });
});
it("renders footer without crashing", function() {
    const div = document.createElement("home");
    ReactDOM.render(<Footer/>, div);
    ReactDOM.unmountComponentAtNode(div);
});


