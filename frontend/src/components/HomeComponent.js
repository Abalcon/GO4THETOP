import React, { Component } from 'react';
import {Card, CardBody, CardText, CardTitle, CardSubtitle} from "reactstrap";

class Home extends Component {

    render () {
        const notices = this.props.notices.map((notice) => {
            let newText = notice.content.split ('\n').map ((item, i) => <p key={i}>{item}</p>);
            return (
                <div key={notice.id} className="col-12 m-1">
                    <Card>
                        <CardBody>
                            <CardTitle>{notice.date}</CardTitle>
                            <CardSubtitle>{notice.subject}</CardSubtitle>
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