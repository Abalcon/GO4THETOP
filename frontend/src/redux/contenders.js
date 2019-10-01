import * as actionTypes from './actionTypes';

export const Contenders = (state = {
    isLoading: true,
    isProcessing: false,
    isRefresh: false,
    errMsg: null,
    contenders: []
}, action) => {
    switch (action.type) {
        case actionTypes.SHOW_CONTENDERS:
            return {...state, isLoading: false, errMsg: null, isRefresh: false, contenders: action.payload};
        case actionTypes.REFRESH_CONTENDERS:
            return {...state, isLoading: false, errMsg: null, isRefresh: true, contenders: action.payload};
        case actionTypes.CONTENDERS_LOADING:
            return {...state, isLoading: true, isProcessing: false, errMsg: null, contenders: []};
        case actionTypes.CONTENDERS_FAILED:
            return {...state, isLoading: false, errMsg: action.payload, contenders: []};
        case actionTypes.ADD_CONTENDER:
            var contender = action.payload;
            //console.log("Here comes a new contender: " + contender);
            return {...state, contenders: state.contenders.concat(contender)};
        case actionTypes.ADD_HEATRECORD:
        case actionTypes.ADD_COMMITMENT:
            return {...state, isProcessing: true};
        default:
            return state;
    }
};