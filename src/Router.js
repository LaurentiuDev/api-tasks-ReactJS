import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import Users from './components/Users/Users';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ResponseRegister from './components/Auth/ResponseRegister';
import Forgot from './components/Auth/Forgot';
import ChangePassword from './components/Auth/ChangePassword';
import ChangePasswordResult from './components/Auth/ChangePasswordResult';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/users" component={Users}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/responseRegister" component={ResponseRegister}/>
                    <Route exact path="/forgot-password" component={Forgot}/>
                    <Route exact path="/change-password" component={ChangePassword}/>
                    <Route exact path="/change-password-result" component={ChangePasswordResult}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
