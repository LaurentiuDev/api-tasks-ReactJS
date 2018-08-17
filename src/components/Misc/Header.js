import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Button} from 'reactstrap';
import '../../css/Header.css';

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
                <Button color="secondary" size="sm" onClick={this._logout}>Logout</Button>
            </div>
        );
    }
}