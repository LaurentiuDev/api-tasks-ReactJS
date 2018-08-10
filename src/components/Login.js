import React, {Component} from 'react';
import axios from 'axios';
import './Login.css';
import { Button, Form,  Input } from 'reactstrap';

export default class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _login = async () => {
        const {email, password} = this.state;

        const response = await axios.post('http://api.tasks.local/v1/login', {
            email, password
        });
       
        if (response && response.data && response.data.data) {
            sessionStorage.setItem('token', response.data.data.token);
    
            sessionStorage.setItem('role_id',response.data.data.user.role_id);

            if(sessionStorage.getItem('role_id') === '1'){
                this.props.history.push('/users');
            } else {
                this.props.history.push('/');
            }
        } else {
             console.log('Error to get data');
        }
    };

    render() {
        const {email, password} = this.state;

        return (
            <div>
                <p>Hello, login!</p>
                <div className="content-login">
                    <Form>
                        <Input  type={'text'} name={'email'} value={email} onChange={this._onChange} placeholder="Email"/><br/><br/>
                        <Input  type={'password'} name={'password'} value={password} onChange={this._onChange} placeholder="Password"/><br/> <br/>
                        <Button color="primary" className="btnLogin" onClick={this._login}>Login</Button>
                    </Form>
                </div>
                
            </div>
        )
    }
}
