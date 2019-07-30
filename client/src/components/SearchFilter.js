import React from "react";
import { getTags } from "../services/courseworkService"; 

class SearchFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      searchStr: "",
      tags: [],
      incompleteOnly: false
    };
  }

  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    let state = value;
    if (e.target.type === "checkbox") state = e.target.checked;

    this.setState(
      {
        [name]: state
      },
      () => this.props.searchAndFilter(this.state)
    );
  };



  render() {
    return (
      <div>
        <input
          type="text"
          name="searchStr"
          value={this.state.searchStr}
          onChange={this.handleChange}
        />
        <input
          type="checkbox"
          name="incompleteOnly"
          checked={this.state.incompleteOnly}
          onChange={this.handleChange}
        />
        <label>Incomplete</label>
      </div>
    );
  }
}

export default SearchFilter;
