import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to every request 
    axios.default.headers.common['Authorization'] = token;

  }
  else {
    // Delete Auth Header if token is not there 
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
