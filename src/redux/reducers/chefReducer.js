import produce from 'immer';
import * as types from '../actions/chef/chefType';
//
const initialState = { plates: { data: [] } };
//
const chefRecipe = (draft = initialState, action) => {
	switch (action.type) {
		case types.CHEF_PLATES_SUCCESS:
			draft.plates = action.payload;
			return draft;
		default:
			return draft;
	}
};

export const chefReducer = produce(chefRecipe);
