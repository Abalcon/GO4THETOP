import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Notices} from "./notices";
import {Staffs} from "./staffs";
import {Contenders} from "./contenders";
//import {localizeReducer} from "react-localize-redux";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            notices: Notices,
            staffs: Staffs,
            contenders: Contenders
            //,localize: localizeReducer
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};