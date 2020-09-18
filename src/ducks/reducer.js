const initialState = {
  username: "",
  proPic: "",
  userId: 0,
};

const LOGIN_USER = "LOGIN_USER";

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log(action.payload);
      return {
        ...state,
        username: action.payload.username,
        proPic: action.payload.proPic,
        userId: action.payload.userId,
      };
    default:
      return state;
  }
}

export function loginUser(username, proPic, userId) {
  return {
    type: LOGIN_USER,
    payload: {
      username: username,
      proPic: proPic,
      userId: userId,
    },
  };
}
