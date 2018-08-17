import React, {Component} from 'react';
import  '../../css/Home.css';
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";

export default class Home extends Component {
    render() {
        if(sessionStorage.getItem("token")){
            return <Redirect to={'/users'}/>; 
        }
        return (
            <div className="HomeContent">
                <p>Hello, friends!</p>
                <p >Go to <Link className="Home-link" to={'/login'}>Login</Link> page.</p>
                <p>Go to <Link className="Home-link" to={'/register'}>Register</Link> page.</p>
                <p>Go to <Link className="Home-link" to={'/about'}>About</Link> page.</p>
            </div>
        )
    }
}
