import React, { Component } from "react";
import CompletionStatus from "./CompletionStatus";
import Collapsible from "./Collapsible";
import { Link } from "react-router-dom";
import { validURL } from "../../services/courseworkService";

class SearchResults extends Component {
  goToDay = idList => {
    this.props.reloadCourseTree(idList);
    this.props.closeSearch();
  };

  render() {
    return (
      <>
        <h2>Search Results</h2>
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
                        onClick={() => this.goToDay(el.idList)}
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
                        {...el} {...this.props}
                        reloadCourseTree={this.props.reloadCourseTree}
                        user={this.props.user}
                        setUser={this.props.setUser}
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
                  <div className="tags-special">
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
                </div>
              ))}
          </ul>
        </div>
      </>
    );
  }
}

export default SearchResults;
