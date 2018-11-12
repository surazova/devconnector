import { GET_ERRORS } from '../actions/types';
const initialState = {};

export default function(state = initialState, action) { //where testing happens
  switch (action.type) {
    case GET_ERRORS:
      return action.payload; // Payload will include the errors object, which comes from the server
    default:
      return state;
  }
}
