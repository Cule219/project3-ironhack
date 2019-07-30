import React, { Component } from "react";
import CompletionStatus from "./CompletionStatus";
import Collapsible from "./Collapsible";
import { Form } from "react-bootstrap";

class SearchResults extends Component {
  state = { tagsOpen: true };

  toggleTags = () => {
    this.setState({ tagsOpen: !this.state.tagsOpen });
  };

  render() {
    return (
      <div className="list-container">
        <Form.Check
          type="checkbox"
          className="check"
          label="Show tags"
          checked={this.state.tagsOpen}
          onChange={this.toggleTags}
        />
        <ul className="list-primary">
          {this.props.results &&
            this.props.results.map(el => (
              <div key={el.id} className="list-item">
                <div className="title-status">
                  <a href={el.attachments[0]}>{el.name}</a>
                  <CompletionStatus {...el} />
                </div>
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
