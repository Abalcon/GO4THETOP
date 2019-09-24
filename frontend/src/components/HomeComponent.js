import React from 'react';
import {Card, CardImg} from "reactstrap";

export const Home = () => {

    return (
        <div className="container">
            <div className="row col-md-10">
                <Card>
                    <CardImg top src="assets/images/G4TT_Poster.png" alt="Main"/>
                </Card>
            </div>
        </div>
    );
};