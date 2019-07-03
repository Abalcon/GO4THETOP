import React, { Component } from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody } from 'reactstrap';

class Credits extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render () {
        const credits = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className="row">
                    <div className="col-12 col-sm-4 col-md-3 col-lg-2 my-0 my-sm-2">
                        <Card>
                            <CardImg top src={staff.image} alt={staff.name} />
                            {/*<CardBody>*/}
                            {/*    <CardTitle>{staff.name}</CardTitle>*/}
                            {/*    <CardText>{staff.description}</CardText>*/}
                            {/*</CardBody>*/}
                        </Card>
                    </div>
                    <div className="col-12 col-sm-8 col-md-9 col-lg-10 mb-2 mt-sm-2">
                        <Card>
                            <CardHeader tag="h3">{staff.name}</CardHeader>
                            <CardBody>
                                {/*<CardTitle>{staff.name}</CardTitle>*/}
                                <CardText>{staff.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            );
        });

        return (
            <div className="container">
                <h4>주최팀 소개</h4>
                <p>Go4TheTop 3회를 주최하는 팀을 소개합니다!</p>
                {credits}
            </div>
        );
    }
}

export default Credits;