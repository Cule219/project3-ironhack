import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signup } from "../services/api";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
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

        {this.state.error && (
          <Alert variant="warning">{this.state.error}</Alert>
        )}

        <Button type="submit">Signup</Button>
      </Form>
    );
  }
}
