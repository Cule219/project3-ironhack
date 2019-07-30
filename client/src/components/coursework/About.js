import React, { Component } from "react";
import { getBoard } from "../../services/courseworkService";
import { Link } from "react-router-dom";
import ModulesList from "./ModulesList";


class About extends Component {
  constructor() {
    super();
    this.state = { board: null };
  }

  componentDidMount() {
    getBoard()
      .then(response => this.setState({ board: response }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>
          <Link to="/dashboard">Dashboard</Link>
        </h1>
        {this.state.board && <h2>{this.state.board.name}</h2>}
        <ModulesList />
      </div>
    );
  }
}

export default About;
