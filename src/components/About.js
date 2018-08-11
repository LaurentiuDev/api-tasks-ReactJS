import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';

export default class About extends Component {
  _logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role_id");
    this.props.history.push("/login");
  };

  render() {
    let checkUser;
    if(sessionStorage.getItem("role_id") === '1')
    {
      checkUser = (
        <p>
            Proceed to the <Link to={"/users"}>users list</Link>.
        </p>
      );
    } else {
      if(sessionStorage.getItem('token')){
          checkUser = (
            <Button color="danger" onClick={this._logout}>Logout</Button>
          );
      }else {
        this.props.history.push("/login");
      }

    }

    return (
      <div>
        <p> Hello, again friends! This is the about page.</p>
        {checkUser}
        <br/><br/>
        <p>
          Return <Link to={"/"}>Home</Link>.
        </p>
      </div>
    );
  }
}
