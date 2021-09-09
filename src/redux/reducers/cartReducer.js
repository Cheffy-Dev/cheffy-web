import * as types from '../actions/cart/cartType';

const INITIAL_STATE = {
	items: [],
	cart: [],
	itemCount: 0,
	cartItemSetWithSessionFlag: false,
	cartItemSetWithoutSessionFlag: false
};
const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.CART_ADD_ITEM:
			// Great Item data from products array
			const item = {
				ordered: 1,
				plateId: action.payload
			};
			// Check if Item is in cart already
			const inCart = state.cart.find(item => (item.plateId === action.payload ? true : false));
			return {
				...state,
				cart: inCart ? state.cart : [...state.cart, item]
			};
			break;
		case types.CART_REMOVE_ITEM:
			return {
				...state,
				cart: state.cart.filter(item => item.plateId !== action.payload)
			};
			break;
		case types.CART_INCREASE_ITEM:
			return {
				...state,
				itemCount: state.cart.length
			};
			break;
		case types.CART_DECREASE_ITEM:
			return {
				...state,
				itemCount: state.cart.length
			};
			break;
		case types.CART_SET_ITEM_COUNT:
			return {
				...state,
				cart: action.payload,
				itemCount: action.payload.length
			};
			break;
		case types.CART_SET_ITEM_COUNT_WITH_SESSION_FLAG:
			return {
				...state,
				cartItemSetWithSessionFlag: true
			};
			break;
		case types.CART_SET_ITEM_COUNT_WITHOUT_SESSION_FLAG:
			return {
				...state,
				cartItemSetWithoutSessionFlag: true
			};
			break;
		default:
			return state;
	}
};

export default cartReducer;

// const cartCounter = (state = 0, { type }) => {
//   switch (type) {
//     case "CART_ITEM_ADD":
//       console.log("Adding.!",state+1,state)
//       console.log(window.localStorage.getItem("cartitems"))
//       return state+1;
//     case "CART_ITEM_REMOVE":
//       return state - 1;
//     default:
//       return state;
//   }
// };

// export const cartReducer = produce(cartCounter);
