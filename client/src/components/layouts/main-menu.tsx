import * as React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
export class Menu extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <NavLink className="nav-link" to="/" exact>
          Home
        </NavLink>
        <span> | </span>
        <NavLink className="nav-link" to="/vacations" exact>
          Vacations
        </NavLink>
        <span> | </span>
        <NavLink className="nav-link" to="/contact" exact>
          Contact
        </NavLink>
        <span> | </span>
        <NavLink className="nav-link isAdmin" to="/admin" exact>
          Admin
        </NavLink>
      </nav>
    );
  }
}
