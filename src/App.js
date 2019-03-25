import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./login/Login";
import UserRegistrationPage from "./login/UserRegistration";
import Dashboard from "./components/Dashboard";
import Explore from "./components/Explore";
import Details from "./components/Details";
import Review from "./components/Review";
import PageNotFound from "./components/PageNotFound";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route
            path="/Login"
            component={Login}
          />
          <Route
            path="/UserRegistrationPage"
            component={UserRegistrationPage}
          />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Explore" component={Explore} />
          <Route path="/Details/:id" component={Details} />
          <Route path="/Review/:id" component={Review} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
