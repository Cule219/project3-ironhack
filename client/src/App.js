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
import { getWeeks, getLessons } from "./services/courseworkService";
import LessonsList from "./components/coursework/LessonsList";
import SearchFilter from "./components/SearchFilter";
import SearchResults from "./components/coursework/SearchResults";
import { Button } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      weeks: [],
      filteredResults: [],
      searchOpen: false
    };
  }

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

  handleSearchFilter = state => {
    let regex = new RegExp(state.searchStr, "i");
    getLessons().then(lessons => {
      const filteredLessons = lessons.filter(el => {
        let completionStatusMatches = state.incompleteOnly
          ? el.completionStatus === false
          : true;
        let tagsMatch =
          state.selectedTags.length === 0
            ? true
            : el.tags
                .map(t => t.name)
                .concat(el.tech)
                .filter(e => state.selectedTags.includes(e)).length > 0;
        return completionStatusMatches && tagsMatch && el.name.match(regex);
      });
      console.log(filteredLessons);
      this.setState({ filteredResults: filteredLessons });
      this.props.history.push("/results");
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar setUser={this.setUser} user={this.state.user} />
        <div className="container">
          <div className="row">
            <div className="col-sm-5 col-md-4 col-lg-3 list-group overflow-auto">
              <Button
                onClick={() =>
                  this.setState({ searchOpen: !this.state.searchOpen })
                }
              >
                Search / Filter
              </Button>
              {this.state.searchOpen && (
                <SearchFilter searchAndFilter={this.handleSearchFilter} />
              )}
              <CourseTree
                weeks={this.state.weeks}
                toggleSearch={this.toggleSearch}
              />
            </div>
            <div className="col-sm-7 col-md-8 col-lg-9">
              <Switch>
                <Route
                  exact
                  path="/results"
                  render={props => (
                    <SearchResults
                      {...props}
                      results={this.state.filteredResults}
                    />
                  )}
                  user={this.state.user}
                />
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
                <Route
                  exact
                  path="/"
                  component={About}
                  user={this.state.user}
                />
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
        </div>
      </div>
    );
  }
}

export default App;
