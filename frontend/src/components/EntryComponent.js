import React, { Component } from 'react';
import { /*Breadcrumb, BreadcrumbItem,*/ Button, Label, Row, Col} from 'reactstrap';
import {Control, LocalForm, Errors, Field} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
//const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Entry extends Component {

    // constructor(props) {
    //     super(props);
    // }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('참가 신청 기간은 아직 시작되지 않았습니다!\nCurrent State is: ' + JSON.stringify(values));

        this.props.addContender(this.props.ctdID, values.email, values.fullname, values.cardname,
            values.lower, values.upper, values.watch, values.snstype, values.snsid, values.comment);
    }

    render() {
        let caution = "참가 신청 기간은 2019.07.17~2019.08.12 입니다.\n" +
            "참가 신청 기간중 정보 변경이 필요하시면 989990gfc@gmail.com 로 문의 부탁드립니다.\n" +
            "참가 신청에 사용된 개인정보는 대회 종료후 파기 됩니다.\n" +
            "댄서 네임과 인게임 닉네임이 같은 경우 동일 체크를, 다른경우 아래 인게임 란에 별도 기입해주세요.\n" +
            "예선기간 중 게임 내 닉네임을 바꿀 경우 인식이 어려울 수 있으니 닉네임 유지를 부탁드립니다.\n" +
            "뒤풀이는 인원과 장소를 논의중이며 신청이 아닌 희망자 체크임을 유의 바랍니다.\n" +
            "그 외 문의사항은 대회 이메일과 트위터 공식 계정으로 문의 부탁드립니다.\n";

        return (
            <div>
                <h4>참가 신청</h4>
                {
                    caution.split('\n').map(line => {
                        return (<span>{line}<br/></span>)
                    })
                }
                <h6>* : 필수 항목입니다.</h6>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="email" md={6}>이메일 주소(Email Address) *</Label>
                        <Col md={9}>
                            <Control.text model=".email" id="email" name="email"
                                          placeholder="Email Address" className="form-control"
                                          validators={{required, validEmail}}/>
                            <Errors className="text-danger" model=".email" show="touched"
                                    messages={{
                                        required: 'Required ',
                                        validEmail: '유효한 이메일 주소가 아닙니다(Invalid Email Address)'
                                    }}/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="fullname" md={6}>참가자 이름(Dancer Name) *</Label>
                        <Col md={9}>
                            <Control.text model=".fullname" id="fullname" name="fullname"
                                          placeholder="Enter your real name" className="form-control"
                                          validators={{required, minLength: minLength(3)}}/>
                            <Errors className="text-danger" model=".fullname" show="touched"
                                    messages={{
                                        required: 'Required ',
                                        minLength: '참가자 이름은 3글자 이상이어야 합니다(Dancer name must be at least 3 characters long)'
                                    }}/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="cardname" md={6}>인게임 이름(Card Name) *</Label>
                        <Col md={9}>
                            <Control.text model=".cardname" id="cardname" name="cardname"
                                          placeholder="Enter your card name" className="form-control"
                                          validators={{required, maxLength: maxLength(8)}}/>
                            <Errors className="text-danger" model=".cardname" show="touched"
                                    messages={{
                                        required: 'Required ',
                                        maxLength: '인게임 이름은 8글자를 넘을 수 없습니다(Card name must be at most 8 characters long)'
                                    }}/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="sns" md={12}>SNS</Label>
                        <Col md={3}>
                            <Control.select model=".snstype" name="snstype" className="form-control">
                                <option>None</option>
                                <option>Twitter</option>
                                <option>Facebook</option>
                                <option>Instagram</option>
                            </Control.select>
                        </Col>
                        <Col md={{size: 5, offset: 1}}>
                            <Control.text model=".snsid" id="snsid" name="snsid"
                                          placeholder="Enter your SNS ID" className="form-control"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="participation" md={3}>참가 부문(Participation) *</Label>
                        <Col md={9}>
                            <Field model=".participation[]" validators={{required}}>
                                <div className="form-check">
                                    <Label check>
                                        <input type="checkbox" id=".participation[0]" name="lower" value="lower"/> {' '}
                                        <strong>Lower Division</strong>
                                    </Label>
                                </div>
                                <div className="form-check">
                                    <Label check>
                                        <input type="checkbox" id=".participation[1]" name="upper" value="upper"/> {' '}
                                        <strong>Upper Division</strong>
                                    </Label>
                                </div>
                                <div className="form-check">
                                    <Label check>
                                        <input type="checkbox" id=".participation[2]" name="watch" value="watch"/> {' '}
                                        <strong>Watching(관람)</strong>
                                    </Label>
                                </div>
                            </Field>
                        </Col>
                        <Col md={9}>
                            <Errors className="text-danger" model=".participation" show="touched"
                                    messages={{required: '적어도 하나를 선택하셔야 합니다 (Must select at least one)'}}/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="message" md={6}>코멘트(Comment)</Label>
                        <Col md={9}>
                            <Control.textarea model=".message" id="message" name="message"
                                              rows="3" className="form-control"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Field model=".agree[]" validators={{required}}>
                            <div className="form-check">
                                <input type="checkbox" id=".agree.media" name="agree" value="agree"/> {' '}
                                <strong>* 대회중 촬영되는 비디오 및 사진에 대하여 리소스로 사용을 동의합니다. *</strong>
                            </div>
                        </Field>
                        <Errors className="text-danger" model=".agree" show="touched"
                                messages={{required: '리소스 사용에 동의해야 참가할 수 있습니다.'}}/>
                    </Row>
                    <Row className="form-group">
                        <Col md={{size: 10, offset: 2}}>
                            <Button type="submit" color="primary">
                                Let's speed it up with this tournament!
                            </Button>
                        </Col>
                    </Row>
                </LocalForm>
            </div>
        );
    }

}

export default Entry;