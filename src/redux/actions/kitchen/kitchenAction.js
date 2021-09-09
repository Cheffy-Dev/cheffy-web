import axiosClient from '../../../utils/axios-config';
import * as types from "./kitchenType";


export const getKitchenByName = kitchenName => {
	return async dispatch => {
		try {
      const res = await fetch(
        `https://cheffyus-api.herokuapp.com/kitchens/?name=${encodeURIComponent(
          kitchenName
        )}`
      ).then((res) => res.json())
      .then(res => res[0].kitchen)

      return res
		} catch (e) {
			return Promise.reject(e);
		}
	};
};

export const getKitchenByID = (kitchenid) => {
  return async (dispatch) => {
    try {
      const res = axiosClient.get(`kitchen/show/${kitchenId}`);
      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  };
};