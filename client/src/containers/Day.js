import React, { Component } from "react";
import { Link } from "react-router-dom";
import LessonsList from "../components/coursework/LessonsList";
import { getDay, getDays, getWeeks } from "../services/courseworkService";
import CourseTree from "../components/coursework/CourseTree";

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayId: this.props.match.params.id,
      weeks: [],
      lessons: [],
      name: ""
    };
  }

  componentDidMount() {
    getWeeks()
      .then(response => {
        let sorted = response.map(el => {
          return el.sort((a, b) => {
            return parseInt(a.day) - parseInt(b.day);
          });
        });
        this.setState({ weeks: sorted });
      })
      .catch(err => {
        console.log("error getting weeks: ", err);
      });
    getDay(this.state.id).then(response => {
      this.setState({ lessons: response.cards, name: response.name });
    });
  }

  setDay = id => {
    getDay(id).then(response => {
      this.setState({
        dayId: id,
        lessons: response.cards,
        name: response.name
      });
    });
  };

  render() {
    return (
      <div>
        <LessonsList {...this.state} />
      </div>
    );
  }
}

export default Day;
