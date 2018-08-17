import React, { Component } from "react";
import "../../css/Auth.css";
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
export default class ChangePasswordResult extends Component {
 
  render() {
    if(sessionStorage.getItem("token")){
        return <Redirect to={'/users'}/>; 
    }
    return (
      <div className="Login-content">
        <p className="title">Password was changed</p>
        <p className="message-forgot">
          Go back to login.
        </p>
        <Link className="btn btn-secondary" to={'/login'}>Login</Link><br/>
        
      </div>
    );
  }
}
