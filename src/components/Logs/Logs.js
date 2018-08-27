import React , {Component} from 'react';
import Layout from '../Misc/Layout';
import axios from "axios/index";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

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


    _loadNextLogs = async () => {
        const {page , logs} = this.state;
        if (logs.current_page < logs.last_page) {
            let response = await axios.get(process.env.REACT_APP_API_URL + `logs?page=${(page + 1)}`);

            this.setState({
                logs: response.data.data,
                page: response.data.data.current_page
            });
        }
    };

    _loadPreviousLogs = async () => {
        const {page} = this.state;

        let response = await axios.get(process.env.REACT_APP_API_URL + `logs?page=${(page -1 )}`);

        this.setState({
            logs: response.data.data,
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

        let logsMapRow='';
        let first ='' ,last ='' ,currentPage;
        try{

            if(logs.current_page) {
                currentPage = <PaginationLink>{logs.current_page} </PaginationLink>;
            } else {
                currentPage = null;
            }
            first =      <PaginationItem onClick={this._loadPreviousLogs}>
                <PaginationLink previous/>
            </PaginationItem>;


            last = <PaginationItem onClick={this._loadNextLogs}>
                <PaginationLink next  />
            </PaginationItem>;

            logsMapRow = logs.data.map((log, key) => {
                return <tbody key={key}>
                <tr>
                    <td>{key+1}</td>
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

                <Pagination  aria-label="Page navigation example">
                    {first}
                    {currentPage}
                    {last}
                </Pagination>
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