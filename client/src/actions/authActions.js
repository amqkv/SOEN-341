import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER,USER_LOADING } from "./types";
import Alert from 'react-bootstrap/Alert';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/register", userData)
    .then(res => {
      console.log(res);
      history.push("/login");
    }) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: ((err || {}).response || {}).data || { Error: "Unexpected Error"}

      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  console.log("loginUser")
  axios
    .post("http://localhost:5000/api/users/login", userData)
    .then(res => {
      console.log(res);
      console.log("???????")
      if(res.status === 200){
        // Save to localStorage & Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
      }
    })
    .catch(err =>{
      console.log("error");
      dispatch({
        type: GET_ERRORS,
        payload: ((err || {}).response || {}).data || <Alert variant="danger">Incorrect login credentials! </Alert>
      })

    }
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};