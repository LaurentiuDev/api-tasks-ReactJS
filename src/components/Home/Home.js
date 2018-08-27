import React, {Component} from 'react';
import  '../../css/Home.css';
import Layout from '../Misc/Layout';
import { Button, Form, Input } from "reactstrap";
import axios from "axios/index";

export default class Home extends Component {
    state = {
        user:[],
        name:'',
        password:'',
        message:''
    };

    async componentDidMount() {
        let user = await axios.patch(process.env.REACT_APP_API_URL + 'user');

        if(user && user.data && user.data.data) {
            this.setState({
               user:user.data.data
            });
        }

    }

    _onChange = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
            message:''
        });
    };

    _change = async () => {
        const {name , password} = this.state;
        if(name ) {
            await axios.patch(process.env.REACT_APP_API_URL + 'user', {
                name, password
            }).then(res => {
                if (res.data.errorMessage) {
                    this.setState({
                        message:'Please fill all fields'
                    });
                } else {
                    this.setState({
                        message :'Your info was changed.'
                    });
                }

            }).catch(error => {
                this.setState({
                    message:'Please fill all fields'
                });
            });
        } else {
            this.setState({
                message:'Please fill all field'
            });
        }
    };

    render() {
        const {name ,password,message,user} = this.state;

        return (
            <Layout>
                <p className={'home-text'}>Build a CRM where you can assign task to users, tasks can be marked as done or put in
                    different statuses.</p>
                <br/>
                <p className={'home-text'}>Hello {user.name}</p>
                <br/>

                <div className="Login-content">

                    <p className="title">Change info user</p>

                    <Form>
                        <Input
                            type={"name"}
                            name={"name"}
                            value={name}
                            onChange={this._onChange}
                            placeholder="Name"
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
                        <Button color="primary" onClick={this._change}>
                            Change
                        </Button>
                    </Form>
                </div>
                <br/>
                <p className={'home-text'}>{message}</p>
                <br/> <br/> <br/> <br/> <br/> <br/>

            </Layout>
        )
    }
}
