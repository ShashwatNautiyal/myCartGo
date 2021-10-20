import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import filterReducer from "./filterReducer";
import authReducer from "./authReducer";

const rootreducer = combineReducers({
	cartReducer,
	filterReducer,
	authReducer,
});

export default rootreducer;
