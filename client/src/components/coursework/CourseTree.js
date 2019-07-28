import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getWeeks, getDays } from "../../services/courseworkService";
import Collapsible from "./Collapsible";

class CourseTree extends Component {
  constructor(props) {
    super(props);
    this.state = { weeks: [], open: [] };
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
  }

  toggleWeek = index => {
    let nowOpen = [...this.state.open];
    nowOpen[index] = !nowOpen[index];
    this.setState({ open: nowOpen });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.weeks.map((el, index) => (
            <div key={index}>
              <h5>
                <span onClick={() => this.toggleWeek(index)}>
                  {this.state.open[index] ? `▼` : `►`}
                </span>
                Week {index + 1}
              </h5>
              <Collapsible open={this.state.open[index]}>
                {el.map(element => (
                  <p key={element.id}>
                    <Link to={`/days/${element.id}`}>
                      {element.day ? `Day ${element.day}` : element.name}
                    </Link>
                  </p>
                ))}
              </Collapsible>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default CourseTree;
