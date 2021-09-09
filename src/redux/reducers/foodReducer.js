import { combineReducers } from 'redux';
import { createCollectionReducer, createStatusReducer } from './higherOrderReducer';

const foodReducer = combineReducers({
	collection: createCollectionReducer('FOOD'),
	status: createStatusReducer('FOOD')
});

export default foodReducer;
