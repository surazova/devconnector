import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User 
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData) // Registers and then redirects to the login
    .then(res => history.push('/login')) // ajax call and waiting for response 
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    ); // asynch call
};


// Login - Get user token 
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      // Save to local storage 
      const { token } = res.data;
      // Set token to local storage
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data 
      const decoded = jwt_decode(token);
      // Set current user 
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
};

// Set logged in user 
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Logout User 
export const logoutUser = () => dispatch => {
  // Remove token from local storage 
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests 
  setAuthToken(false); //token will not to attached to future requests 
  // Set current user to {} which will set isAuthenticated to false 
  dispatch(setCurrentUser({}));
}
