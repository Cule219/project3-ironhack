import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import Navbar from "./components/Navbar";
import Protected from "./components/Protected";
//import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import About from "./components/coursework/About";
import DaysList from "./components/coursework/DaysList";
import WeeksList from "./components/coursework/WeeksList";
import CourseTree from "./components/coursework/CourseTree";
import { getWeeks } from "./services/courseworkService";
import LessonsList from "./components/coursework/LessonsList";

class App extends React.Component {
  state = {
    user: this.props.user,
    weeks: []
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  componentDidMount() {
    getWeeks()
      .then(response => {
        let sorted = response.map(el => {
          return el.sort((a, b) => {
            return parseInt(a.day) - parseInt(b.day);
          });
        });
        this.setState({ weeks: sorted });
      })
      .catch(err => {
        console.log("error getting weeks: ", err);
      });
  }

  // setView = id => {
  //   getDay(id)
  //     .then(response => {
  //       console.log(response);
  //       this.setState({ day: response });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  render() {
    return (
      <div className="App">
        <Navbar setUser={this.setUser} user={this.state.user} />
        <div className="container">
          <CourseTree weeks={this.state.weeks} />
          <Switch>
            <Route
              exact
              path="/days/:id"
              render={props => <LessonsList {...props} />}
              user={this.state.user}
            />
            <Route
              exact
              path="/days"
              component={DaysList}
              user={this.state.user}
            />
            <Route
              exact
              path="/weeks/:num"
              component={DaysList}
              user={this.state.user}
            />
            <Route
              exact
              path="/weeks"
              component={WeeksList}
              user={this.state.user}
            />
            <Route exact path="/" component={About} user={this.state.user} />
            <Route
              exact
              path="/dashboard"
              component={Dashboard}
              user={this.state.user}
            />

            <Protected
              exact
              path="/signup"
              redirectPath="/"
              setUser={this.setUser}
              user={!this.state.user}
              component={Signup}
            />
            <Protected
              exact
              path="/login"
              redirectPath="/"
              setUser={this.setUser}
              user={!this.state.user}
              component={Login}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
