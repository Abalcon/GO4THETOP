import * as actionTypes from './actionTypes';
import {localURL, awsApiURL} from '../shared/urlList';

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
                    //console.log(response);
                    let error = new Error('Error' + response.status + ': ' + response.statusText + ' - ' + response.body);
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
            //console.log('Failed to entry: ', error.message);
            alert('참가 신청에 실패했습니다 (Failed to register your entry)')
        });
};

export const fetchContenders = (isRefresh) => (dispatch) => {
    dispatch(contendersLoading(true));

    return fetch(awsApiURL + 'contenders')
        .then(response => {
                if (response.ok)
                    return response;
                else {
                    //console.log(response);
                    let error = new Error('Error' + response.status + ': ' + response.statusText + ' - ' + response.body);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errmsg = new Error(error.message);
                throw errmsg;
            })
        .then(response => response.json())
        .then(contenders => {
            if (isRefresh)
                dispatch(refreshContenders(contenders));
            else
                dispatch(showContenders(contenders));
        })
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

export const refreshContenders = (contenders) => ({
    type: actionTypes.REFRESH_CONTENDERS,
    payload: contenders
});

export const addHeatRecord = () => ({
    type: actionTypes.ADD_HEATRECORD
});

export const postHeatRecord = (cardName, division, image1, image2) => (dispatch) => {
    dispatch(addHeatRecord(true));

    function extractImageFile(image) {
        if (image !== undefined) {
            return image[0];
        }
        return null;
    }

    const newHeatRecord = {
        cardName: cardName,
        division: division,
        image1: extractImageFile(image1),
        image2: extractImageFile(image2)
    };

    let images = new FormData();
    images.append(newHeatRecord.division + "1", new Blob([newHeatRecord.image1]), newHeatRecord.image1.name);
    if (newHeatRecord.image2 != null)
        images.append(newHeatRecord.division + "2", new Blob([newHeatRecord.image2]), newHeatRecord.image2.name);
    // newContender.date = new Date.toISOString();
    // localURL, awsApiURL
    return fetch(awsApiURL + 'preliminary/' + newHeatRecord.division + '?cardName=' + newHeatRecord.cardName, {
        method: "POST",
        body: images,
        // headers: {
        //     "Content-Type": "multipart/form-data"
        // },
        credentials: "same-origin"
    })
        .then(response => {
                if (response.ok) {
                    //console.log('Yes we get response!');
                    alert('기록 제출에 성공했습니다! (Succeed to submit your records!)');
                    dispatch(fetchContenders(true));
                } else {
                    response.json().then(message => {
                        //console.log(message);
                        alert('기록 제출에 실패했습니다. 다시 시도하시기 바랍니다 (Failed to submit your records, please try again): ' + message.message);
                        dispatch(fetchContenders(false));
                    })
                }
            },
            error => {
                let errmsg = new Error(error.message);
                throw errmsg;
            })
        .catch(error => {
            //console.log('Failed to submit: ', error.message);
            alert('기록 제출에 실패했습니다. 다시 시도하시기 바랍니다 (Failed to submit your records, please try again): ' + error.message);
            dispatch(fetchContenders(false));
        });
};