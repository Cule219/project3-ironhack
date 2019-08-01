import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Users extends Component {
  state = {
    users: ''
  }

  getUsers = () => {
    axios.get('/api/users/').then(response => {
      this.setState({
        users: response.data
      })
    })
  }

  componentDidMount(){
    this.getUsers();
  }

  render() {
    return (
      this.state.users?(
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users"/>Users
                <Link to={`/users/add`}>
                  <button className="btn btn-success" style={{float: 'right'}}>Add New User</button>
                </Link>
              </h2>
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Github Link</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(user => (
                <tr key = {user._id}>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.githubLink}</td>
                  <td>
                    <Link to={`/users/${user._id}`} className="btn btn-secondary btn-sm">
                      <i className="fas fa-arrow-circle-right"/>Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>  
      ):(
        <h1>Loading...</h1>
      )
    )
  }
}
