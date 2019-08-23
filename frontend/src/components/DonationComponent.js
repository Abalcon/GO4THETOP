import React from 'react';
import {Card, CardImg} from "reactstrap";

export const Donation = (props) => {

    return (
        <div className="container">
            <div className="row col-md-10">
                <Card>
                    <CardImg top src="assets/images/Donation.jpeg" alt="Donation"/>
                </Card>
            </div>
        </div>
    );
};