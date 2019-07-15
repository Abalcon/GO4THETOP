import {createStore, combineReducers} from "redux";
import {Notices} from "./notices";
import {Staffs} from "./staffs";
import {Contenders} from "./contenders";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            notices: Notices,
            staffs: Staffs,
            contenders: Contenders
        })
    );

    return store;
};