import React, {Component} from 'react';
import {Button, Card, CardImg, Col, Label, Row} from "reactstrap";
import {Control, Errors, Field, LocalForm} from "react-redux-form";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {Loading} from "./LoadingComponent";
import CardTitle from "reactstrap/es/CardTitle";

const required = (val) => val && val.length;
const selectRequired = (val) => val && (val !== "none");
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const isNumber = (val) => !isNaN(Number(val));
// const exactLength = (len) => (val) => !(val) || (val.length !== len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const sendInfoValidator = (values) => {
    return ((values.type === "fromAccount") && isNumber(values.number) && (values.number.length === 4))
        || (values.type === "nonAccount");
};

class Donation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAccount: false,
            isDonate: false,
            isPurchase: false
        };
    }

    handleDivisionChange(value) {
        if (value === "purchase") {
            this.setState({
                isPurchase: true,
                isDonate: false
            });
        } else if (value === "donate") {
            this.setState({
                isPurchase: false,
                isDonate: true
            });
        } else {
            this.setState({
                isPurchase: false,
                isDonate: false
            });
        }
    }

    handleInfoChange(value) {
        //console.log(value);
        switch (value) {
            case ("fromAccount"):
                //console.log("You selected 계좌이체");
                this.setState({
                    isAccount: true
                });
                break;
            case ("nonAccount"):
                //console.log("You selected 무통장");
                this.setState({
                    isAccount: false
                });
                break;
            default:
                //console.log("You didn't select anything");
                this.setState({
                    isAccount: false
                });
                break;
        }
    }

    handleChange(value) {
        //console.log(value);
        if (value.sendinfo !== undefined && value.sendinfo.type !== undefined) {
            this.handleInfoChange(value.sendinfo.type);
        }

        if (value.division !== undefined) {
            this.handleDivisionChange(value.division);
        }
    }

    handleSubmit(values) {
        console.log(values);
        if (values.sendinfo === undefined || !sendInfoValidator(values.sendinfo)) {
            alert('입금 정보를 양식에 맞춰 입력해주시기 바랍니다.');
        } else if (this.state.isPurchase && ((values.size === undefined || values.size === "none") ||
            (values.amount === undefined || !isNumber(values.amount) || values.amount < 1))) {
            alert('구매 정보를 양식에 맞춰 입력해주시기 바랍니다.');
        } else {
            if (window.confirm('GO4THETOP 3rd Season 후원/구매 확인 정보를 제출하시겠습니까?')) {
                // this.props.postContender(this.props.ctdID, values.email, values.fullname, values.nameread, values.cardname.toUpperCase(),
                //     values.participation.some(val => val === "lower"), values.participation.some(val => val === "upper"),
                //     values.participation.some(val => val === "watching"), values.snstype, values.snsid, values.message);

                //alert('후원/구매 확인 양식 테스트 중입니다!\nCurrent State is: ' + JSON.stringify(values));
                this.props.postCommitment(this.props.cmtID, values.division, values.name, values.email, values.address, values.sender,
                    values.sendinfo.type, values.sendinfo.number, (values.reward === "yes"), values.rewardRequest, values.size, values.amount);
            }
        }
    }

    render() {
        if (this.props.isProcessing) {
            return (
                <div className="container">
                    <Loading/>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <Tabs>
                        <TabList>
                            <Tab>구매 안내</Tab>
                            <Tab>후원 안내</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="row col-md-10">
                                <Card>
                                    <CardImg top src="assets/images/Purchase.jpg" alt="Purchase"/>
                                    <CardTitle tag="h4" style={{textAlign: 'center'}}>
                                        구매 계좌: 1002-643-481308 (우리은행: 양희원)
                                    </CardTitle>
                                </Card>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="row col-md-10">
                                <Card>
                                    <CardImg top src="assets/images/DonationRevised.jpg" alt="Donate"/>
                                </Card>
                            </div>
                        </TabPanel>
                    </Tabs>

                    <h4>주의사항</h4>
                    <h5>
                        해당 이벤트의 수령은 기본적으로 대회 당일 현장 수령 입니다.<br/>
                        당일 수령이 어려워 택배 수령을 희망하실 경우 이메일로 문의 부탁드립니다(택배는 착불입니다).<br/>
                        입금확인이 되지 않는 신청은 누락 될 수 있습니다.<br/>
                        계좌이체의 경우 계좌번호 <strong>끝 4자리</strong>를 같이 입력하시기 바랍니다.<br/>
                        무통장의 경우 반드시 무통장 표기를 해주시고, 입금자명에 무통장 입금명의를 입력 부탁드립니다.<br/>
                        후원의 경우 3만원 이상일 경우에만 리워드가 발생합니다.<br/>
                        보내주신 개인정보는 대회 후 바로 파기됩니다.<br/>
                        후원의 경우 대회 종료 후 후원금 사용에 대한 별도 공지 예정입니다.<br/>
                        금액 후원 외 실물 후원을 희망하시면 이메일로 문의 부탁드립니다.<br/>
                    </h5>

                    <h5>* : 필수 항목입니다.</h5>

                    <LocalForm onChange={(value) => this.handleChange(value)}
                               onSubmit={(value) => this.handleSubmit(value)}>
                        <Row className="form-group">
                            <Label htmlFor="division" md={4}>분류 선택 *</Label>
                            <Col md={4}>
                                <Control.select model=".division" id="division" name="division"
                                                validators={{selectRequired}}>
                                    <option value="none">분류 선택(choose)</option>
                                    <option value="donate">후원(donate)</option>
                                    <option value="purchase">구매(purchase)</option>
                                </Control.select>
                            </Col>
                            <Col md={10}>
                                <Errors className="text-danger" model=".division" show="touched"
                                        messages={{selectRequired: '분류를 반드시 선택해야합니다(Required)'}}/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="name" md={4}>이름 *</Label>
                            <Col md={4}>
                                <Control.text model=".name" id="name" name="name"
                                              placeholder="Enter your name" className="form-control"
                                              validators={{required, maxLength: maxLength(8)}}/>
                                <Errors className="text-danger" model=".name" show="touched"
                                        messages={{
                                            required: '이름을 입력하셔야 합니다(Must enter your name)',
                                            maxLength: '이름은 8글자를 넘을 수 없습니다(Name must be at most 8 characters long)'
                                        }}/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="email" md={4}>이메일(Email) *</Label>
                            <Col md={6}>
                                <Control.text model=".email" id="email" name="email"
                                              placeholder="Email Address" className="form-control"
                                              validators={{required, validEmail}}/>
                                <Errors className="text-danger" model=".email" show="touched"
                                        messages={{
                                            required: 'Required ',
                                            validEmail: '유효한 이메일 주소가 아닙니다(Invalid Email Address).'
                                        }}/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="address" md={4}>연락처</Label>
                            <Col md={8}>
                                <Control.text model=".address" id="address" name="address"
                                              placeholder="택배 수령을 희망하실 경우 연락처를 입력하시기 바랍니다"
                                              className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="sender" md={4}>입금자명 *</Label>
                            <Col md={4}>
                                <Control.text model=".sender" id="sender" name="sender"
                                              placeholder="Enter your name" className="form-control"
                                              validators={{required, maxLength: maxLength(10)}}/>
                                <Errors className="text-danger" model=".sender" show="touched"
                                        messages={{
                                            required: '입금자 명의를 입력하셔야 합니다(Must enter the sender name)',
                                            maxLength: '입금자 명의는 10글자를 넘을 수 없습니다(Must be at most 10 characters long)'
                                        }}/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="sendinfo" md={4}>입금 정보 *</Label>
                            <Field model=".sendinfo[]"
                                   validators={{sendInfoValidator: (values) => sendInfoValidator(values)}}>
                                <Col md={6}>
                                    <Control.select model=".sendinfo.type" id="sendtype" name="sendtype">
                                        <option value="none">분류 선택(choose)</option>
                                        <option value="fromAccount">계좌이체</option>
                                        <option value="nonAccount">무통장</option>
                                    </Control.select>
                                </Col>
                                <Col md={6}>
                                    <Control.text model=".sendinfo.number" id="number" name="number"
                                                  placeholder="Enter your name" className="form-control"
                                                  type="number" disabled={!this.state.isAccount}
                                        // validators={{required, isNumber, exactLength: exactLength(4)}}
                                    />
                                    {/*<Errors className="text-danger" model=".cardname" show="touched"*/}
                                    {/*        messages={{required: '계좌번호를 입력하셔야 합니다',*/}
                                    {/*            isNumber: '계좌번호는 반드시 숫자여야합니다',*/}
                                    {/*            exactLength: '정확하게 4자리 숫자를 입력하셔야 합니다'*/}
                                    {/*        }}/>*/}
                                </Col>
                            </Field>
                            <Col md={10}>
                                <Errors className="text-danger" model=".sendinfo" show="touched"
                                        messages={{sendInfoValidator: '입금 정보를 정확히 입력하시기 바랍니다'}}/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="reward" md={6}>후원 상품 수령 여부 (3만원 이상 가능)*</Label>
                            <Col md={4}>
                                <Control.select model=".reward" id="reward" name="reward"
                                                disabled={!this.state.isDonate}>
                                    <option value="no">아니오(no)</option>
                                    <option value="yes">예(yes)</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="rewardRequest" md={6}>후원 특전 요청사항</Label>
                            <Col md={10}>
                                <Control.textarea model=".rewardRequest" id="rewardRequest" name="rewardRequest"
                                                  rows="3" className="form-control" disabled={!this.state.isDonate}/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="size" md={6}>티셔츠 사이즈 *</Label>
                            <Col md={4}>
                                <Control.select model=".size" id=".size" name="reward"
                                                disabled={!this.state.isPurchase}>
                                    <option value="none">선택(choose)</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="LL">LL</option>
                                    <option value="3L">3L</option>
                                    <option value="4L">4L</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="amount" md={6}>티셔츠 수량 *</Label>
                            <Col md={4}>
                                <Control.text model=".amount" id="amount" name="amount"
                                              placeholder="Amount" className="form-control"
                                              type="number" disabled={!this.state.isPurchase}
                                    // validators={{required, isNumber, exactLength: exactLength(4)}}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size: 10, offset: 2}}>
                                <Button type="submit" color="primary" disabled={this.props.isProcessing}>
                                    신청/확인서 제출하기
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </div>
            );
        }
    }
}

export default Donation;