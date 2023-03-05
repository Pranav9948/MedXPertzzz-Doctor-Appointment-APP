import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  generalReducers,
 
} from "./reducers/generalReducer";

import {loginReducers} from './reducers/userReducers'


// import { ViewAllApprovedDoctorsReducers } from "./redux/reducers/usersReducer";

const reducer = combineReducers({

    general:generalReducers,
    userlogin:loginReducers,
 
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
