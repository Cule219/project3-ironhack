import React, { Component } from "react";
import { getModules } from "../../services/courseworkService";
//import { Link } from "react-router-dom";

class ModulesList extends Component {
  constructor(props) {
    super(props);
    this.state = { modules: [] };
  }

  componentDidMount() {
    getModules()
      .then(response => {
        console.log(response);
        this.setState({ modules: response });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="list-container">
        <ul className="list-primary">
          {this.state.modules.map((el, index) => (
            <div key={index}>
              <h2>{el.name}</h2>
              <div dangerouslySetInnerHTML={{ __html: el.description }} />
              {/* <Link to={`/weeks/${index + 1}`}>Week {index + 1}</Link> */}
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default ModulesList;
