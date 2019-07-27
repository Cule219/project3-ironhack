import React, { Component } from "react";

class TreeList extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.listTitle}</h2>
        <ul>
          {this.props.listItems.map((el, index) => (
            <li key={index}>{el.name}</li> //link to another tree list with the el.name as listTitle, el.children as listItems
          ))}
        </ul>
      </div>
    );
  }
}

export default TreeList;
