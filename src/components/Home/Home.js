import React, {Component} from 'react';
import classes from '../../css/Home.css';
import {Link} from "react-router-dom";

export default class Home extends Component {
    render() {
        return (
            <div className={classes.HomeContent}>
                <p>Hello, friends!</p>
                <p>Go to <Link to={'/login'}>Login</Link> page.</p>
                <p>Go to <Link to={'/register'}>Register</Link> page.</p>
                <p>Go to <Link to={'/about'}>About</Link> page.</p>
            </div>
        )
    }
}
