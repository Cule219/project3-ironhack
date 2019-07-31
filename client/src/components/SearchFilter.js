import React from "react";
import { getTags } from "../services/courseworkService";
import Select from "react-select";

class SearchFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      searchStr: "",
      tags: [],
      incompleteOnly: false,
      selectedTags: []
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

  filterByTagsSelect = (tags = []) => {
    console.log(tags, tags.map(el => el.name));
    this.setState(
      {
        selectedTags: tags.map(el => el.value)
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
    console.log(this.state.tags);
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
          <Select
            isMulti
            name="tags"
            placeholder="Filter by tags"
            options={this.state.tags.map(tag => ({
              label: tag.name,
              value: tag.name
            }))}
            onChange={this.filterByTagsSelect}
          />
        )}
      </div>
    );
  }
}

export default SearchFilter;
