import React, { Component } from 'react'
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Credits from './CreditsComponent';
import Preliminary from './PreliminaryComponent';
import MainEvent from './MainEventComponent';
//import {Collapse, Jumbotron, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from "reactstrap";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postContender, fetchContenders} from "../redux/actionCreators";

const mapStateToProps = state => {
    return {
        notices: state.notices,
        staffs: state.staffs,
        contenders: state.contenders
    }
};

const mapDispatchToProps = (dispatch) => ({
    postContender: (ctdID, email, fullname, nameread, cardname, lower, upper, watch, snstype, snsid, comments) =>
        dispatch(postContender(ctdID, email, fullname, nameread, cardname, lower, upper, watch, snstype, snsid, comments)),
    fetchContenders: () => {
        dispatch(fetchContenders())
    }
});

class Main extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        this.props.fetchContenders();
    }

    render () {
        const HomePage = () => {
            return (
                <Home notices={this.props.notices}/>
            );
        };

        const CreditsPage = () => {
            return (
                <Credits staffs={this.props.staffs}/>
            );
        };

        const PreliminaryPage = () => {
            return (
                <Preliminary contenders={this.props.contenders.contenders}
                             contendersLoading={this.props.contenders.isLoading}
                             contendersErrMsg={this.props.contenders.errMsg}
                             postContender={this.props.postContender}/>
            );
        };

        const MainEventPage = () => {
            return (
                <MainEvent />
            )
        };

        return (
            <div>
                <Header />
                <div className="container">
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route path="/credits" component={CreditsPage} />
                        <Route path="/preliminary" component={PreliminaryPage} />
                        <Route path="/mainevent" component={MainEventPage} />
                        <Redirect to="/home" />
                    </Switch>

                </div>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));