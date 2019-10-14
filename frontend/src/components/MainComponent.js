import React, { Component } from 'react'
import Header from './HeaderComponent';
import {Home} from './HomeComponent';
import Credits from './CreditsComponent';
import Preliminary from './PreliminaryComponent';
import MainEvent from './MainEventComponent';
import Donation from './DonationComponent';
//import {Collapse, Jumbotron, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from "reactstrap";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postContender, fetchContenders, postHeatRecord, postCommitment} from "../redux/actionCreators";
import {renderToStaticMarkup} from "react-dom/server";
import {withLocalize} from "react-localize-redux";
import globalTranslations from "../translations/global.json";

const mapStateToProps = state => {
    return {
        notices: state.notices,
        staffs: state.staffs,
        contenders: state.contenders,
        localize: state.localize
    }
};

const mapDispatchToProps = (dispatch) => ({
    postContender: (ctdID, email, fullname, nameread, cardname, lower, upper, watch, snstype, snsid, comments) =>
        dispatch(postContender(ctdID, email, fullname, nameread, cardname, lower, upper, watch, snstype, snsid, comments)),
    fetchContenders: (isRefresh) => {
        dispatch(fetchContenders(isRefresh))
    },
    postHeatRecord: (cardName, division, image1, image2) =>
        dispatch(postHeatRecord(cardName, division, image1, image2)),
    postCommitment: (cmtID, division, name, email, address, senderName, sendType, accountNumber, getReward, rewardRequest, shirtSize, shirtAmount) =>
        dispatch(postCommitment(cmtID, division, name, email, address, senderName, sendType, accountNumber, getReward, rewardRequest, shirtSize, shirtAmount))
});

class Main extends Component {
    constructor(props) {
        super(props);

        this.props.initialize({
            languages: [
                {name: "한국어", code: "kr"},
                {name: "English", code: "en"},
                {name: "日本語", code: "jp"}
            ],
            options: {renderToStaticMarkup},
            translation: globalTranslations
        });
    }

    componentDidMount() {
        this.props.fetchContenders(false);
    }

    render () {
        const HomePage = () => {
            return (
                <Home notices={this.props.notices}/>
            );
        };

        // const NoticePage = () => {
        //     return (
        //         <Notice notices={this.props.notices}/>
        //     );
        // };

        const CreditsPage = () => {
            return (
                <Credits staffs={this.props.staffs}/>
            );
        };

        const PreliminaryPage = () => {
            return (
                <Preliminary contenders={this.props.contenders.contenders}
                             contendersLoading={this.props.contenders.isLoading}
                             isProcessing={this.props.contenders.isProcessing}
                             contendersErrMsg={this.props.contenders.errMsg}
                             isRefresh={this.props.contenders.isRefresh}
                             fetchContenders={this.props.fetchContenders}
                             postContender={this.props.postContender}
                             postHeatRecord={this.props.postHeatRecord}/>
            );
        };

        const MainEventPage = () => {
            return (
                <MainEvent />
            )
        };

        const DonationPage = () => {
            return (
                <Donation isProcessing={this.props.contenders.isProcessing}
                          postCommitment={this.props.postCommitment}/>
            )
        };

        return (
            <div>
                <Header />
                <div className="container">
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        {/*<Route path="/notices" component={NoticePage} />*/}
                        <Route path="/credits" component={CreditsPage} />
                        <Route path="/preliminary" component={PreliminaryPage} />
                        <Route path="/mainevent" component={MainEventPage} />
                        <Route path="/donate" component={DonationPage}/>
                        <Redirect to="/home" />
                    </Switch>

                </div>
            </div>
        );
    }
}

export default withLocalize(withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)));