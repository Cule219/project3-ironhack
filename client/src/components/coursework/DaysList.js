import React, { Component } from "react";
import { getDays, getWeek } from "../../services/courseworkService";
import { Link } from "react-router-dom";

class DaysList extends Component {
  constructor(props) {
    super(props);
    this.state = { days: [] };
  }

  componentDidMount() {
    let num = this.props.match.params.num || null;
    if (num) {
      getWeek(num)
        .then(response => {
          this.setState({ days: response });
        })
        .catch(err => {
          console.log("error getting days in week. ", err);
        });
    } else {
      getDays()
        .then(response => {
          this.setState({ days: response });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div className="list-container">
        <ul className="list-primary">
          {this.state.days.map((el, index) => (
            <div key={index} className="list-item">
              <Link to={`/days/${el.id}`}>{el.name}</Link>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default DaysList;
