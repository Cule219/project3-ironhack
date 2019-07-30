import React from "react";
import { getTags } from "../services/courseworkService";
import { MultiSelect } from "react-selectize";

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

  componentDidMount() {
    getTags().then(tags => {
      this.setState({ tags: tags });
    });
  }

  render() {
    console.log(
      this.state.tags.map(tag => ({
        label: tag.name,
        value: tag.name
      }))
    );
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
        {this.state.tags.length > 0 && (
          <MultiSelect
            placeholder="Filter by tags"
            options={this.state.tags.map(tag => ({
              label: tag.name,
              value: tag.name
            }))}
          />
        )}
        {/* <div class="container">
          <label className="label">Tags</label>
          <p className="control">
            {this.state.tags.length > 0 && (
              <select multiple size={this.state.tags.length}>
                {this.state.tags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag.name}
                  </option>
                ))}
              </select>
            )}
          </p>
        </div> */}
      </div>
    );
  }
}

export default SearchFilter;
