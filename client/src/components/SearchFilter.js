import React from "react";
import { getTags } from "../services/courseworkService";
import Select from "react-select";
import { Form } from "react-bootstrap";

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

  filterByTagsSelect = originalTags => {
    const tags = originalTags || [];
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
    return (
      <Form>
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            name="searchStr"
            value={this.state.searchStr}
            onChange={this.handleChange}
            placeholder="Search by Lesson Name"
          />
        </Form.Group>
        <Form.Group>
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
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            name="incompleteOnly"
            checked={this.state.incompleteOnly}
            onChange={this.handleChange}
            label="Incomplete items only"
          />
        </Form.Group>
      </Form>
    );
  }
}

export default SearchFilter;
