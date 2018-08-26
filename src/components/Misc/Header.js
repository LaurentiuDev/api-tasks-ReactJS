import React, {Component} from 'react';
import {Redirect , Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import {Nav, NavItem} from "reactstrap";
import '../../css/Header.css';

import Notifications from "../Notifications/Notifications";

export default class Header extends Component {
    state = {
        redirect: false
    };

    _logout = () => {
        sessionStorage.removeItem('token');

        this.setState({
            redirect: true
        });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/'}/>;
        }

        return (
            <div className={'header'}>

                <Nav className={'menu'}>

                    <NavItem className={'menu-item'}>
                        <Link className="btn btn-success btn-sm" to={"/"}>Home</Link>
                    </NavItem>
                    { sessionStorage.getItem('role_id') === '1' ?
                        <NavItem className={'menu-item'}>
                            <Link className="btn btn-success btn-sm" to={"users"}>Users</Link>
                        </NavItem> : null
                    }
                    <NavItem className={'menu-item'}>
                        <Link className="btn btn-success btn-sm" to={"tasks"}>Tasks</Link>
                    </NavItem>

                    <NavItem className={'menu-item'}>
                        <Link className="btn btn-success btn-sm" to={"logs"}>Logs</Link>
                    </NavItem>

                    <NavItem>
                        <Button className="logout" color="secondary" size="sm" onClick={this._logout}>Logout</Button>
                    </NavItem>


                    <Notifications/>

                </Nav>
            </div>
        );
    }
}