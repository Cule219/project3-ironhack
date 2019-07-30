import React from "react";
import { getTags } from "../services/courseworkService";
import { ReactSelectize, MultiSelect } from "react-selectize";

class SearchFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      searchStr: "",
      tags: [
        // { label: "Exercise", value: "Exercise" },
        // { label: "Kata", value: "Kata" },
        // { label: "LAB", value: "LAB" },
        // { label: "Extra Content", value: "Extra Content" },
        // { label: "Additional info", value: "Additional info" },
        // { label: "Lesson", value: "Lesson" },
        // { label: "Events", value: "Events" },
        // { label: "Review", value: "Review" },
        // { label: "Enhancement", value: "Enhancement" },
        // { label: "Career Services", value: "Career Services" },
        // { label: "Recap", value: "Recap" },
        // { label: "Express", value: "Express" },
        // { label: "Mongoose", value: "Mongoose" },
        // { label: "CSS", value: "CSS" },
        // { label: "JS", value: "JS" },
        // { label: "React", value: "React" },
        // { label: "SG", value: "SG" },
        // { label: "jQuery", value: "jQuery" },
        // { label: "ES6", value: "ES6" },
        // { label: "Node", value: "Node" },
        // { label: "JSON", value: "JSON" },
        // { label: "HTML", value: "HTML" },
        // { label: "Google Maps", value: "Google Maps" },
        // { label: "P5", value: "P5" },
        // { label: "MongoDB", value: "MongoDB" },
        // { label: "Passport", value: "Passport" },
        // { label: "AJAX", value: "AJAX" },
        // { label: "Axios", value: "Axios" },
        // { label: "DOM", value: "DOM" }
      ],
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

  filterByTags = e => {
    let options = e.target.options;
    let values = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        console.log(options[i]);
        values.push(options[i].value);
      }
    }
    console.log(values);
    this.setState({ selectedTags: values }, () =>
      this.props.searchAndFilter(this.state)
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
        {/* {this.state.tags.length > 0 && (
          <MultiSelect
            placeholder="Filter by tags"
            options={this.state.tags.map(tag => ({
              label: tag.name,
              value: tag.name
            }))}
            // options={this.state.tags}
            onValuesChange={value => this.filterByTags}
          />
        )} */}
        <div class="container">
          <label className="label">Tags</label>
          <p className="control is-multiple">
            {this.state.tags.length > 0 && (
              <select
                multiple
                size={this.state.tags.length}
                value={this.state.selectedTags}
                onChange={this.filterByTags}
              >
                {this.state.tags.map((tag, index) => (
                  <option key={index} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </select>
            )}
          </p>
        </div>
      </div>
    );
  }
}

export default SearchFilter;
