import React, { Component } from "react";
import Sidebar              from "../components/Sidebar";
import Users from '../components/users/Users';

export default class Dashboard extends Component {
  state = {
    size: "100%"
  };
  render() {
    console.log(this.props)
    return (
      <div className="row"> 
        <div className="col-md-10">
          <Users {...this.props}/>  
          
        </div>
        <div className="col-md-2">
          <Sidebar />
        </div>
      </div>
    );
  }
}
