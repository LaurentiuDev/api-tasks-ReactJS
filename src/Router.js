import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import Users from './components/Users/Users';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ResponseRegister from './components/Auth/ResponseRegister';
import Forgot from './components/Auth/Forgot';
import ChangePasswordResult from './components/Auth/ChangePasswordResult';
import Tasks from './components/Tasks';
import {LoggedUser} from "./components/Misc/LoggedUser";
import Logs from './components/Logs/Logs';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LoggedUser(Home)}/>
                    <Route exact path="/users" component={LoggedUser(Users)}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/responseRegister" component={ResponseRegister}/>
                    <Route exact path="/forgot-password" component={Forgot}/>
                    <Route exact path="/change-password-result" component={ChangePasswordResult}/>
                    <Route exact path="/tasks" component={LoggedUser(Tasks)}/>
                    <Route exact path="/logs" component={Logs}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
