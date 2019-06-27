import React, { Component } from 'react';
//import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

class RecordSubmit extends Component {

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
                <h4>기록 제출</h4>
                <p>기록 제출 양식은 준비중입니다!</p>
            </div>
        );
    }

}

export default RecordSubmit;