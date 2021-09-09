import produce from 'immer';
import * as types from '../actions/counter/counterType';

const counterRecipe = (state = 0, { type }) => {
	switch (type) {
		case types.INCREMENT:
			return state + 1;
		case types.DECREMENT:
			return state - 1;
		case types.RESET:
			return 0;
		default:
			return state;
	}
};

export const counterReducer = produce(counterRecipe);
