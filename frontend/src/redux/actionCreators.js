import * as actionTypes from './actionTypes';

export const addContender = (ctdID, mail, fullName, cardName, lower, upper, watch, snstype, snsid, comments) => ({
    type: actionTypes.ADD_CONTENDER,
    payload: {
        ctdID: ctdID,
        mail: mail,
        fullName: fullName,
        cardName: cardName,
        lower: lower,
        upper: upper,
        watch: watch,
        snstype: snstype,
        snsid: snsid,
        comments: comments
    }
});