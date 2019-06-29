import React, { Component } from 'react'
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Credits from './CreditsComponent';
import Preliminary from './PreliminaryComponent';
import MainEvent from './MainEventComponent';
import { STAFFS } from '../shared/staffs';
//import {Collapse, Jumbotron, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from "reactstrap";
import { Switch, Route, Redirect } from 'react-router-dom';
import { NOTICES } from "../shared/notices";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notices: NOTICES,
            staffs: STAFFS
        };
    }

    render () {
        const HomePage = () => {
            return (
                <Home notices={this.state.notices}/>
            );
        };

        const CreditsPage = () => {
            return (
                <Credits staffs={this.state.staffs}/>
            );
        };

        const PreliminaryPage = () => {
            return (
                <Preliminary />
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

export default Main;