import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Credits extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render () {
        const credits = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={staff.image} alt={staff.name} />
                        <CardBody>
                            <CardTitle>{staff.name}</CardTitle>
                            <CardText>{staff.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <h4>주최팀 소개</h4>
                <p>Go4TheTop 3회를 주최하는 팀을 소개합니다!</p>
                <div className="row">
                    {credits}
                </div>
            </div>
        );
    }
}

export default Credits;