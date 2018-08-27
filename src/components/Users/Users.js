import React, {Component} from 'react';
import axios from 'axios';
import UserRow from "./UserRow";
import Layout from '../Misc/Layout';
import '../../css/Layout.css';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import {ModalFooter, Button, Modal, ModalHeader, ModalBody, FormGroup, Form, Label, Input} from 'reactstrap';

export default class Users extends Component {
    
    state = {
        users: [],
        open: false,
        id: false,
        name: '',
        email: '',
        password: '',
        status:'',
        role: '',
        shouldRerender: false,
        errorMessage:'',
        openUserDeleteModal:false
    };
    static  propTypes = {
        users:PropTypes.array,
        open:PropTypes.bool,
        id:PropTypes.bool,
        name:PropTypes.string,
        email:PropTypes.string,
        password:PropTypes.string,
        role:PropTypes.string,
        shouldRerender:PropTypes.bool,
    };

    async componentDidMount() {
        let users = await axios.get(process.env.REACT_APP_API_URL + 'admin/users').catch(e=>{
            this.setState({
                shouldRerender:true
            });
        });

        if(users && users.data && users.data.data) {
            this.setState({users: users.data.data});
        }
    }

    async componentDidUpdate() {
        if (this.state.shouldRerender) {
            let users = await axios.get(process.env.REACT_APP_API_URL+ 'admin/users');

            if(users && users.data && users.data.data) {
                this.setState({users: users.data.data, shouldRerender: false});
            }
        }
    }

    _toggle = () => {
        this.setState({
            open: !this.state.open,
            errorMessage:''
        });
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });

        try {
            const {name, email, password, status, role, id} = this.state;

            if((!name || !email || !password || !status || !role) && !id) {
                this.setState({
                    errorMessage: 'Please fill all fields'
                });
            }else {
                this.setState({
                    errorMessage: ''
                });
            }
        }catch (e) {
            console.log(e);
        }

    };

    _userAction = async () => {
        const {name, email, password,status, role, id} = this.state;

        const data = {
            name, email , status
        };

        if (role !== '') {
            data.role = role;
        }
        if((!name || !email || !password || !status || !role) && !id) {
            this.setState({
                errorMessage: 'Please fill all fields'
            });
        }else {
            this.setState({
                errorMessage: ''
            });
        }

        let res;

        if (id) {
            res = await axios.patch(process.env.REACT_APP_API_URL + `admin/user/${id}`, data);
        } else {
            data.password = password;

            res = await axios.post(process.env.REACT_APP_API_URL + 'admin/user', data);
        }

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                open: false
            });
        }
    };

    _add = () => {
        this.setState({
            id: false,
            name: '',
            email: '',
            password:'',
            status:'',
            role: '',
            open: true
        });
    };

    _edit = (user) => {
        this.setState({
            id: user.id,
            name: user.name,
            email: user.email,
            status:user.status,
            role: user.role_id,
            open: true
        });
    };

    _deleteRow = async () => {
        const {id} =this.state;
        console.log(id);
        let res;
        if(id){
            res = await axios.delete(process.env.REACT_APP_API_URL + `admin/user/${id}`);
        }

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                openUserDeleteModal:false
            });
        }
    };

    _loadNextUsers = async () => {
        const {page , users} = this.state;
        if (users.current_page < users.last_page) {
            let response = await axios.get(process.env.REACT_APP_API_URL + `admin/users?page=${(page + 1)}`);

            this.setState({
                users: response.data.data,
                page: response.data.data.current_page
            });
        }
    };

    _loadPreviousUsers = async () => {
        const {page} = this.state;

        let response = await axios.get(process.env.REACT_APP_API_URL + `admin/users?page=${(page -1 )}`);

        this.setState({
            users: response.data.data,
            page: response.data.data.current_page
        });
    };

    componentWillUnmount(){
        this.setState({
            shouldRerender:false
        });
    }

    _toggleUserDeteleModal = (id) => {
        this.setState({
            id:id,
            openUserDeleteModal: !this.state.openUserDeleteModal
        });
    };

    render() {
        const {users, id , errorMessage,openUserDeleteModal} = this.state;

        let content = '',userMapRow='';
        let first ='' ,last ='' ,currentPage;
        try{
            if(users.current_page) {
                currentPage = <PaginationLink>{users.current_page} </PaginationLink>;
            } else {
                currentPage = null;
            }
            first =      <PaginationItem onClick={this._loadPreviousUsers}>
                <PaginationLink previous/>
            </PaginationItem>;


            last = <PaginationItem onClick={this._loadNextUsers}>
                <PaginationLink next  />
            </PaginationItem>;

            userMapRow = users.data.map((user, key) => {
                return <UserRow key={key} count={key} user={user} edit={this._edit} deleteRow={this._toggleUserDeteleModal}/>
            });



        }catch (e) {
            if(userMapRow === undefined || content ===undefined)  {
                this.setState({
                    shouldRerender: true
                });
            }
        }



        return (
            <Layout>
                <Button  color="success" onClick={this._add}>Add user</Button>
                <Modal isOpen={this.state.open} toggle={this._toggle}>
                    <ModalHeader toggle={this._toggle}>{id ? 'Edit user' : 'Add user'}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text"
                                       name="name"
                                       id="name"
                                       placeholder="Name"
                                       value={this.state.name}
                                       onChange={this._onChange} required="required"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email"
                                       name="email"
                                       id="email"
                                       placeholder="Email"
                                       value={this.state.email}
                                       onChange={this._onChange}/>
                            </FormGroup>
                            {!id && <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password"
                                       name="password"
                                       id="password"
                                       placeholder="Password"
                                       value={this.state.password}
                                       onChange={this._onChange}/>
                            </FormGroup>}

                            <FormGroup>
                                <Label for="status">Status</Label>
                                <Input type="select"
                                       name="status"
                                       id="status"
                                       onChange={this._onChange}
                                       value={this.state.status}>
                                    <option value={''}>Select</option>
                                    <option value={0}>Inactive</option>
                                    <option value={1}>Active</option>
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="role">Role</Label>
                                <Input type="select"
                                       name="role"
                                       id="role"
                                       onChange={this._onChange}
                                       value={this.state.role}>
                                    <option value={''}>Select</option>
                                    <option value={1}>Admin</option>
                                    <option value={2}>User</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <span className={'errorMessage'}>{errorMessage}</span>
                    <ModalFooter>
                        <Button color="primary" onClick={this._userAction}>{id ? 'Edit user' : 'Add user'}</Button>
                        <Button color="secondary" onClick={this._toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={openUserDeleteModal} toggle={this._toggleUserDeteleModal}>
                    <ModalBody>
                        <p>Are you sure you want to delete this task?</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button color={'primary'} size={'sm'} onClick={() => this._deleteRow()}>Delete</Button>
                        <Button color={'danger'} size={'sm'} onClick={() => this._toggleUserDeteleModal(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <br></br><br></br>
                <Pagination  aria-label="Page navigation example">
                    {first}
                    {currentPage}
                    {last}
                </Pagination>
                <div className={'users-list'}>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {userMapRow}
                </table>
                </div>
                <br></br>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </Layout>
        )
    }
  
}
