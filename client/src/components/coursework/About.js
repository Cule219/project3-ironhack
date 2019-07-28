import React, { Component } from "react";
import { getBoard } from "../../services/trelloService";

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
    return <div>{this.state.board && <h2>{this.state.board.name}</h2>}</div>;
  }
}

export default About;
