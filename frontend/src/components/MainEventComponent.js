import React, { Component } from 'react';
import {Card, CardBody, CardText, CardTitle, CardSubtitle} from "reactstrap";
import {awsApiURL} from '../shared/urlList';

class MainEvent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contenders: []
        }
    }

    componentDidMount() {
        fetch(awsApiURL + 'contenders', {method: 'GET', credentials: 'same-origin'})
            .then(response => {
                if (response.ok) { return response; }
                else { var error = new Error('Error ' + response.status + ': ' + response.statusText)
                    error.response = response;
                    throw error;

                }
            },
            error => {
                var errmsg = new Error(error.message);
                throw errmsg
            })
            .then(response => response.json())
            .then(contenders => this.setState({
                contenders: contenders
            }))
            .catch(error => console.log(error.message));

    }

    render () {
        const contenders = this.state.contenders.map((contender) => {
            return (
                <div key={contender.id} className="col-12 m-1">
                    <Card>
                        <CardBody>
                            <CardTitle>{contender.fullName}</CardTitle>
                            <CardSubtitle>{contender.cardName}</CardSubtitle>
                            <CardText>{contender.email}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        });
        return (
            <div className="container">
                <h4>본선 진출자</h4>
                <div className="row">
                    {contenders}
                </div>
            </div>
        );
    }
}

export default MainEvent;