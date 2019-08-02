import React, { Component } from 'react';
import axios from 'axios';
import { Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default class UserProfile extends Component {
  state = {
    id: '',
    username: '',
    password: '',
    githubLink: '',
    profileImg: '',
    role: 'student',
    submitUser: true,
    error: '',
    disabled: true
  }

  componentDidMount() {
    console.log(this.props)
    axios.get(`/api/users/${this.props.match.params.id}`).then(response => {
      this.setState({
        id: response.data._id,
        username: response.data.username,
        githubLink: response.data.githubLink,
        profileImg: response.data.profileImg,
        role: response.data.role,
      })
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = async e => {
    const {username, githubLink, profileImg, role} = {...this.state}
    await axios.put(`/api/users/${this.state.id}`, {username, githubLink, profileImg, role})
    .then(response => {
      console.log(response);
    }).catch(err=> this.setState({
      error: err.message
    }));

    this.setState({
      disabled: !this.state.disabled,
      error: `User edited`
    })
    this.context.history.push('/users/');
    // this.props.history.push('/users/');
  }

  render() {
    return (
      <div>
         <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/users/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" />View All
            </Link>
          </div>
          <div className="col-md-6">
            <div className="input-group-appent">

              {(this.props.user.role === 'TA' || this.props.user._id === this.state.id || this.props.user.role === 'teacher')&&
              <>
                {this.state.disabled?
                <input type="submit" value="Edit"
                onClick={() => this.setState({disabled: !this.state.disabled})}
                className="btn btn-outline-dark" 
                style={{float: "right"}}/>
                :
                <input type="submit" value="Confirm"
                onClick={this.onSubmit}
                className="btn btn-outline-danger"
                style={{float: "right"}}
                />}
              </>}

            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Add User</div>
          <div className="card-body">
          <form>
              <div className="form-group">
                <img 
                src={this.state.profileImg || 
          'https://scontent-vie1-1.xx.fbcdn.net/v/t1.0-9/16196015_10154888128487744_6901111466535510271_n.png?_nc_cat=103&_nc_oc=AQkzn0OPjcr3XQY7UkMt85y2o6HubSMaDYiYQSA_2xvqTwZeUzV7kCvKb0apdC5SmPE&_nc_ht=scontent-vie1-1.xx&oh=16ae35aaabc5b997ec4d338b775d98f7&oe=5DE21BE9'} 
          alt="Users profile img" style={{height: '100%'}} className="form-control"/>
              </div>
            </form>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input 
                type="text"
                className="form-control"
                name="username"
                minLength="2"
                required
                onChange={this.onChange}
                value={this.state.username}
                disabled={this.state.disabled}
                />
              </div>
            </form>
{/* 
            {!this.state.disabled&&
            <form>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input 
                type="password"
                className="form-control"
                name="password"
                required
                onChange={this.onChange}
                value={this.state.password}
                // no point in filling this but to lazy too change now  
                />
              </div>
            </form>} */}
            <form>
              <div className="form-group">
                <label htmlFor="githubLink">Github:</label>
                <input 
                type="text"
                className="form-control"
                name="githubLink"
                onChange={this.onChange}
                value={this.state.githubLink}
                disabled={this.state.disabled}
                />
              </div>
            </form>
            <form>
              <div className="form-group">
                <label htmlFor="profileImg">Profile Image:</label>
                <input 
                type="text"
                className="form-control"
                name="profileImg"
                onChange={this.onChange}
                value={this.state.profileImg}
                disabled={this.state.disabled}
                />
              </div>
            </form>
            {!this.props.user.role === 'student'&&
            <form>
              <div className="form-group">
                <label htmlFor="role">Role:</label>
                <select 
                  name="role"
                  onChange={this.onChange}
                  value={this.state.role}
                  disabled={this.state.disabled}
                  className="form-control"
                  >
                    <option value="student">Student</option>
                    <option value="TA">TA</option>
                    <option value="teacher">Teacher</option>

                  </select>
              </div>
            </form>}
            {this.state.error && (
              <Alert variant="warning">{this.state.error}</Alert>
            )}
            {/* <input 
              type="submit" 
              value="Submit"
              className="btn mt-4 btn-primary btn-block"
              onClick={this.onSubmit}
            />   */}
          </div>
        </div>
      </div>
      </div>
    )
  }
}
