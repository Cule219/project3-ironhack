import React, { Component } from "react";
import { getDays } from "../../services/trelloService";
import { Link } from "react-router-dom";

class DaysList extends Component {
  constructor(props) {
    super(props);
    this.state = { days: [] };
  }

  componentDidMount() {
    getDays()
      .then(response => {
        this.setState({ days: response });
      })
      .catch(err => {
        console.log(err);
      });
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
