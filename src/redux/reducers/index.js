import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import cartReducer from './cartReducer';
import { chefReducer } from './chefReducer';
import { counterReducer } from './counterReducer';
import foodReducer from './foodReducer';
import cityReducer from './cityReducer';

const rootReducer = combineReducers({
	food: foodReducer,
	counter: counterReducer,
	auth: authReducer,
	chef: chefReducer,
	cart: cartReducer,
	city: cityReducer
});

export default rootReducer;
