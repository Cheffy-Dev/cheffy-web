import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// function loadFromLocalStorage() {
// 	try {
// 		const serializedStore = window.localStorage.getItem('store');
// 		if (serializedStore === null) return undefined;
// 		return JSON.parse(serializedStore);
// 	} catch (e) {
// 		console.log(e);
// 		return undefined;
// 	}
// }

// const persistedState = loadFromLocalStorage();

export default function configureStore(initialState) {
	return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
