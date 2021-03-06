import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import "./index.scss";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";

axios
  .get("/api/auth/loggedin")
  .then(response => {
    console.log('got here')
    ReactDOM.render(
      <BrowserRouter>
        <Route render={props => <App {...props} user={response.data} />} />
      </BrowserRouter>,
      document.getElementById("root")
    );
  })
  .catch(err => {
    console.log(err);
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
