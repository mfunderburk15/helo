const initialState = {
  username: "",
  profile_pic: "",
};

const UPDATE_USER = "UPDATE_USER";
const LOGOUT = "LOGOUT";

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        username: action.payload.username,
        profile_pic: action.payload.profile_pic,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
