import React, {Component, Fragment} from 'react';
import '../../css/Notifications.css';
import axios from "axios";
import {ButtonDropdown} from 'reactstrap';

export default class Notifications extends Component {
    state = {
        notifications: [],
        user:[],
        isOpenDropDown:false ,
        count: null ,
        shouldRerenderNotifications:false,
        shouldRerenderUser:false,
        shouldRerenderGetCountNotifications:false,
        notificationCount: null
    };

    async componentDidMount() {
        let notifications = await axios.get(process.env.REACT_APP_API_URL + 'notifications')
            .catch(e =>{
            this.setState({
               shouldRerenderNotifications:true
           });
        });


        let usersResponse = await axios.get(process.env.REACT_APP_API_URL + 'user')
            .catch(e => {
            this.setState({
                shouldRerenderUser:true
            });
        });


        if(notifications && notifications.data && notifications.data.data) {
            this.setState({
                notifications: notifications.data.data.reverse()
            });
        }


        if(usersResponse && usersResponse.data && usersResponse.data.data) {
            this.setState({
                user:usersResponse.data.data
            });

        }

        let notificationCount = await axios.get(process.env.REACT_APP_API_URL + `getCountNotifications/${this.state.user.id}`).catch(e=>{
            this.setState({
                shouldRerenderGetCountNotifications:true
            });
        });

        if(notificationCount && notificationCount.data && notificationCount.data.data) {
            this.setState({
                notificationCount : notificationCount.data.data
            });

        }


        if(this.state.notificationCount !== null && this.state.notificationCount>0) {

            let count = Object.keys(this.state.notifications).length - this.state.notificationCount;

            this.setState({
                count: count ? count : 0
            });

            if (count) {

                const data = {
                    'user_id': this.state.user.id,
                };
                await axios.post(process.env.REACT_APP_API_URL + 'currentNotifications', data)
                .catch(e => {
                        //console.log(e);
                });
            }
        }
    }

    _toggleDropDown = async () => {
        const {user ,notifications} = this.state;

        let count = Object.keys(notifications).length;

        const data = {
            'user_id' : user.id,
            'count' : count
        };

        await axios.post(process.env.REACT_APP_API_URL + 'currentNotifications',data);

        this.setState({
            isOpenDropDown: !this.state.isOpenDropDown,
            count: 0
        });
    };

    async componentDidUpdate(){
        if (this.state.shouldRerenderNotifications) {
            let notifications = await axios.get(process.env.REACT_APP_API_URL + 'notifications');

            if(notifications && notifications.data && notifications.data.data) {
                this.setState({
                   notifications:notifications.data.data,
                    shouldRerenderNotifications:false
                });
            }
        }

        if (this.state.shouldRerenderUser) {
            let usersResponse = await axios.get(process.env.REACT_APP_API_URL + 'user');

            if(usersResponse && usersResponse.data && usersResponse.data.data) {
                this.setState({
                    user:usersResponse.data.data,
                    shouldRerenderUser:false
                });
            }
        }

        if (this.state.shouldRerenderGetCountNotifications) {
            let notificationCount = await axios.get(process.env.REACT_APP_API_URL + `getCountNotifications/${this.state.user.id}`);

            if(notificationCount && notificationCount.data && notificationCount.data.data) {
                this.setState({
                    count: notificationCount.data.data,
                    shouldRerenderGetCountNotifications:false
                });
            }
        }
    }



    componentWillUnmount(){
        this.setState({
            shouldRerenderNotifications:false,
            shouldRerenderGetCountNotifications:false,
            shouldRerenderUser:false
        });
    }

    render() {
        const {notifications , isOpenDropDown,count} = this.state;

        let now = new Date();
        let notificationDate;
        let contentNotifications = '' , notificationCount = '';

        try {
            contentNotifications =notifications && notifications.map((notification, key) => {
                notificationDate = new Date(notification.updated_at);
                return (
                    <Fragment
                        key={key}>
                        <li>{notification.message} {Math.round((now - notificationDate)/ (1000 * 60))} minutes ago</li><hr/>
                    </Fragment>)
            });

            notificationCount =<span className="label label-warning">{count > 0 ? count : null}</span>;

        }catch (e) {
            if( notifications === undefined) {
                this.setState({
                    shouldRerenderNotifications:true
                });
            }

            if(count < 0 ) {
                this.setState({
                    shouldRerenderNotifications:true
                });
            }
        }

        return (
            <Fragment>
                {   isOpenDropDown ?
                    <div className={'notification-dropDown'}>
                        <ul>
                            <li>You have {Object.keys(notifications).length} notifications</li><hr/>
                            {contentNotifications}
                        </ul>
                    </div> : null
                }
                <ButtonDropdown isOpen={this.state.isOpenDropDown} toggle={this._toggleDropDown}>
                </ButtonDropdown>
                <div className={'notification-icon'} onClick={this._toggleDropDown}>
                    <i className="far fa-bell"/>
                    {notificationCount}
                </div>

            </Fragment>
        );
    }
}