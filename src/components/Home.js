import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Home extends Component {
    
    render() {
        if(!sessionStorage.getItem('token')){
            this.props.history.push("/login");
        }
        return (
            <div>
                <p>Hello, friends!</p>
                <p>Go to <Link to={'/about'}>About</Link> page.</p>
            </div>
        )
    }
}
