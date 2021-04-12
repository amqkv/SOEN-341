// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const userData = require("./__tests__/user.json");

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;

//log a user in
export default function LogDummyUser() {
    //console.log(userData);
    global.localStorage.setItem("user", JSON.stringify(userData));
    //console.log(global.localStorage.getItem("user"));
}

console.log("Setup file has been executed");