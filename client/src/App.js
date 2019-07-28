import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import Navbar from "./components/Navbar";
import Protected from "./components/Protected";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import LessonsList from "./components/coursework/LessonsList";
import About from "./components/coursework/About";
import WeeksList from "./components/coursework/WeeksList";

class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar setUser={this.setUser} user={this.state.user} />
        <Switch>
          <Route path="/weeks/:id" component={LessonsList} />
          <Route exact path="/weeks" component={WeeksList} />
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
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
        <About />
        <WeeksList />
      </div>
    );
  }
}

export default App;
