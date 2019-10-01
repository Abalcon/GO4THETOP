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
        this.state = {
            slideIndex: 0
        };
    }

    handleChange(value) {
        this.setState({
            slideIndex: value,
        });
    };

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
                    <Translate id="rule.title">본선 규칙 및 지정곡</Translate>
                </h4>
                <p>
                    <Translate id="rule.lang">언어 선택 :</Translate>
                    <LanguageToggle/>
                </p>

                <Tabs selectedIndex={this.state.slideIndex} onSelect={tab => this.handleChange(tab)}>
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
                        <Tab>
                            <Translate id="rule.lower-music">Lower 지정곡</Translate>
                        </Tab>
                        <Tab>
                            <Translate id="rule.upper-music">Upper 지정곡</Translate>
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
                    <TabPanel>
                        <div className="row col-md-10">
                            <Card>
                                <CardImg top src="assets/images/Lower_R16-1.jpg" alt="round1-lower1"/>
                            </Card>
                            <Card>
                                <CardImg top src="assets/images/Lower_R16-2.jpg" alt="round1-lower2"/>
                            </Card>
                        </div>
                        <div className="row col-md-10">
                            <Card>
                                <CardImg top src="assets/images/Lower_R8-1.jpg" alt="round2-lower1"/>
                            </Card>
                            <Card>
                                <CardImg top src="assets/images/Lower_R8-2.jpg" alt="round2-lower2"/>
                            </Card>
                        </div>
                        <div className="row col-md-10">
                            <Card>
                                <CardImg top src="assets/images/Lower_Repechages.jpg" alt="repechages-lower"/>
                            </Card>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="row col-md-10">
                            <Card>
                                <CardImg top src="assets/images/Upper_R16-1.jpg" alt="round1-upper1"/>
                            </Card>
                            <Card>
                                <CardImg top src="assets/images/Upper_R16-2.jpg" alt="round1-upper2"/>
                            </Card>
                        </div>
                        <div className="row col-md-10">
                            <Card>
                                <CardImg top src="assets/images/Upper_R8-1.jpg" alt="round2-upper1"/>
                            </Card>
                            <Card>
                                <CardImg top src="assets/images/Upper_R8-2.jpg" alt="round2-upper2"/>
                            </Card>
                        </div>
                        <div className="row col-md-10">
                            <Card>
                                <CardImg top src="assets/images/Upper_Repechages.jpg" alt="repechages-upper"/>
                            </Card>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default withLocalize(MainEvent);