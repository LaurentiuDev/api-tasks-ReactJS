import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from 'reactstrap';
export default class About extends Component {
  _logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role_id");
    this.props.history.push("/login");
  };

  render() {
    
    return (
      <div>
        <p> Hello, again friends! This is the about page.</p>
        {sessionStorage.getItem("role_id") === '1' ? 
          <p>
            Proceed to the <Link to={"/users"}>users list</Link>.
          </p>
         : 
          <Button color="danger" onClick={this._logout}>Logout</Button>
        }
        <br/><br/>
        <p>
          Return <Link to={"/"}>Home</Link>.
        </p>
      </div>
    );
  }
}
