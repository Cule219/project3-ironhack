import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AddUser extends Component {
  state = {
    username: '',
    password: '',
    githubLink: '',
    profileImg: ''
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" />Back to Users
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Add User</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="firstName">Username:</label>
                <input 
                type="text"
                className="form-control"
                name="username"
                minLength="2"
                required
                onChange={this.onChange}
                value={this.state.firstName}
                />
              </div>
            </form>
            <form>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input 
                type="password"
                className="form-control"
                name="password"
                minLength="2"
                required
                onChange={this.onChange}
                value={this.state.lastName}
                />
              </div>
            </form>
            <form>
              <div className="form-group">
                <label htmlFor="githubLink">Github:</label>
                <input 
                type="text"
                className="form-control"
                name="githubLink"
                onChange={this.onChange}
                value={this.state.githubLink}
                />
              </div>
            </form>
            <form>
              <div className="form-group">
                <label htmlFor="imageUrl">Profile Image:</label>
                <input 
                type="text"
                className="form-control"
                name="imageUrl"
                onChange={this.onChange}
                value={this.state.imageUrl}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
