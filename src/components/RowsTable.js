import React, { Component } from 'react';


export default class RowsTable extends Component {
    render(){
        return(
            <tr key={this.props.user.id}>
                 <td >{this.props.count+1}</td>
                 <td >{this.props.user.name}</td>
                 <td >{this.props.user.email}</td>
                 <td >{this.props.user.role_id ===1 ? "Admin" : "User"}</td>
            </tr>
        )
    }
}

