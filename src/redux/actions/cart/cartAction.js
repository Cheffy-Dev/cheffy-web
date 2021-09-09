import { getSession } from "next-auth/client";
import axiosClient from "../../../utils/axios-config";
import * as types from "./cartType";

export function addToCart(param) {
  return async (dispatch) => {
    const session = await getSession();
    console.log(param.plates[0].plateId);
    dispatch({ type: types.CART_ADD_PLATE_REQUEST });
    dispatch({ type: types.CART_ADD_ITEM, payload: param.plates[0].plateId });
    dispatch({ type: types.CART_INCREASE_ITEM });
    if (session) {
      try {
        const res = await axiosClient.post("basket", param);
        dispatch({ type: types.CART_ADD_PLATE_SUCCESS, payload: res });
        return res;
      } catch (e) {
        dispatch({ type: types.CART_ADD_PLATE_FAILURE });
        return Promise.reject(e);
      }
    }
  };
}

export function addItemsToCart(param) {
  console.log("addItemsToCart");
  console.log(param);
  return async (dispatch) => {
    dispatch({ type: types.CART_ADD_MULTI_PLATE_REQUEST });
    try {
      const res = await axiosClient.post("basket", param);
      dispatch({ type: types.CART_ADD_MULTI_PLATE_SUCCESS, payload: res });
      console.log("res==>>");
      console.log(res);
      return res;
    } catch (e) {
      dispatch({ type: types.CART_ADD_MULTI_PLATE_FAILURE });
      return Promise.reject(e);
    }
  };
}

export const getUserBasket = (deliveryType) => {
  return async (dispatch) => {
    try {
      const res = axiosClient.get(`basket?deliveryType=${deliveryType}`);
      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  };
};

export function increaseItemToCart(basketItemId, deliveryType) {
  let param = {
    deliveryType: deliveryType,
  };
  return async (dispatch) => {
    dispatch({ type: types.CART_INCREASE_ITEM_REQUEST });
    try {
      const res = await axiosClient.put(`/basket/add/${basketItemId}`, param);
      dispatch({ type: types.CART_INCREASE_ITEM_SUCCESS, payload: res });
      return res;
    } catch (e) {
      dispatch({ type: types.CART_INCREASE_ITEM_FAILURE });
      return Promise.reject(e);
    }
  };
}

export function decreaseItemToCart(basketItemId, deliveryType) {
  let param = {
    deliveryType: deliveryType,
  };
  return async (dispatch) => {
    dispatch({ type: types.CART_DECREASE_ITEM_REQUEST });
    try {
      const res = await axiosClient.put(
        `/basket/subtract/${basketItemId}`,
        param
      );
      dispatch({ type: types.CART_DECREASE_ITEM_SUCCESS, payload: res });
      return res;
    } catch (e) {
      dispatch({ type: types.CART_DECREASE_ITEM_FAILURE });
      return Promise.reject(e);
    }
  };
}

export function removeInCart(basketItemId, deliveryType, plateID) {
  return async (dispatch) => {
    const session = await getSession();
    dispatch({ type: types.CART_REMOVE_PLATE_REQUEST });
    dispatch({ type: types.CART_REMOVE_ITEM, payload: plateID });
    dispatch({ type: types.CART_DECREASE_ITEM });
    if (session) {
      try {
        const res = await axiosClient.delete(`/basket/delete/${basketItemId}`, {
          data: { deliveryType: deliveryType },
        });
        dispatch({ type: types.CART_REMOVE_PLATE_SUCCESS, payload: res });
        return res;
      } catch (e) {
        dispatch({ type: types.CART_REMOVE_PLATE_FAILURE });
        return Promise.reject(e);
      }
    }
  };
}

export function setCartItems(cartitems) {
  return async (dispatch) => {
    dispatch({ type: types.CART_SET_ITEM_COUNT, payload: cartitems });
  };
}

export function setCartItemsWithSessionFlag() {
  return async (dispatch) => {
    dispatch({ type: types.CART_SET_ITEM_COUNT_WITH_SESSION_FLAG });
  };
}

export function setCartItemsWithoutSessionFlag() {
  return async (dispatch) => {
    dispatch({ type: types.CART_SET_ITEM_COUNT_WITHOUT_SESSION_FLAG });
  };
}
