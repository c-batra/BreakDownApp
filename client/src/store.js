import { createStore } from "redux";
import countReducer from "./reducers/countReducer";
let store = createStore(countReducer);
export default store;
