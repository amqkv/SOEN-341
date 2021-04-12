import React from 'react';
import {HomePage} from '../Components/index';
import ReactDOM from "react-dom";
import {render, screen} from '@testing-library/react'

import logDummyUser from "../setupTests";
beforeEach(() => {
    logDummyUser();
})


describe("post feed request", () => {
    it("renders the homepage", () => {
        const div = document.createElement("home");
        ReactDOM.render(<HomePage/>, div);
        ReactDOM.unmountComponentAtNode(div)
    });
    it("HomePage loads with posts in the feed that belong to the users on the follow list" , () => {
        const postSpy = jest.spyOn(React, "useEffect");
        const div = document.createElement("home");
        ReactDOM.render(<HomePage/>, div);
        expect(postSpy).toHaveBeenCalled();

        postSpy.mockRestore();
    });
});