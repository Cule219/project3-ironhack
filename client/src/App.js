import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import Navbar from "./components/Navbar";
import Protected from "./components/Protected";
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
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/AddUser";
import Users from "./components/users/AddUser";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      weeks: [],
      filteredResults: [],
      searchOpen: false,
      selectedWeek: null,
      selectedDay: null
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

  reloadCourseTree = idList => {
    getWeeks()
      .then(response => {
        response.forEach((week, i) => {
          let d = week.find(el => el.id === idList);
          if (d) this.setState({ selectedWeek: i, selectedDay: d.id });
        });

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
  };

  render() {
    return (
      <div className="App">
        <Navbar setUser={this.setUser} user={this.state.user} />
        <div className="container">
          <div className="row">
            <div className="col-xs-4 col-sm-5 col-md-4 col-lg-3 list-group fixed-height">
              <Button
                variant="outline-primary"
                size="sm"
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
                selectedWeek={this.state.selectedWeek}
                selectedDay={this.state.selectedDay}
              />
            </div>
            <div className="col-xs-7 col-sm-7 col-md-8 col-lg-9 fixed-height">
              <Switch>
                <Route
                  exact
                  path="/results"
                  render={props => (
                    <SearchResults
                      {...props}
                      results={this.state.filteredResults}
                      reloadCourseTree={this.reloadCourseTree}
                      user={this.state.user}
                    />
                  )}
                />
                <Route
                  exact
                  path="/days/:id"
                  render={props => (
                    <LessonsList
                      {...props}
                      user={this.state.user}
                      reloadCourseTree={this.reloadCourseTree}
                    />
                  )}
                />
                <Route
                  exact
                  path="/days"
                  render={props => (
                    <DaysList {...props} user={this.state.user} />
                  )}
                />
                <Route
                  exact
                  path="/weeks/:num"
                  render={props => (
                    <DaysList {...props} user={this.state.user} />
                  )}
                />
                <Route
                  exact
                  path="/weeks"
                  render={props => <WeeksList user={this.state.user} />}
                />
                <Route
                  exact
                  path="/"
                  render={props => <About user={this.state.user} />}
                />
                } />
                <Route
                  exact
                  path="/users"
                  render={props => <Users user={this.state.user} />}
                />
                <Route
                  exact
                  path="/users/:id"
                  render={props => <EditUser user={this.state.user} />}
                />
                <Route
                  exact
                  path="/users/add"
                  render={props => <AddUser user={this.state.user} />}
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
                {/* Testing */}
                <Route
                  exact
                  path="/dashboard"
                  render={props => (
                    <Dashboard {...props} user={this.state.user} />
                  )}
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
