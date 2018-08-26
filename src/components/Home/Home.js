import React, {Component} from 'react';
import  '../../css/Home.css';
import Layout from '../Misc/Layout';

export default class Home extends Component {
    render() {

        return (
            <Layout>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/> <br/> <br/> <br/> <br/> <br/> <br/>
                <p className={'home-text'}>Build a CRM where you can assign task to users, tasks can be marked as done or put in
                    different statuses.</p>
            </Layout>
        )
    }
}
