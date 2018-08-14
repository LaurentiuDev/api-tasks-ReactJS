import React, {Component} from 'react';
import axios from 'axios';
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

        const response = await axios.post(process.env.REACT_APP_API_URL + 'login', {
            email, password
        });

        if (response && response.data && response.data.data) {
            sessionStorage.setItem('token', response.data.data.jwt);
            this.props.history.push('/users');
        } else {
            //afisam eroare
        }
    };

    render() {
        const {email, password} = this.state;

        return (
            <div>
                <p>Hello, login!</p>
                <Form>
                    <Input type={'text'} name={'email'} value={email} onChange={this._onChange}/> <br/><br/>
                    <Input type={'password'} name={'password'} value={password} onChange={this._onChange}/><br/><br/>
                    <Button color="primary" onClick={this._login}>Login</Button>
                </Form>
            </div>
        )
    }
}
