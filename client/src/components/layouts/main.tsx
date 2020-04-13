import * as React from "react";
import { Component } from "react";
import { Home } from "../pages/home";
import { Vacations } from "../pages/vacations";
import { Admin } from "../pages/auth/admin";
import { Switch, Route, Redirect } from "react-router-dom";
import { Contact } from "../pages/contact";
import { NotFound } from "../pages/not-found";
import { Login } from "../pages/auth/login";
import { Logout } from "../pages/auth/logout";
export class Main extends Component {
  render() {
    return (
      <div className="main">
        <Switch>
          <Redirect to="/home" path="/" exact />
          <Route path="/home" component={Home} exact />
          <Route path="/vacations/" component={Vacations} exact />
          <Route path="/admin/" component={Admin} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/logout" component={Logout} exact />
          <Route path="/contact" component={Contact} exact />
          <Route path="" component={NotFound} exact />
        </Switch>
      </div>
    );
  }
}
