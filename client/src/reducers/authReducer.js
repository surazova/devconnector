const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) { //where testing happens
  switch (action.type) {
    default: return state;
  }
}
