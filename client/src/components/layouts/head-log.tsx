import * as React from "react";
import { Component } from "react";
import { PublicUserModel } from "../models/user-model";
import { store } from "../redux/store";
import { Unsubscribe } from "redux";
import { NavLink } from "react-router-dom";

import Button from "@material-ui/core/Button";

interface MenuState {
  userLogged: boolean;
  user: PublicUserModel;
}

export class HeadLog extends Component<any, MenuState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      userLogged: store.getState().userLogged,
      user: store.getState().user
    };
  }

  public componentDidMount(): void {
    this.unsubscribeStore = store.subscribe(() =>
      this.setState({
        userLogged: store.getState().userLogged,
        user: store.getState().user
      })
    );
  }

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }

  render() {
    return (
      <div className="head-log">
        <section>
          {!this.state.userLogged && (
            <NavLink to="/login" exact>
              <Button color="inherit">Login</Button>
            </NavLink>
          )}
          {this.state.userLogged && (
            <NavLink to="/logout" exact>
              Logout
            </NavLink>
          )}
          <span>|  </span>
          {this.state.user
            ? this.state.user.firstName + " " + this.state.user.lastName
            : " Guest"}
        </section>
      </div>
    );
  }
}
