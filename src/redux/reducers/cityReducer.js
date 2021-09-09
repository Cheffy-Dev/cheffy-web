import * as types from "../actions/user/userType";

const cityReducer = (state = { city: "Centreville" }, action) => {
  switch (action.type) {
    case types.SET_CITY:
      return { ...state, city: action.payload };
    default:
      return {...state};
  }
};

export default cityReducer;
