import * as types from './counterType';

export const incrementCount = () => ({ type: types.INCREMENT });

// DECREMENT COUNTER BY 1
export const decrementCount = () => ({ type: types.DECREMENT });

export const resetCount = () => ({ type: types.RESET });
