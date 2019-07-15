import React, { Component } from 'react'
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Credits from './CreditsComponent';
import Preliminary from './PreliminaryComponent';
import MainEvent from './MainEventComponent';
//import {Collapse, Jumbotron, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from "reactstrap";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addContender} from "../redux/actionCreators";

const mapStateToProps = state => {
    return {
        notices: state.notices,
        staffs: state.staffs,
        contenders: state.contenders
    }
};

const mapDispatchToProps = (dispatch) => ({
    addContender: (ctdID, email, fullname, cardname, lower, upper, watch, snstype, snsid, comments) =>
        dispatch(addContender(ctdID, email, fullname, cardname, lower, upper, watch, snstype, snsid, comments))
});

class Main extends Component {
    // constructor(props) {
    //     super(props);
    // }

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
                <Preliminary contenders={this.props.contenders}
                             addContender={this.props.addContender}/>
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