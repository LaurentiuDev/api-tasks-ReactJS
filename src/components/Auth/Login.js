import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Input } from "reactstrap";
import "../../css/Auth.css";
import { Link } from "react-router-dom";
import {Redirect} from "react-router-dom";
import PropTypes from 'prop-types';

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    message:""
  };
  static  propTypes = {
    email:PropTypes.string,
    password:PropTypes.string,
    message:PropTypes.string
   
  };

  _onChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  _login = async () => {
    const { email, password } = this.state;
   
    const response = await axios.post(process.env.REACT_APP_API_URL + "login", {
      email,
      password
    });
    
    if (response && response.data && response.data.data) {
      sessionStorage.setItem("token", response.data.data.jwt);
      sessionStorage.setItem("role_id",response.data.data.user.role_id);
      this.props.history.push("/");
    } else {
      this.setState({
        message:'Please fill all required filds'
      });
    }
  };

  render() {
    const { email, password , message } = this.state;
    if(sessionStorage.getItem("token")){
        return <Redirect to={'/'}/>;
    }
    console.log(message);
    return (
      <div className="Login-content">
        <Link className="btn btn-secondary" to={"/register"}>
          Register
        </Link>
        <p className="title">Login</p>

        <Form>
          <Input
            type={"email"}
            name={"email"}
            value={email}
            onChange={this._onChange}
            placeholder="Email"
          />{" "}
          <br />
          <Input
            type={"password"}
            name={"password"}
            value={password}
            onChange={this._onChange}
            placeholder="Password"
          />
          <br />
          <Button color="primary" onClick={this._login}>
            Login
          </Button>
            <Link className="forgot" to={'/forgot-password'}>Forgot password</Link><br/><br/>
          <span className="errorMessageLogin">{message}</span>
        </Form>
      </div>
    );
  }
}
