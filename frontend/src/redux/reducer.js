import {STAFFS} from '../shared/staffs';
import {NOTICES} from "../shared/notices";

export const initialState = {
    notices: NOTICES,
    staffs: STAFFS
};

export const Reducer = (state = initialState, action) => {
    return state;
};