import React from 'react';
import {Spinner} from 'reactstrap'

export const Loading = () => {
    return (
        <div className="col-12" style={{textAlign: "center"}}>
            {/*<span className="fa fa-spinner fa-pulse fa-10x fa-fw text-primary"/>*/}
            <Spinner style={{width: '10rem', height: '10rem'}} color="primary"/>
            <h3>Please Wait...</h3>
        </div>
    );
};