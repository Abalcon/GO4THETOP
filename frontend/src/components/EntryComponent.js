import React, { Component } from 'react';
import { /*Breadcrumb, BreadcrumbItem,*/ Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import FormFeedback from "reactstrap/es/FormFeedback";

class Entry extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fullname: '',
            cardname: '',
            email: '',
            lower: false,
            upper: false,
            watching: false,
            snsid: '',
            snstype: 'None',
            comment: '',
            agree: false,
            touched: {
                email: '',
                fullname: '',
                cardname: ''
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    validate(email, fullname, cardname, agree) {
        const errors = {
            email: '',
            fullname: '',
            cardname: '',
            participation: '',
            agree: ''
        };

        if (/*this.state.touched.email &&*/ email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Email should contain a @';

        if (/*this.state.touched.fullname &&*/ fullname.length < 1)
            errors.fullname = '참가자 이름을 입력하세요 (Please enter your dancer name)';

        if (cardname.length < 1)
            errors.cardname = '인게임 이름을 입력하세요 (Please enter your card name)';
        else if (cardname.length > 8)
            errors.cardname = '인게임 이름은 8글자를 넘을 수 없습니다 (Card name must be 8 characters long or less)';

        if (!agree)
            errors.agree = '대회중 촬영되는 비디오 및 사진에 대하여 리소스로 사용을 동의하셔야 합니다';

        return errors;
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true},
        });
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    render() {
        const inputErrors = this.validate(this.state.email, this.state.fullname, this.state.cardname, this.state.agree);

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
                <p>참가 신청 양식은 준비중입니다!</p>
                {
                    caution.split('\n').map(line => {
                        return (<span>{line}<br/></span>)
                    })
                }
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label htmlFor="email" md={6}>이메일 주소(Email Address)</Label>
                        <Col md={9}>
                            <Input type="text" id="email" name="email"
                                   placeholder="Email Address" value={this.state.email}
                                   valid={inputErrors.email === ''} invalid={inputErrors.email !== ''}
                                   onBlur={this.handleBlur('email')} onChange={this.handleInputChange}/>
                            <FormFeedback>{inputErrors.email}</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="fullname" md={6}>참가자 이름(Dancer Name)</Label>
                        <Col md={9}>
                            <Input type="text" id="fullname" name="fullname"
                                   placeholder="Enter your real name" value={this.state.fullname}
                                   valid={inputErrors.fullname === ''} invalid={inputErrors.fullname !== ''}
                                   onBlur={this.handleBlur('fullname')} onChange={this.handleInputChange}/>
                            <FormFeedback>{inputErrors.fullname}</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="cardname" md={6}>인게임 이름(Card Name)</Label>
                        <Col md={9}>
                            <Input type="text" id="cardname" name="cardname"
                                   placeholder="Enter your card name" value={this.state.cardname}
                                   valid={inputErrors.cardname === ''} invalid={inputErrors.cardname !== ''}
                                   onChange={this.handleInputChange}/>
                            <FormFeedback>{inputErrors.cardname}</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="sns" md={12}>SNS</Label>
                        <Col md={3}>
                            <Input type="select" name="snstype" value={this.state.snstype}
                                   onChange={this.handleInputChange}>
                                <option>None</option>
                                <option>Twitter</option>
                                <option>Facebook</option>
                                <option>Instagram</option>
                            </Input>
                        </Col>
                        <Col md={{size: 5, offset: 1}}>
                            <Input type="text" id="snsid" name="snsid"
                                   placeholder="Enter your SNS ID" value={this.state.snsid}
                                   onChange={this.handleInputChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="participation" md={2}>Participation</Label>
                        <Col md={3}>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="lower" checked={this.state.lower}
                                           onChange={this.handleInputChange}/> {' '}
                                    <strong>Lower Division</strong>
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="upper" checked={this.state.upper}
                                           onChange={this.handleInputChange}/> {' '}
                                    <strong>Upper Division</strong>
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="watching" checked={this.state.watching}
                                           onChange={this.handleInputChange}/> {' '}
                                    <strong>Watching</strong>
                                </Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="message" md={6}>코멘트(Comment)</Label>
                        <Col md={9}>
                            <Input type="textarea" id="message" name="message"
                                   rows="3" value={this.state.message} onChange={this.handleInputChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="agree" checked={this.state.agree}
                                           valid={inputErrors.agree === ''} invalid={inputErrors.agree !== ''}
                                           onChange={this.handleInputChange}/> {' '}
                                    <strong>대회중 촬영되는 비디오 및 사진에 대하여 리소스로 사용을 동의합니다.</strong>
                                </Label>
                                <FormFeedback>{inputErrors.agree}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={{size: 10, offset: 2}}>
                            <Button type="submit" color="primary">
                                Let's speed it up with this tournament!
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }

}

export default Entry;