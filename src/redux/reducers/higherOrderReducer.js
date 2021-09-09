export const createCollectionReducer = type => {
	return (state = [], action) => {
		switch (action.type) {
			case `ADD_${type}_TO_COLLECTION`:
				return state.concat(action.payload);
			default:
				return state;
		}
	};
};

export const createStatusReducer = type => {
	const initialState = {
		isFetching: false,
		errorFetching: false
	};
	return (state = initialState, action) => {
		switch (action.type) {
			case `SET_IS_FETCHING_${type}`:
				return Object.assign({}, state, {
					isFetching: action.isFetching
				});
			case `SET_ERROR_FETCHING_${type}`:
				return Object.assign({}, state, {
					errorFetching: action.errorFetching
				});
			default:
				return state;
		}
	};
};
