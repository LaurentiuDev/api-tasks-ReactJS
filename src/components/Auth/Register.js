import React, {Component} from 'react';
import axios from 'axios';
import { Button, Form,  Input } from 'reactstrap';
import '../../css/Auth.css';
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import PropTypes from 'prop-types';

export default class Register extends Component {
    state = {
        name:'',
        email: '',
        password: '',
        message:'',
        success:false
    };
    static  propTypes = {
        name:PropTypes.string,
        email:PropTypes.string,
        password:PropTypes.string,
        message:PropTypes.string,
        success:PropTypes.bool,
       
      };
    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _register = async () => {
        const {name,email, password} = this.state;
       
            await axios.post(process.env.REACT_APP_API_URL + 'register', {
                name,email, password
            }).then( res => {
                if(res.data.errorMessage){
                    this.setState({
                        success:false,
                        message:res.data.errorMessage
                    });
                } else {
                    this.setState({success:true});
                }
                
            }).catch(error => {
                console.log('Error to registration.');
            });
       
    };

    render() {
        const {name,email, password,success,message} = this.state;
        if(success){
            return <Redirect to={'/responseRegister'}/>;
        }
        if(sessionStorage.getItem("token")){
            return <Redirect to={'/users'}/>; 
        }
        return (
            <div className="Login-content">
                <Link className="btn btn-secondary" to={'/login'}>Login</Link>
                <p className="title">Create account</p>
               
                <Form>
                    <Input type={'text'} name={'name'} value={name} onChange={this._onChange} placeholder="Name" required/> <br/>
                    <Input type={'text'} name={'email'} value={email} onChange={this._onChange} placeholder="Email" required/> <br/>
                    <Input type={'password'} name={'password'} value={password} onChange={this._onChange} placeholder="Password" required/><br/>
                    <Button  color="primary" onClick={this._register}>Register</Button>
                    <span className="errorMessageRegister">{message}</span>
                </Form>
            </div>
        )
    }
}
