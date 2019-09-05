import React, { Component } from 'react'
import {Alert, Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Countdown from 'react-countdown-now';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false
        };
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render () {
        const jumbotronStyle = {
            backgroundImage: 'url(assets/images/background_example.jpeg)'
        };

        //TODO: 예선 기간 countdown
        const TimeOver = () => <h4>예선 기간이 종료되었습니다!<br/>많은 참여 감사드립니다</h4>;

        const timeLimitRenderer = ({days, hours, minutes, seconds, completed}) => {
            if (completed) {
                return <TimeOver/>;
            } else {
                return <h4 style={{fontWeight: 'bold'}}>남은 예선 기간<br/>{days}일 {hours}시간 {minutes}분 {seconds}초</h4>
            }
        };

        return (
            <div>
                <Navbar light expand="md">
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/">
                            <img src='assets/images/G4TT_Logo.jpeg' height="40" width="40" alt='GO4THETOP'/>
                            GO4THETOP
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav className="ml-2 mr-2" navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to='/home'>
                                        <span className="fa fa-home fa-lg">

                                        </span>Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/credits'>
                                        <span className="fa fa-info fa-lg">

                                        </span>Credits
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/preliminary'>
                                        <span className="fa fa-list fa-lg">

                                        </span>Preliminary
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/mainevent'>
                                        <span className="fa fa-address-card fa-lg">

                                        </span>Main Event
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/donate'>
                                        <span className="fa fa-krw fa-lg">

                                        </span>Donation & Goods
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron style={jumbotronStyle}>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12" style={{textAlign: "right"}}>
                                <h1>GO4THETOP</h1>
                                <h4>New Era, New Aces.</h4>
                                <span>2019. 11. 2.<br/></span>
                                <span>Bucheon Attack</span>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Alert color="info" style={{textAlign: 'center'}}>
                    <Countdown
                        date={new Date(2019, 8, 16)}
                        renderer={timeLimitRenderer}
                    />
                </Alert>
            </div>
        );
    }
}

export default Header;
