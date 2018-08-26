import React, {Component} from 'react';
import { Button} from 'reactstrap';
import PropTypes from 'prop-types';


export default class UserRow extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        edit: PropTypes.func.isRequired,
        deleteRow:PropTypes.func.isRequired
    };

    _showRole = role => {
        switch (role) {
            case 1:
                return 'Admin';
            case 2:
                return 'User';
            default:
                return 'Unknown'
        }
    };

    _showStatus = status => {
        switch (status) {
            case 0 : return 'Inactive';
            case 1 : return 'Active';
            default: return 'Unknown';
        }
    };

    _edit = (user) => {
        const {edit} = this.props;

        edit && edit(user);
    };

    _deleteRow = (user) => {
        const {deleteRow} = this.props;

        deleteRow && deleteRow(user);
    };

    render() {
        const {user} = this.props;

        return (
            <React.Fragment>
                <tbody>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{this._showRole(user.role_id)}</td>
                        <td>{this._showStatus(user.status)}</td>
                        <td>
                            <Button color="secondary" size="sm" onClick={() => this._edit(user)}>Edit</Button>
                            <Button color="danger"  size="sm" onClick={() => this._deleteRow(user.id)}>Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </React.Fragment>
        );
    }
}