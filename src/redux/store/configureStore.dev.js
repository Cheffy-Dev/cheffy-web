import { applyMiddleware, createStore } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
//import { loadingBarMiddleware } from 'react-redux-loading-bar';
import rootReducer from '../reducers';
const logger = createLogger({
	collapsed: true
});
const loadState = () => {
	try {
		const serializedState = localStorage.getItem('cartitems');
		if (serializedState === null) {
			console.log('null');
			return undefined;
		}
		console.log(serializedState);
		return JSON.parse(serializedState);
	} catch (e) {
		return undefined;
	}
};

const persistedState = loadState();
export default function configureStore(initialState) {
	return createStore(rootReducer, initialState, applyMiddleware(thunk, reduxImmutableStateInvariant(), logger));
}
