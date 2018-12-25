import axios from 'axios'; //because you are making a request 

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING
}
from './types';

// Add Post 
export const addPost = postData => dispatch => { // asynch request, need dispatch
  axios
    .post('/api/posts', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Get Post 
export const getPost = () => dispatch => { // asynch request, need dispatch
  dispatch(setPostLoading);
  axios
    .get('/api/posts') // not passing any data
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    )
}

// Set loading state
export const setPostLoading = () = {
  return {
    type: POST_LOADING
  }
}
