import axiosClient from "../../../utils/axios-config";
import * as types from "./userType";

export const getUserInfo = () => {
  return async (dispatch) => {
    dispatch({ type: types.USER_INFO_REQUEST });
    try {
      const res = axiosClient.get(`/user/`);
      dispatch({ type: types.USER_INFO_SUCCESS, payload: res });
      return res;
    } catch (e) {
      dispatch({ type: types.USER_INFO_FAILURE });
      return Promise.reject(e);
    }
  };
};

export const cityAction = (city="Cetreville") => { 
  return async (dispatch) => {
    try {
      if (city) {
			  dispatch({ type: types.SET_CITY, payload: city });
      } else{
			  dispatch({ type: types.GET_CITY });
      }
		} catch (e) {
      console.log(e);
		}
	}
}