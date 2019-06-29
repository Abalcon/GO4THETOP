import React, { Component } from 'react'
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';
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
        return (
            <div>
                <Navbar light expand="md">
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/">Go for the Top!</NavbarBrand>
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
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>GO4THETOP</h1>
                                <p>The 3rd International DanceDanceRevolution Tournament!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

export default Header;
