import axios from 'axios'; //because you are making a request 

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST
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

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/likes/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/likes/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
