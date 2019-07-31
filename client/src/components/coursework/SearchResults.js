import React, { Component } from "react";
import CompletionStatus from "./CompletionStatus";
import Collapsible from "./Collapsible";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { validURL } from "../../services/courseworkService";

class SearchResults extends Component {
  state = { tagsOpen: true };

  toggleTags = () => {
    this.setState({ tagsOpen: !this.state.tagsOpen });
  };

  render() {
    return (
      <div className="list-container">
        <ul className="list-primary">
          {this.props.results &&
            this.props.results.map(el => (
              <div key={el.id} className="list-item">
                <div className="title-status">
                  <a href={el.attachments[0]}>{el.name}</a>
                  <div className="right-float">
                    <Link
                      to={`/days/${el.idList}`}
                      onClick={() => this.props.reloadCourseTree(el.idList)}
                    >
                      <img src="./enter.png" alt="Go to day" width="15px" />
                    </Link>
                    <a onClick={() => this.props.reloadCourseTree(el.idList)}>
                      <img
                        src="./hide-sidebar.svg"
                        alt="View in course tree"
                        width="15px"
                      />
                    </a>
                    <CompletionStatus
                      {...el}
                      reloadCourseTree={this.props.reloadCourseTree}
                    />
                  </div>
                </div>
                <Collapsible open={el.name.indexOf("KATA") !== -1}>
                  {el.desc && (
                    <div
                      className="lesson-description"
                      dangerouslySetInnerHTML={{
                        __html: el.desc
                          .split(/\n|\s/)
                          .map(str =>
                            validURL(str) ? `<a href=${str}>Link</a>` : str
                          )
                          .join(" ")
                      }}
                    />
                  )}
                </Collapsible>
                <Collapsible open={this.state.tagsOpen}>
                  <div className="tags">
                    {el.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{ backgroundColor: `${tag.color}` }}
                      >
                        {tag.name}
                      </span>
                    ))}
                    {el.tech.map((e, i) => (
                      <span key={i} className="technology">
                        {e}
                      </span>
                    ))}
                  </div>
                </Collapsible>
              </div>
            ))}
        </ul>
      </div>
    );
  }
}

export default SearchResults;