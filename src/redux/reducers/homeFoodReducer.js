import { POPULAR_AND_NEW_ERROR, POPULAR_AND_NEW_REQUEST, POPULAR_AND_NEW_SUCCESS } from '../actions/food/foodTypes';

const initialState = {
	loadingStatus: 'INIT',
	isLoading: false,
	data: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case POPULAR_AND_NEW_REQUEST:
			return {
				...state,
				loadingStatus: 'LOADING',
				isLoading: true
			};
		case POPULAR_AND_NEW_SUCCESS:
			return {
				...state,
				loadingStatus: 'SUCCESS',
				isLoading: false,
				data: action.payload
			};
		case POPULAR_AND_NEW_ERROR:
			return {
				...state,
				loadingStatus: 'ERROR',
				isLoading: false
			};
		default:
			return state;
	}
}
