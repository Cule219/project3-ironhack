import React, { Component } from "react";
import CommentBox           from "../components/comments/CommentBox";
import Sidebar              from "../components/Sidebar";

export default class Dashboard extends Component {
  state = {
    size: "100%"
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-10">
          <CommentBox />
        </div>
        <div className="col-md-2">
          <Sidebar />
        </div>
      </div>
    );
  }
}
