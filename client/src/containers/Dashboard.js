import React, { Component } from "react";
import Sidebar              from "../components/Sidebar";
import AddUser from '../components/users/AddUser'

export default class Dashboard extends Component {
  state = {
    size: "100%"
  };
  render() {
    return (
      <div className="row"> 
        <div className="col-md-10">
          <AddUser />

          
        </div>
        <div className="col-md-2">
          <Sidebar />
        </div>
      </div>
    );
  }
}
