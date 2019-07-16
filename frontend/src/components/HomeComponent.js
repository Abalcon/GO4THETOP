import React, { Component } from 'react';
import {Card, CardBody, CardHeader, CardText, CardTitle} from "reactstrap";

class Home extends Component {

    render () {
        const notices = this.props.notices.map((notice) => {
            let newText = notice.content.split('\n').map((item, i) => <span key={i}>{item}<br/></span>);

            return (
                <div key={notice.id} className="col-12 m-1">
                    <Card>
                        <CardHeader tag="h3">{notice.date}</CardHeader>
                        <CardBody>
                            <CardTitle tag="h5">{notice.subject}</CardTitle>
                            {/*<CardSubtitle>{notice.subject}</CardSubtitle>*/}
                            <CardText>{newText}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        });
        return (
            <div className="container">
                <h4>공지사항</h4>
                <div className="row">
                    {notices}
                </div>
            </div>
        );
    }
}

export default Home;