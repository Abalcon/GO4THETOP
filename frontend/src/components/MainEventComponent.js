import React, { Component } from 'react';
import {Card, CardBody, CardText, CardTitle, CardSubtitle, CardImg} from "reactstrap";

//import {awsApiURL} from '../shared/urlList';

class MainEvent extends Component {

    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         contenders: []
    //     }
    // }

    // componentDidMount() {
    //     fetch(awsApiURL + 'contenders', {method: 'GET', credentials: 'same-origin'})
    //         .then(response => {
    //             if (response.ok) { return response; }
    //             else { var error = new Error('Error ' + response.status + ': ' + response.statusText)
    //                 error.response = response;
    //                 throw error;
    //
    //             }
    //         },
    //         error => {
    //             var errmsg = new Error(error.message);
    //             throw errmsg
    //         })
    //         .then(response => response.json())
    //         .then(contenders => this.setState({
    //             contenders: contenders
    //         }))
    //         .catch(error => console.log(error.message));
    //
    // }

    render () {
        // const contenders = this.state.contenders.map((contender) => {
        //     return (
        //         <div key={contender.id} className="col-12 m-1">
        //             <Card>
        //                 <CardBody>
        //                     <CardTitle>{contender.fullName}</CardTitle>
        //                     <CardSubtitle>{contender.cardName}</CardSubtitle>
        //                     <CardText>{contender.email}</CardText>
        //                 </CardBody>
        //             </Card>
        //         </div>
        //     );
        // });
        return (
            <div className="container">
                <h4>본선 진출자</h4>
                <p>
                    예선 기간이 종료하고 나서 공개 예정입니다!<br/>
                    이용에 불편을 드려 대단히 죄송합니다.
                </p>
                <div className="row">
                    <Card>
                        <CardImg top src='assets/images/G4TT_Logo.jpeg' alt='HeatRuleTest'/>
                        <CardBody>
                            <CardTitle>본선 진출 테스트</CardTitle>
                            <CardSubtitle>테스트</CardSubtitle>
                            <CardText>테스트</CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardImg top src='assets/images/background_example.jpeg' alt='HeatRuleTest'/>
                        <CardBody>
                            <CardTitle>본선 진출 테스트</CardTitle>
                            <CardSubtitle>테스트</CardSubtitle>
                            <CardText>테스트</CardText>
                        </CardBody>
                    </Card>
                </div>
                {/*<div className="row">*/}
                {/*    {contenders}*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default MainEvent;