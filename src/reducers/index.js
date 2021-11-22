import { combineReducers } from "redux";
import chatControlReducers from "./chatControlReducers";
import userReducer from "./userReducer";




export default combineReducers({
    controls : chatControlReducers,
    user : userReducer,
})

