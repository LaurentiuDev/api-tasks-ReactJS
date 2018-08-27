import React, {Component} from 'react';
import Layout from "../Misc/Layout";
import axios from "axios";
import {ModalFooter, Button, Modal, ModalHeader, ModalBody, FormGroup, Form, Label, Input} from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


export default class Tasks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            users: [],
            comments:[],
            shouldRerender: false,
            name: '',
            description: '',
            status:'',
            assign: '',
            open: false,
            comment:'',
            openCommentModal:false,
            openTaskDeleteModal:false,
            id: false,
            page: 1,
            errorMessage:''
        }
    }

    async componentDidMount() {
        let response = await axios.get(process.env.REACT_APP_API_URL + `tasks`).catch(e=>{
            this.setState({
                shouldRerender:true
            });
        });

        let usersResponse = await axios.get(process.env.REACT_APP_API_URL + `user/users`).catch(e => {
           this.setState({
               shouldRerender:true
           });
        });


        let commetsResponse = await axios.get(process.env.REACT_APP_API_URL + 'comments').catch(e=>{
            this.setState({
                shouldRerender:true
            });
        });

        let hasCurrent_page;
        try {
             hasCurrent_page = response.data.data.current_page;
        }catch(err) {
            this.setState({
                shouldRerender:true
            });
        }

        if(commetsResponse && commetsResponse.data && commetsResponse.data.data) {
            this.setState({
                comments: commetsResponse.data.data
            });
        }

        if(response && response.data && response.data.data) {
            this.setState({
                tasks: response.data.data
            });
        }

        if(usersResponse && usersResponse.data && usersResponse.data.data) {
            this.setState({
                users: usersResponse.data.data
            });
        }
        if(hasCurrent_page) {
            this.setState({
                page:hasCurrent_page
            });
        }
    }

    _loadNextTasks = async () => {
        const {page , tasks} = this.state;
        if (tasks.current_page < tasks.last_page) {
            let response = await axios.get(process.env.REACT_APP_API_URL + `tasks?page=${(page + 1)}`);

            this.setState({
                tasks: response.data.data,
                page: response.data.data.current_page
            });
        }
    };

    _loadPreviousTasks = async () => {
        const {page} = this.state;

        let response = await axios.get(process.env.REACT_APP_API_URL + `tasks?page=${(page -1 )}`);

        this.setState({
            tasks: response.data.data,
            page: response.data.data.current_page
        });
    };

    async componentDidUpdate() {
        if (this.state.shouldRerender) {
            let response = await axios.get(process.env.REACT_APP_API_URL+'tasks');
            let commetsResponse = await axios.get(process.env.REACT_APP_API_URL + 'comments');
            this.setState({
                tasks: response.data.data,
                comments:commetsResponse.data.data,
                shouldRerender: false

            });
        }
    }

    _toggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _add = () => {
        this.setState({
            id: false,
            name: '',
            description: '',
            assign: '',
            open: true,
            errorMessage:''
        });
    };

    _edit = (task) => {
        this.setState({
            id: task.id,
            name: task.name,
            description: task.description,
            assign: task.assign,
            status:task.status,
            open: true ,
            errorMessage:''
        });
    };

    _addTask = async () => {
        const {name, description, assign,status} = this.state;

        let res = await axios.post(process.env.REACT_APP_API_URL + 'task', {name, description,status, assign});
        if(!name || !description || !assign || !status) {
            this.setState({
               errorMessage:'Please fill all required fields'
            });
        }
        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                open: false
            });
        }
    };

    _editTask = async () => {
        const {id, name, description,status, assign} = this.state;

        let res = await axios.patch(process.env.REACT_APP_API_URL + `task/${id}`, {name, description,status, assign});

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                open: false
            });
        }
    };

    _deleteTask = async () => {
        const {id} = this.state;
        let res = await axios.delete(process.env.REACT_APP_API_URL + `task/${id}`);

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                open: false,
                openTaskDeleteModal:false
            });
        }
    };

    _showUser = user_id => {
        const {users} = this.state;

        let name = '';

        users && users.map((user) => {
            return user.id === user_id ? name = user.name : null;
        });

        return name;
    };

    _showModalComment = (id) => {
        this.setState({
            id:id,
            comment:'',
            openCommentModal:true,
            errorMessage:''
        });
    };

    _addComment = async () => {
        const {id,comment} = this.state;
        if(!comment) {
            this.setState({
               errorMessage:'Field is required'
            });
        }
        let res = await axios.post(process.env.REACT_APP_API_URL + `user/addComment/${id}`,{comment});

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                openCommentModal:false
            });
        }
    };

    _toggleComment = () => {
        this.setState({
            openCommentModal: !this.state.openCommentModal
        });
    };

    _toggleTaskDeteleModal = (id) => {
        this.setState({
            id:id,
            openTaskDeleteModal: !this.state.openTaskDeleteModal
        });
    };

    _showStatus = (status) => {
        let nameStatus = '';

        switch (status) {
            case 0 : nameStatus = 'Assigned' ; break;
            case 1 : nameStatus = 'In progress' ; break;
            case 2 : nameStatus = 'Not done' ; break;
            case 3 : nameStatus = 'Done' ; break;
            default : nameStatus ='Status not selected';
        }

        return nameStatus;
    };

    componentWillUnmount(){
        this.setState({
            shouldRerender:false
        });
    }

    render() {
        const {tasks, users,comments, name, description,status, assign, open, id,openCommentModal,comment,openTaskDeleteModal,errorMessage} = this.state;
        let first ='' , contentTasks='',last ='' ,currentPage ;

        try {
            if(tasks.current_page) {
                currentPage = <PaginationLink>{tasks.current_page} </PaginationLink>;
            } else {
                currentPage = null;
            }
            first = <PaginationItem onClick={this._loadPreviousTasks}>
                         <PaginationLink previous/>
                     </PaginationItem>;


             last = <PaginationItem onClick={this._loadNextTasks}>
                        <PaginationLink next  />
                    </PaginationItem>;


            contentTasks = tasks && tasks.data && tasks.data.map((task, key) => {
                return <tbody key={key}>
                <tr>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{this._showStatus(task.status)}</td>
                    <td>{this._showUser(task.user_id)}</td>
                    <td>{this._showUser(task.assign)}</td>
                    <td>{comments && comments.map((comm)=>{
                        return task.id === comm.task_id ? comm.comment + '\n' : null
                    })}</td>
                    <td>
                        <Button color="secondary" size="sm" onClick={() => this._showModalComment(task.id)} >Comm</Button>
                        <Button color="secondary" size="sm" onClick={() => this._edit(task)}>Edit</Button>
                        <Button color="danger" size="sm" onClick={() => this._toggleTaskDeteleModal(task.id)} >Delete</Button>
                    </td>
                </tr>
                </tbody>;
            });


        }catch (e) {
            if(contentTasks === undefined) {
                this.setState({
                    shouldRerender:true
                });
            }
        }



        return (
            <Layout>
                <Modal isOpen={open} toggle={this._toggle}>
                    <ModalHeader toggle={this._toggle}>{id ? 'Edit task' : 'Add task'}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text"
                                       name="name"
                                       id="name"
                                       placeholder="Name"
                                       value={name}
                                       onChange={this._onChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="textarea"
                                       name="description"
                                       id="description"
                                       placeholder="Description"
                                       value={description}
                                       onChange={this._onChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="status">Status</Label>
                                <Input type="select"
                                       name="status"
                                       id="status"
                                       onChange={this._onChange}
                                       value={status}>
                                    <option value={'0'}>Assigned</option>
                                    <option value={'1'}>In progress</option>
                                    <option value={'2'}>Not done</option>
                                    <option value={'3'}>Done</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="assign">Select</Label>
                                <Input type="select"
                                       name="assign"
                                       id="assign"
                                       onChange={this._onChange}
                                       value={assign}>
                                    <option value={''}>Select</option>
                                    {users && users.map((user, key) => {
                                        return <option key={key} value={user.id}>{user.name}</option>;
                                    })}
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <span className={'errorMessage'}>{errorMessage}</span>
                    <ModalFooter>
                        <Button color="primary"
                                onClick={id ? this._editTask : this._addTask}>{id ? 'Edit task' : 'Add task'}</Button>
                        <Button color="secondary" onClick={this._toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={openCommentModal} toggle={this._toggleComment}>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="comment">Comment</Label>
                                <Input type="textarea"
                                       name="comment"
                                       id="comment"
                                       value={comment}
                                       onChange={this._onChange}/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <span className={'errorMessageComment'}>{errorMessage}</span>
                    <ModalFooter>
                        <Button color={'primary'} size={'sm'} onClick={this._addComment}>Comment</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={openTaskDeleteModal} toggle={this._toggleTaskDeteleModal}>
                    <ModalBody>
                        <p>Are you sure you want to delete this task?</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button color={'primary'} size={'sm'} onClick={() => this._deleteTask()}>Delete</Button>
                        <Button color={'danger'} size={'sm'} onClick={() => this._toggleTaskDeteleModal(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Button  color="success" onClick={this._add}>Add task</Button>
                <br></br>
                <br></br>
                <Pagination  aria-label="Page navigation example">
                    {first}
                    {currentPage}
                    {last}
                </Pagination>
                <div className="tasks-list">
                    <table>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Created by</th>
                            <th>Assigned to</th>
                            <th>Comment</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        {contentTasks}
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
