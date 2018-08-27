import React , {Component} from 'react';
import Layout from '../Misc/Layout';
import axios from "axios/index";

export  default  class Logs extends Component {
    state = {
        logs:[],
        shouldRerender:false
    };

    async componentDidMount() {
        let logs = await axios.get(process.env.REACT_APP_API_URL + 'logs').catch(e => {


                this.setState({
                    shouldRerender: true
                });

        });
         if(logs && logs.data && logs.data.data) {
            this.setState({
                logs: logs.data.data
            });
         }
    }

    async componentDidUpdate() {
        if (this.state.shouldRerender) {
            let logs = await axios.get(process.env.REACT_APP_API_URL + 'logs');
            this.setState({
                logs: logs.data.data,
                shouldRerender:false
            });
        }
    }

    _loadNextTasks = async () => {
        const {page} = this.state;

        let response = await axios.get(process.env.REACT_APP_API_URL + `logs?page=${(page + 1)}`);

        this.setState({
            logs: {
                ...response.data.data, data: [
                    ...this.state.logs.data,
                    ...response.data.data.data
                ]
            },
            page: response.data.data.current_page
        });
    };

    componentWillUnmount(){
        this.setState({
            shouldRerender:false
        });
    }

    render () {
        const {logs} = this.state;

        let content = '',logsMapRow='';
        try{
            if(logs.current_page < logs.last_page){
                content = <div className="load-more" onClick={this._loadNextTasks}>Load more</div>;
            }

            logsMapRow = logs.data.map((log, key) => {
                return <tbody key={key}>
                <tr>
                    <td>{log.id}</td>
                    <td>{log.task_id}</td>
                    <td>{log.type === 1 ? "STATUS" : "ASSIGN"}</td>
                    <td>{log.old_value}</td>
                    <td>{log.new_value}</td>
                </tr>
                </tbody>;
            });

        }catch (e) {
            if(logs === undefined) {
                this.setState({
                    shouldRerender: true
                });
            }
        }



        return (
            <Layout>
                <div className={'users-list'}>
                    <table>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Task id</th>
                            <th>Type</th>
                            <th>Old value</th>
                            <th>New value</th>

                        </tr>
                        </thead>
                        {logsMapRow}
                    </table>
                </div>
                <br></br>
                {content}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </Layout>
        );
    }
}