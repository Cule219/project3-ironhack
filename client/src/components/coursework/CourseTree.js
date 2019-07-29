import React, { Component } from "react";
import { Link } from "react-router-dom";
import Collapsible from "./Collapsible";

class CourseTree extends Component {
  constructor(props) {
    super(props);
    this.state = { open: [], openDay: {} };
  }

  toggleWeek = index => {
    let nowOpen = [...this.state.open];
    nowOpen[index] = !nowOpen[index];
    this.setState({ open: nowOpen });
  };

  toggleDay = id => {
    let daysOpen = { ...this.state.openDay };
    daysOpen[id] = !daysOpen[id];
    this.setState({ openDay: daysOpen });
  };

  render() {
    return (
      <div className="course-tree">
        {this.props.weeks.map((el, index) => (
          <div key={index}>
            <h6>
              <span onClick={() => this.toggleWeek(index)}>
                {this.state.open[index] ? (
                  <img src="../../expanddown.png" width="10px" />
                ) : (
                  `►`
                )}
              </span>
              Week {index + 1}
            </h6>
            <Collapsible open={this.state.open[index]}>
              {el.map(element => (
                <div key={element.id}>
                  <span onClick={() => this.toggleDay(element.id)}>
                    {this.state.openDay[element.id] ? `▼` : `►`}
                  </span>
                  <Link
                    to={{
                      pathname: `/days/${element.id}`,
                      state: { day: element }
                    }}
                  >
                    {element.day ? `Day ${element.day}` : element.name}
                  </Link>
                  <Collapsible open={this.state.openDay[element.id]}>
                    {element.cards.map((card, cardi) => (
                      <div className="small" key={cardi}>
                        <a href={card.attachments[0]}>{card.name}</a>
                      </div>
                    ))}
                  </Collapsible>
                </div>
              ))}
            </Collapsible>
          </div>
        ))}
      </div>
    );
  }
}

export default CourseTree;
