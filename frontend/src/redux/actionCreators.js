import * as actionTypes from './actionTypes';
import {/*localURL,*/ awsApiURL} from '../shared/urlList';

export const addContender = (contender) => ({
    type: actionTypes.ADD_CONTENDER,
    payload: contender
});

export const postContender = (ctdID, mail, fullName, nameread, cardName, lower, upper, watch, snstype, snsid, comments) => (dispatch) => {
    const makeSNS = (snstype, snsid) => {
        if (snstype && snstype !== "" && snstype !== "None") {
            return snstype + ": " + snsid;
        } else
            return "None";
    };

    const newContender = {
        ctdID: ctdID,
        mail: mail,
        fullName: fullName,
        howtoRead: nameread,
        cardName: cardName,
        lower: lower,
        upper: upper,
        watching: watch,
        sns: makeSNS(snstype, snsid),
        comments: comments
    };
    // newContender.date = new Date.toISOString();
    // localURL, awsApiURL
    return fetch(awsApiURL + 'entry', {
        method: "POST",
        body: JSON.stringify(newContender),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
                if (response.ok)
                    return response;
                else {
                    let error = new Error('Error' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errmsg = new Error(error.message);
                throw errmsg;
            })
        .then(response => response.json())
        .then(result => {
            dispatch(addContender(result));
            alert('GO4THETOP 3회 대회에 참가해주셔서 감사합니다! (Thank you for participating GO4THETOP 3rd Season!)')
        })
        .catch(error => {
            console.log('Failed to entry: ', error.message);
            alert('참가 신청에 실패했습니다 (Failed to register your entry)')
        });
};

export const fetchContenders = () => (dispatch) => {
    dispatch(contendersLoading(true));

    return fetch(awsApiURL + 'contenders')
        .then(response => {
                if (response.ok)
                    return response;
                else {
                    let error = new Error('Error' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errmsg = new Error(error.message);
                throw errmsg;
            })
        .then(response => response.json())
        .then(contenders => dispatch(showContenders(contenders)))
        .catch(error => dispatch(contendersFailed(error.message)));
};

export const contendersLoading = () => ({
    type: actionTypes.CONTENDERS_LOADING
});

export const contendersFailed = (errmsg) => ({
    type: actionTypes.CONTENDERS_FAILED,
    payload: errmsg
});

export const showContenders = (contenders) => ({
    type: actionTypes.SHOW_CONTENDERS,
    payload: contenders
});