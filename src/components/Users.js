import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Users.css";
import RowsTable from "./RowsTable";
import { Button } from 'reactstrap';


export default class Users extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
      
    axios.defaults.headers.post["Content-Type"] = "application/json";

    let token = sessionStorage.getItem("token");
    
    axios.defaults.headers.common = { Authorization: "Bearer " + token };

    console.log(sessionStorage.getItem("role_id"));
    if (sessionStorage.getItem("token")) {
      await axios
        .get("http://api.tasks.local/v1/admin/users")
        .then(response => {
          this.setState({ users: response.data.data });
        });
    }
  }

  _logout = () => {
    sessionStorage.removeItem("token");

    this.props.history.push("/");
  };

  render() {
    if (sessionStorage.getItem("role_id") === "2") {
      return <Redirect to={"/"} />;
    }
    if (!sessionStorage.getItem("token")) {
      return <Redirect to={"/login"} />;
    }

    const { users } = this.state;

    return (
      <Fragment>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr className="thead-light">
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <RowsTable count={i} user={user} />
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Return <Link to={"/"}>Home</Link>.
        </p>
        <Button color="danger" onClick={this._logout}>Logout</Button>
      </Fragment>
    );
  }
}
