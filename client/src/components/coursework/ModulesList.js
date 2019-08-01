import React, { Component } from "react";
import { getModules } from "../../services/courseworkService";
import Collapsible from "./Collapsible";
//import { Link } from "react-router-dom";

class ModulesList extends Component {
  constructor(props) {
    super(props);
    this.state = { modules: [], open: [false, false, false] };
    // console.log("here I am");
  }

  componentDidMount() {
    // console.log("here mounting");
    getModules()
      .then(response => {
        let sorted = response.sort((a, b) => {
          return a.number - b.number;
        });
        this.setState({ modules: sorted });
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleModule = index => {
    let nowOpen = [...this.state.open];
    nowOpen[index] = !nowOpen[index];
    this.setState({ open: nowOpen });
  };

  render() {
    return (
      <div className="list-container">
        <ul className="list-primary">
          {this.state.modules.map((el, index) => (
            <div key={index}>
              <a>
                <h2 onClick={() => this.toggleModule(index)}>{el.name}</h2>
              </a>
              <Collapsible open={this.state.open[index]}>
                {console.log(el.description)}
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: el.description }}
                />
              </Collapsible>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default ModulesList;
