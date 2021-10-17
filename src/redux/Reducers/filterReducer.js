import { CATEGORY_FILTER, PRICE_FILTER, RANGE_FILTER } from "../Actions";

const initialState = {
	price: "default",
	category: "all",
	range: "none",
};

const filterReducer = (state = initialState, action) => {
	switch (action.type) {
		case PRICE_FILTER:
			return {
				...state,
				price: action.payload,
			};
		case CATEGORY_FILTER:
			return {
				...state,
				category: action.payload,
			};
		case RANGE_FILTER:
			return {
				...state,
				range: action.payload,
			};
		default:
			return state;
	}
};

export default filterReducer;
