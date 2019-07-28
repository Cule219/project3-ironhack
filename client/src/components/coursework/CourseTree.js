import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getWeeks, getDays } from "../../services/courseworkService";

class CourseTree extends Component {
  constructor(props) {
    super(props);
    this.state = { weeks: [] };
  }

  componentDidMount() {
    getWeeks()
      .then(response => {
        console.log(response);
        let unsorted = response;
        let sorted = unsorted.map(el => {
          return el.sort((a, b) => {
            return parseInt(a.day) - parseInt(b.day);
          });
        });
        this.setState({ weeks: sorted });
      })
      .catch(err => {
        console.log("error getting weeks: ", err);
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.weeks.map((el, index) => (
            <div key={index}>
              <h5>Week {index + 1}</h5>
              {el.map(element => (
                <h6 key={element.id}>{element.name}</h6>
              ))}
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default CourseTree;
