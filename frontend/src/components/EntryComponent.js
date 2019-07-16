import React, { Component } from 'react';
import {Button, Label, Row, Col/*, Modal, ModalHeader, ModalBody*/} from 'reactstrap';
import {Control, LocalForm, Errors, Field} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
//const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const validCardName = (val) => !(/[^A-Z0-9\s.!?$&-]/i.test(val));

class Entry extends Component {

    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         isModalOpen: false
    //     };
    //
    //     this.confirmSubmit = this.confirmSubmit.bind(this);
    // }
    //
    // confirmSubmit(values) {
    //     this.setState({
    //         isModalOpen: !this.state.isModalOpen
    //     });
    // }

    handleSubmit(values) {
        // 실제 웹 서비스처럼 '정말 신청하겠습니까?' 같은게 필요하다. 일단은 브라우저 디폴트로
        //console.log('Current State is: ' + JSON.stringify(values));
        //alert('참가 신청 기간은 아직 시작되지 않았습니다!\nCurrent State is: ' + JSON.stringify(values));

        if (window.confirm('GO4THETOP 3rd Season에 참가 신청하시겠습니까?')) {
            this.props.postContender(this.props.ctdID, values.email, values.fullname, values.nameread, values.cardname.toUpperCase(),
                values.participation.some(val => val === "lower"), values.participation.some(val => val === "upper"),
                values.participation.some(val => val === "watching"), values.snstype, values.snsid, values.message);
        }
    }

    render() {
        let caution = "참가 신청 기간은 2019.07.17~2019.08.12 입니다.\n" +
            "참가 비용은 부문 별 5000원입니다(2부문 참여시 10000원).\n" +
            "참가 신청 기간중 정보 변경이 필요하시면 989990gfc@gmail.com 로 문의 부탁드립니다.\n" +
            "참가 신청에 사용된 개인정보는 대회 종료후 파기 됩니다.\n" +
            "댄서 네임과 인게임 닉네임이 같은 경우 동일 체크를, 다른경우 아래 인게임 란에 별도 기입해주세요.\n" +
            "예선기간 중 게임 내 닉네임을 바꿀 경우 인식이 어려울 수 있으니 닉네임 유지를 부탁드립니다.\n" +
            "뒤풀이는 인원과 장소를 논의중이며 신청이 아닌 희망자 체크임을 유의 바랍니다.\n" +
            "예선 참가시 본선 진출 여부와 관계없이 관람 신청됩니다.\n" +
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
                <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                    <Row className="form-group">
                        <Label htmlFor="email" md={6}>이메일 주소(Email Address) *</Label>
                        <Col md={9}>
                            <Control.text model=".email" id="email" name="email"
                                          placeholder="Email Address" className="form-control"
                                          validators={{
                                              required, validEmail, isEmailAvailable: (val) =>
                                                  !this.props.contenders.some((ctd) => (ctd.mail === val))
                                          }}/>
                            <Errors className="text-danger" model=".email" show="touched"
                                    messages={{
                                        required: 'Required ',
                                        validEmail: '유효한 이메일 주소가 아닙니다(Invalid Email Address).',
                                        isEmailAvailable: '이미 등록된 이메일입니다(The email is already registered).'
                                    }}/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="fullname" md={6}>참가자 이름(Dancer Name) *</Label>
                        <Col md={9}>
                            <Control.text model=".fullname" id="fullname" name="fullname"
                                          placeholder="Enter your real name" className="form-control"
                                          validators={{required}}/>
                            <Errors className="text-danger" model=".fullname" show="touched"
                                    messages={{
                                        required: 'Required'
                                    }}/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="fullname" md={6}>참가자 이름 읽는법(How to read your name) *</Label>
                        <Col md={9}>
                            <Control.text model=".nameread" id="nameread" name="nameread"
                                          placeholder="Enter How to read your real name" className="form-control"
                                          validators={{required}}/>
                            <Errors className="text-danger" model=".nameread" show="touched"
                                    messages={{
                                        required: 'Required'
                                    }}/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="cardname" md={6}>인게임 이름(Card Name) *</Label>
                        <Col md={9}>
                            <Control.text model=".cardname" id="cardname" name="cardname"
                                          placeholder="Enter your card name" className="form-control"
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
                                        <input type="checkbox" id=".participation[2]" name="watching"
                                               value="watching"/> {' '}
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
                {/*<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>*/}
                {/*    <ModalHeader toggle={this.confirmSubmit}>참가 신청 확인(Entry Confirmation)</ModalHeader>*/}
                {/*    <ModalBody>*/}
                {/*        <Button onClick={this.}>OK, HERE WE GO!</Button>*/}
                {/*    </ModalBody>*/}
                {/*</Modal>*/}
            </div>
        );
    }

}

export default Entry;