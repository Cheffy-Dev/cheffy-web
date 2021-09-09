import axiosClient from '../../../utils/axios-config';
import { ADD_FOOD_TO_COLLECTION, SET_ERROR_FETCHING_FOOD, SET_IS_FETCHING_FOOD } from './foodTypes';

export const setIsFetchingFood = isFetching => {
	return {
		type: SET_IS_FETCHING_FOOD,
		isFetching
	};
};

export const setErrorFetchingFood = errorFetching => {
	return {
		type: SET_ERROR_FETCHING_FOOD,
		errorFetching
	};
};

export const getPlateByID = plateID => {
	return async dispatch => {
		try {
			const res = axiosClient.get(`plate/show/${plateID}`);
			return res;
		} catch (e) {
			return Promise.reject(e);
		}
	};
};

export const addFoodToCollection = food => {
	return {
		type: ADD_FOOD_TO_COLLECTION,
		payload: food
	};
};

export const errorFetchingFood = error => {
	return dispatch => {
		dispatch(setIsFetchingFood(true));
		dispatch(setErrorFetchingFood(false));
		console.log(error);
	};
};

export const getCategory = () => {
	return async dispatch => {
		try {
			const res = axiosClient.get('/category');
			return res;
		} catch (e) {
			console.log(e);
			new Promise.reject(e);
		}
	};
};

export const fetchFood = () => {
	return async (dispatch, getState) => {
		const {
			food: {
				collection,
				status: { isFetching }
			}
		} = getState();

		if (isFetching) {
			return;
		}

		dispatch(setErrorFetchingFood(false));
		dispatch(setIsFetchingFood(true));

		const request = await axiosClient.get('plate/');
		const food = request.data;
		try {
			dispatch(addFoodToCollection(food));
			dispatch(setIsFetchingFood(false));
		} catch (error) {
			return dispatch(setErrorFetchingFood(error));
		}
	};
};
