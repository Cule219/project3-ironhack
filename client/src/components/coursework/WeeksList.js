import React, { Component } from "react";
import { getWeeks } from "../../services/courseworkService";
import { Link } from "react-router-dom";

class WeeksList extends Component {
  constructor(props) {
    super(props);
    this.state = { weeks: [] };
  }

  componentDidMount() {
    getWeeks()
      .then(response => {
        this.setState({ weeks: response });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="list-container">
        <ul className="list-primary">
          {this.state.weeks.map((el, index) => (
            <div key={index} className="list-item">
              <Link to={`/weeks/${index + 1}`}>Week {index + 1}</Link>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default WeeksList;
