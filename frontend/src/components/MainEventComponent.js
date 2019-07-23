import React, { Component } from 'react';
import {Card/*, CardBody, CardText, CardTitle, CardSubtitle*/, CardImg} from "reactstrap";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {Translate, withLocalize} from "react-localize-redux";
import LanguageToggle from './LanguageToggleComponent';
import ruleTranslations from '../translations/maineventrule.json';

//import {awsApiURL} from '../shared/urlList';

class MainEvent extends Component {

    constructor(props) {
        super(props);

        this.props.addTranslation(ruleTranslations);
    }

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
        const Image1 = () => (
            <Translate>
                {({translate}) => (
                    <div className="row col-md-10">
                        <Card>
                            <CardImg top src={translate("rule.image1")} alt="round1"/>
                        </Card>
                    </div>
                )}
            </Translate>
        );

        const Image2 = () => (
            <Translate>
                {({translate}) => (
                    <div className="row col-md-10">
                        <Card>
                            <CardImg top src={translate("rule.image2")} alt="round2"/>
                        </Card>
                    </div>
                )}
            </Translate>
        );

        const Image3 = () => (
            <Translate>
                {({translate}) => (
                    <div className="row col-md-10">
                        <Card>
                            <CardImg top src={translate("rule.image3")} alt="finals"/>
                        </Card>
                    </div>
                )}
            </Translate>
        );

        return (
            <div className="container">
                <h4>
                    <Translate id="rule.title">본선 규칙</Translate>
                </h4>
                <p>
                    <Translate id="rule.lang">언어 선택 :</Translate>
                    <LanguageToggle/>
                </p>
                {/*<h4>본선 진출자</h4>*/}
                {/*<p>*/}
                {/*    예선 기간이 종료하고 나서 공개 예정입니다!<br/>*/}
                {/*    이용에 불편을 드려 대단히 죄송합니다.*/}
                {/*</p>*/}
                {/*<div className="row">*/}
                {/*    <Card>*/}
                {/*        <CardImg top src='assets/images/G4TT_Logo.jpeg' alt='HeatRuleTest'/>*/}
                {/*        <CardBody>*/}
                {/*            <CardTitle>본선 진출 테스트</CardTitle>*/}
                {/*            <CardSubtitle>테스트</CardSubtitle>*/}
                {/*            <CardText>테스트</CardText>*/}
                {/*        </CardBody>*/}
                {/*    </Card>*/}
                {/*    <Card>*/}
                {/*        <CardImg top src='assets/images/background_example.jpeg' alt='HeatRuleTest'/>*/}
                {/*        <CardBody>*/}
                {/*            <CardTitle>본선 진출 테스트</CardTitle>*/}
                {/*            <CardSubtitle>테스트</CardSubtitle>*/}
                {/*            <CardText>테스트</CardText>*/}
                {/*        </CardBody>*/}
                {/*    </Card>*/}
                {/*</div>*/}

                {/*<div className="row">*/}
                {/*    {contenders}*/}
                {/*</div>*/}

                <Tabs>
                    <TabList>
                        <Tab>
                            <Translate id="rule.round1">16강</Translate>
                        </Tab>
                        <Tab>
                            <Translate id="rule.round2">더블 엘리미네이션</Translate>
                        </Tab>
                        <Tab>
                            <Translate id="rule.final">결승 리그</Translate>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <Image1/>
                    </TabPanel>
                    <TabPanel>
                        <Image2/>
                    </TabPanel>
                    <TabPanel>
                        <Image3/>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default withLocalize(MainEvent);