import React, { Component } from "react";

import axios from "axios";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/actionType";

export class Logout extends Component<any> {
  public constructor(props: any) {
    super(props);
  }

  public async componentDidMount() {
    try {
      await axios.post("http://localhost:3009/api/auth/logout", null, {
        withCredentials: true
      }); // { withCredentials: true } causes the cookie to be sent to server.
      store.dispatch({ type: ActionType.Logout });
      this.props.history.push("/home");
    } catch (err) {
      alert(err.response ? err.response.data : err.message);
    }
  }

  public render() {
    return <div className="logout"></div>;
  }
}
