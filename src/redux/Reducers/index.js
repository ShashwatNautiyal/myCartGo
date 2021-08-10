import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import filterReducer from "./filterReducer";

const rootreducer = combineReducers({
   cartReducer,
   filterReducer,
});

export default rootreducer;
