import React, { Component } from 'react';
import {Control, Errors, Field, LocalForm} from "react-redux-form";
import {Button, Col, Label, Row} from "reactstrap";
//import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
//const isNumber = (val) => !isNaN(Number(val));
const validCardName = (val) => !(/[^A-Z0-9\s.!?$&-]/i.test(val));

class RecordSubmit extends Component {

    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         firstname: '',
    //         lastname: '',
    //         telnum: '',
    //         email: '',
    //         agree: false,
    //         contactType: 'Tel.',
    //         message: ''
    //     };
    //
    //     //this.handleInputChange = this.handleInputChange.bind(this);
    //     //this.handleSubmit = this.handleSubmit.bind(this);
    // }

    handleChange(value) {
        if (value.image1 !== undefined) {
            console.log(value.image1);
            console.log(value.image1[0].name);
            console.log(value.image1[0].type);
        }
    }

    handleSubmit(values) {
        // 실제 웹 서비스처럼 '정말 신청하겠습니까?' 같은게 필요하다. 일단은 브라우저 디폴트로
        //console.log('Current State is: ' + JSON.stringify(values));
        //alert('참가 신청 기간은 아직 시작되지 않았습니다!\nCurrent State is: ' + JSON.stringify(values));

        if (window.confirm('GO4THETOP 3rd Season 예선 기록을 제출하시겠습니까?')) {
            // TODO: 예선 기록 제출 Redux
            // this.props.postContender(this.props.ctdID, values.email, values.fullname, values.nameread, values.cardname.toUpperCase(),
            //     values.participation.some(val => val === "lower"), values.participation.some(val => val === "upper"),
            //     values.participation.some(val => val === "watching"), values.snstype, values.snsid, values.message);

            //alert('예선 기간이 아직 시작되지 않았습니다!\n예선은 8월 26일 오전 7시부터입니다.');
            this.props.postHeatRecord(values.cardname.toUpperCase(), values.division, values.image1, values.image2);
        }
    }

    render() {
        return (
            <div className="container">
                <h4>기록 제출</h4>

                <h5>* : 필수 항목입니다.</h5>
                {/*<h5 style={{color: 'red'}}>(7/25) 같은 이메일 주소로 2명 이상 신청할 수 없습니다</h5>*/}
                <LocalForm onChange={(value) => this.handleChange(value)}
                           onSubmit={(value) => this.handleSubmit(value)}>
                    <Row className="form-group">
                        <Label htmlFor="cardname" md={6}>게임 내 표기 이름(Dancer/Card Name) *</Label>
                        <Col md={9}>
                            <Control.text model=".cardname" id="cardname" name="cardname"
                                          placeholder="Enter your dancer/card name" className="form-control"
                                          validators={{required, validCardName, maxLength: maxLength(8)}}/>
                            <Errors className="text-danger" model=".cardname" show="touched"
                                    messages={{
                                        required: 'Required ',
                                        validCardName: '유효한 인게임 이름이 아닙니다(Invalid Card Name).',
                                        maxLength: '인게임 이름은 8글자를 넘을 수 없습니다(Card name must be at most 8 characters long)'
                                    }}/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="division" md={4}>제출 부문(Division) *</Label>
                        <Col md={6}>
                            <Field model=".division[]" validators={{required}}>
                                <div className="form-check">
                                    <Label check>
                                        <input type="radio" id=".division" name="lower" value="lower"/> {' '}
                                        Lower
                                        {/*<Control.radio model=".division" name="lower" value="lower" className="form-control">*/}
                                        {/*</Control.radio> &nbsp;Lower*/}
                                    </Label>
                                </div>
                                <div className="form-check">
                                    <Label check>
                                        <input type="radio" id=".division" name="lower" value="upper"/> {' '}
                                        Upper
                                        {/*<Control.radio model=".division" name="upper" value="upper" className="form-control">*/}
                                        {/*</Control.radio> &nbsp;Upper*/}
                                    </Label>
                                </div>
                            </Field>
                        </Col>
                        <Col md={10}>
                            <Errors className="text-danger" model=".division" show="touched"
                                    messages={{required: '제출 부문을 선택해야합니다(Must choose a division)'}}/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="image1" md={4}>사진 1(Image 1) *</Label>
                        <Col md={6}>
                            <Control.file model=".image1[]" id="image1" name="image1" className="form-control"
                                          accept="image/*" validators={{required}}/>
                            <Errors className="text-danger" model=".image1" show="touched"
                                    messages={{required: 'Required'}}/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="image1" md={4}>사진 2(Image 2)</Label>
                        <Col md={6}>
                            <Control.file model=".image2" id="image2" name="image2" className="form-control"
                                          accept="image/*"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={{size: 10, offset: 2}}>
                            <Button type="submit" color="primary">
                                Show us what you've got!
                            </Button>
                        </Col>
                    </Row>
                </LocalForm>
            </div>
        );
    }

}

export default RecordSubmit;