import React, {Component, Fragment} from 'react';
import axios from 'axios';
import { Button, Form,  Input } from 'reactstrap';
import '../../css/Auth.css';
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import PropTypes from 'prop-types';

export default class Forgot extends Component {
    state = {
        email: '',
        code: '',
        password:'',
        success:false,
        message:'',
        showCode:false
    };

    static  propTypes = {
        email:PropTypes.string,
        code:PropTypes.string,
        password:PropTypes.string,
        success:PropTypes.bool,
        message:PropTypes.string,
        showCode:PropTypes.bool
       
      };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _changePassword = async () => {
        const {email,code,password} = this.state;
        await axios.post(process.env.REACT_APP_API_URL + 'change-password',{email,code,password})
            .then(res => {

                if(res.data.errorMessage){
                    this.setState({
                        success:false,
                        message:res.data.errorMessage
                    });
                } else {
                    this.setState({success:true});
                }
            }).catch(error => {
                this.setState({
                    success:false,
                    message:error.data.errorMessage
                });
            });
    };

    _forgot = async () => {
        const {email} = this.state;
        await axios.post(process.env.REACT_APP_API_URL + 'forgot-password',{email})
        .then(res => {
           
            if(res.data.errorMessage){
                this.setState({
                    showCode:false,
                    message:res.data.errorMessage
                });
            } else {
                this.setState({showCode:true});
            }
        }).catch(error => {
            console.log(error);
        });
    };

    _renderMain() {
        const {email,message} = this.state;
        return (
            <Fragment>
                <Link className="btn btn-secondary" to={'/'}>Home</Link>
                <p className="title">Find Your Account</p>
                <p className="message-forgot">Please enter your email address  to search for your account.</p>

                <Form>
                    <Input type={'email'} name={'email'} value={email} onChange={this._onChange} placeholder="Email"/> <br/>
                        <Button  color="primary" onClick={ this._forgot}>Reset</Button>
                    <span className="errorMessage">{message}</span>
                </Form>
            </Fragment>
        );

    }

    _renderCode() {
        const {code,password,message} = this.state;

        return (
            <Fragment>
                <p className="title">Change password</p>
                <p className="message-forgot">Please check your email for a message with your code. Your code is 6 digits long.</p>
                <Form>
                    <Input type={'text'} name={'code'} value={code} onChange={this._onChange} placeholder="Code"/> <br/>
                    <Input type={'password'} name={'password'} value={password} onChange={this._onChange} placeholder="Password"/> <br/>
                    <Button  color="primary" onClick={ this._changePassword}>Reset</Button>
                    <span className="errorMessage">{message}</span>
                </Form>
            </Fragment>
        );
    }

    render() {
        const {showCode,success} = this.state;
        if(success){
            return <Redirect to={'/change-password-result'}/>;
        }
        if(sessionStorage.getItem("token")){
            return <Redirect to={'/users'}/>; 
        }
        return (
            <div className="Login-content">
                { !showCode && this._renderMain()}
                { showCode  && this._renderCode()}
            </div>
        )
    }
}
