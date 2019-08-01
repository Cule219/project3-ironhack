import React, { Component } from "react";
import { Form, Alert } from "react-bootstrap";
import { signup } from "../services/api";

export default class Signup extends Component {
  state = {
    username: '',
    password: '',
    githubLink: '',
    profileImg: '',
    role: 'student',
    error: ""
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    const { username, password } = this.state;
    event.preventDefault();

    signup(username, password)
      .then(data => {
        this.props.setUser(data);
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ error: err.response.data.message });
      });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="username">Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="githubLink">githubLink:</Form.Label>
          <Form.Control
            type="password"
            name="githubLink"
            id="githubLink"
            value={this.state.githubLink}
            onChange={this.handleChange}
          />
        </Form.Group>
        {/* <Form.Group>
          <Form.Label htmlFor="role">Role:</Form.Label>
          <Form.Control
            as="select"
            name="role"
            id="role"
            value={this.state.role}
            onChange={this.handleChange}
          >
            <option value="student">Student</option>
            <option value="TA">TA</option>
            <option value="teacher">Teacher</option>
          </Form.Control>
        </Form.Group> */}
        <Form.Group>
          <Form.Label htmlFor="githubLink">githubLink:</Form.Label>
          <Form.Control
            type="password"
            name="githubLink"
            id="githubLink"
            value={this.state.githubLink}
            onChange={this.handleChange}
          />
        </Form.Group>
        {this.state.error && (
          <Alert variant="warning">{this.state.error}</Alert>
        )}

        <input 
          type="submit" 
          value="Submit"
          className="btn mt-4 btn-primary btn-block"
          onClick={this.onSubmit}
        />  
      </Form>
    );
  }
}
