import {CONTENDERS} from "../shared/contenders";
import * as actionTypes from './actionTypes';

export const Contenders = (state = CONTENDERS, action) => {
    switch (action.type) {
        case actionTypes.ADD_CONTENDER:
            var contender = action.payload;
            contender.id = state.length + 1; //FIXME: DB에서 다루는 부분
            contender.date = new Date().toISOString(); //FIXME: DB에서 다루는 부분
            return state.concat(contender);
        default:
            return state;
    }
};