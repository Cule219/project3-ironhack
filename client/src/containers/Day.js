import React, { Component } from "react";
import { Link } from "react-router-dom";
import LessonsList from "../components/coursework/LessonsList";
import { getDay, getDays, getWeeks } from "../services/courseworkService";

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = { lessons: [], name: "", comments: [], notes: "" };
  }

  componentDidMount() {}

  render() {
    return <div />;
  }
}

export default Day;
