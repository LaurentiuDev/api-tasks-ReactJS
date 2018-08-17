import React, {Component} from 'react';
import axios from 'axios';
import { Button, Form,  Input } from 'reactstrap';
import '../../css/Auth.css';
import {Redirect} from "react-router-dom";
import PropTypes from 'prop-types';

export default class ChangePassword extends Component {
    state = {
        email: '',
        code:'',
        password:'',
        success:false,
        message:''
    };
    static  propTypes = {
        email:PropTypes.string,
        code:PropTypes.string,
        password:PropTypes.string,
        success:PropTypes.bool,
        message:PropTypes.string
       
      };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _changePassword = async () => {
        const {email,code,password} = this.state;
        console.log(code);
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
            console.log(error);
        });
    }

    render() {
        const {email,success,code,password,message} = this.state;
        if(success){
            return <Redirect to={'/change-password-result'}/>;
        }
        if(sessionStorage.getItem("token")){
            return <Redirect to={'/users'}/>; 
        }
        return (
            <div className="Login-content">
                <p className="title">Change password</p>
                <p className="message-forgot">Please check your email for a message with your code. Your code is 6 digits long.</p>
                <Form>
                    <Input type={'text'} name={'email'} value={email} onChange={this._onChange} placeholder="Email"/> <br/>
                    <Input type={'text'} name={'code'} value={code} onChange={this._onChange} placeholder="Code"/> <br/>
                    <Input type={'password'} name={'password'} value={password} onChange={this._onChange} placeholder="Password"/> <br/>
                    <Button  color="primary" onClick={ this._changePassword}>Reset</Button>
                    <span className="errorMessage">{message}</span>
                </Form>
            </div>
        )
    }
}
