import React, { Component } from "react";
import { Link } from "react-router-dom";
import Collapsible from "./Collapsible";

class CourseTree extends Component {
  constructor(props) {
    super(props);
    this.state = { open: [], selectedDay: null };
  }

  toggleWeek = index => {
    let nowOpen = [...this.state.open];
    nowOpen[index] = !nowOpen[index];
    this.setState({ open: nowOpen });
  };

  openWeek = (index, id) => {
    let nowOpen = [];
    nowOpen[index] = true;
    this.setState({ open: nowOpen, selectedDay: id });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedWeek !== prevProps.selectedWeek ||
      this.props.selectedDay !== prevProps.selectedDay
    ) {
      console.log("in the coursetree update", this.props);
      this.openWeek(this.props.selectedWeek, this.props.selectedDay);
    }
  }

  render() {
    return (
      <aside className="menu">
        <p className="menu-label">Course Calendar</p>
        <ul className="menu-list">
          {this.props.weeks.map((el, index) => (
            <li key={index}>
              <a onClick={() => this.toggleWeek(index)}>Week {index + 1}</a>
              <Collapsible open={this.state.open[index]}>
                <ul style={{ fontSize: "0.9em" }}>
                  {el.map(element => (
                    <li key={element.id} className="vertical-align-center">
                      <Link
                        to={{
                          pathname: `/days/${element.id}`,
                          state: { day: element }
                        }}
                        className={
                          this.state.selectedDay === element.id
                            ? "is-active"
                            : ""
                        }
                      >
                        {element.day ? `Day ${element.day}` : element.name}
                        <br />
                        {element.cards.map(
                          (card, cardi) =>
                            !card.tags
                              .map(tag => tag.name)
                              .includes("Events") &&
                            !card.tags
                              .map(tag => tag.name)
                              .includes("Additional info") && (
                              <span
                                className="small"
                                key={cardi}
                                style={{
                                  backgroundColor: this.props.user.completedItems.includes(
                                    card.id
                                  )
                                    ? "navy"
                                    : "white",
                                  color: this.props.user.completedItems.includes(
                                    card.id
                                  )
                                    ? "navy"
                                    : "white"
                                }}
                              >
                                --
                              </span>
                            )
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Collapsible>
            </li>
          ))}
        </ul>
        <p className="menu-label">Classmates</p>
        <ul className="menu-list">
          <li>
            {/*Change once protected implemented */}
            {this.props.user && (
              <Link to={`/users/${this.props.user._id}`}>My profile</Link>
            )}
          </li>
        </ul>
        <p className="menu-label">Course Info</p>
        <ul className="menu-list">
          <li>
            <Link to={"/modules"}>Modules</Link>
          </li>
        </ul>
        <p className="menu-label">Resources</p>
        <ul className="menu-list">
          <li>{/* HIIIII I NEED TO GET RESOURCES HERE */}</li>
        </ul>
      </aside>
    );
  }
}

export default CourseTree;

/* <div className="course-tree">
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
      </div> */
