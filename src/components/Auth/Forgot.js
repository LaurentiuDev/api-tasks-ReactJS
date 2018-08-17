import React, {Component} from 'react';
import axios from 'axios';
import { Button, Form,  Input } from 'reactstrap';
import '../../css/Auth.css';
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import PropTypes from 'prop-types';

export default class Forgot extends Component {
    state = {
        email: '',
        success:false,
        message:''
    };

    static  propTypes = {
        email:PropTypes.string,
        success:PropTypes.bool,
        message:PropTypes.string
       
      };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _forgot = async () => {
        const {email} = this.state;
        await axios.post(process.env.REACT_APP_API_URL + 'forgot-password',{email})
        .then(res => {
            console.log(res);
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
        const {email,success,message} = this.state;
        if(success){
            return <Redirect to={'/change-password'}/>;
        }
        if(sessionStorage.getItem("token")){
            return <Redirect to={'/users'}/>; 
        }
        return (
            <div className="Login-content">
                <Link className="btn btn-secondary" to={'/'}>Home</Link>
                <p className="title">Find Your Account</p>
                <p className="message-forgot">Please enter your email address  to search for your account.</p>
                <Form>
                    <Input type={'email'} name={'email'} value={email} onChange={this._onChange} placeholder="Email"/> <br/>
                    <Button  color="primary" onClick={ this._forgot}>Reset</Button>
                    <span className="errorMessage">{message}</span>
                </Form>
            </div>
        )
    }
}
