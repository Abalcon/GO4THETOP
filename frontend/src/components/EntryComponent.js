import React, { Component } from 'react';
//import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

class Entry extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: ''
        };

        //this.handleInputChange = this.handleInputChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);

    }
    render() {
        return (
            <div>
                <h4>참가 신청</h4>
                <p>참가 신청 양식은 준비중입니다!</p>
            </div>
        );
    }

}

export default Entry;