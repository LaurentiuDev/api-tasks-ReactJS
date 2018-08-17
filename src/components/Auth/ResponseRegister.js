import React, {Component} from 'react';
import '../../css/Auth.css';
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
export default class ResponseResiter extends Component {
    render() {
       
        if(sessionStorage.getItem("token")){
            return <Redirect to={'/users'}/>; 
        }
        return (
            <div className="Login-content">
                <Link className="btn btn-secondary" to={'/'}>Home</Link><br/><br/>
                <p className="title">Thanks for registering</p>
                <p className="title">User is not approved by admin</p>
               
            </div>
        )
    }
}