import axios from 'axios';
import { GET_ERRORS } from './types';

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
