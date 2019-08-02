import React, { Component } from "react";
import { getBoard } from "../../services/courseworkService";
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
    let title = this.state.board&&this.state.board.name.toUpperCase();
    return (
      <div>
        {title && <h2>{title}</h2>}
        <ModulesList />
      </div>
    );
  }
}

export default About;
