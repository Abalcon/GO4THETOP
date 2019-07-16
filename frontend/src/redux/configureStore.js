import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Notices} from "./notices";
import {Staffs} from "./staffs";
import {Contenders} from "./contenders";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            notices: Notices,
            staffs: Staffs,
            contenders: Contenders
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};