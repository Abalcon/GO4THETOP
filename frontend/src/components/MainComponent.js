import React, { Component } from 'react'
import Header from './HeaderComponent';
//import {Collapse, Jumbotron, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from "reactstrap";
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render () {
        return (
            <div>
                <Header />
                <div className="container">
                    <Switch>
                        <Route path="/home" component={() => <p>공지사항</p>} />
                        <Route path="/credits" component={() => <p>주최팀 소개</p>} />
                        <Route path="/preliminary" component={() => <p>예선 규칙</p>} />
                        <Redirect to="/home" />
                    </Switch>

                </div>
            </div>
        );
    }
}

export default Main;