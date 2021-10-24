import {
	ADD_TO_CART,
	DECREMENT_QUANTITY,
	INCREMENT_QUANTITY,
	REMOVE_FROM_CART,
	SET_CART_PRODUCTS,
	SET_PRODUCTS,
} from "../Actions";

const initialState = {
	products: null,
	cart: [],
};

const cartReducer = (state = initialState, action) => {
	console.log(action);

	let newCart;
	let index;
	switch (action.type) {
		case SET_PRODUCTS:
			return {
				...state,
				products: action.payload,
			};
		case SET_CART_PRODUCTS:
			return {
				...state,
				cart: action.payload,
			};
		case ADD_TO_CART:
			newCart = [...state.cart];
			index = newCart.findIndex((item) => item._id === action.payload._id);

			if (index < 0) {
				newCart.push({ ...action.payload, quantity: 1 });
			} else {
				const updatedItem = {
					...newCart[index],
				};

				updatedItem.quantity++;
				newCart[index] = updatedItem;
			}
			return { ...state, cart: newCart };
		case REMOVE_FROM_CART:
			newCart = [...state.cart];

			index = newCart.findIndex((item) => item._id === action.payload);
			newCart.splice(index, 1);

			return {
				...state,
				cart: newCart,
			};
		case INCREMENT_QUANTITY:
			newCart = [...state.cart];
			index = newCart.findIndex((item) => item._id === action.payload);

			const incrementedItem = {
				...newCart[index],
			};

			incrementedItem.quantity++;
			newCart[index] = incrementedItem;

			return { ...state, cart: newCart };
		case DECREMENT_QUANTITY:
			newCart = [...state.cart];
			index = state.cart.findIndex((item) => item._id === action.payload);

			const decrementedItem = {
				...state.cart[index],
			};

			decrementedItem.quantity--;
			newCart[index] = decrementedItem;

			return { ...state, cart: newCart };
		default:
			return {
				...state,
			};
	}
};

export default cartReducer;
