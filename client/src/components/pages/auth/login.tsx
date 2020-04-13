import React, { Component, ChangeEvent } from "react";
import axios from "axios";
import { CredentialsModel } from "../../models/credentials-model";
import { UserModel } from "../../models/user-model";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/actionType";
//MUI//
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import { NavLink } from "react-router-dom";
//MUI//

const port = 3009;

interface LoginState {
  credentials: CredentialsModel;
}
export class Login extends Component<any, LoginState> {
  public constructor(props: any) {
    super(props);
    this.state = { credentials: new CredentialsModel() };
  }

  public render() {
    return (
      <Container className="login" maxWidth="sm">

        <h2>You are disconnected... please login</h2>
        <form autoComplete="off">
          <TextField
            required
            fullWidth
            id="outlined-name"
            label="User Name"
            variant="outlined"
            onChange={this.setUsername}
            value={this.state.credentials.userName || ""}
          />
          <br /><br />
          <TextField
            required
            fullWidth
            type="password"
            id="outlined-password"
            label="Password"
            variant="outlined"
            onChange={this.setPassword}
            value={this.state.credentials.password || ""}
          />
          <br /><br />
          <Button
            onClick={this.login}
            variant="outlined"
            size="large"
            color="primary"
          >
            Login
          </Button>
        </form>

        <h3>You can also register here: </h3>
        <NavLink to="/signup" exact>
          Register
        </NavLink>
      </Container>
    );
  }

  private setUsername = (args: ChangeEvent<HTMLInputElement>) => {
    const username = args.target.value;
    const credentials = { ...this.state.credentials };
    credentials.userName = username;
    this.setState({ credentials });
  };

  private setPassword = (args: ChangeEvent<HTMLInputElement>) => {
    const password = args.target.value;
    const credentials = { ...this.state.credentials };
    credentials.password = password;
    this.setState({ credentials });
  };

  private login = async () => {
    try {
      const response = await axios.post<UserModel>(
        `http://localhost:${port}/api/auth/login`,
        this.state.credentials,
        { withCredentials: true }
      ); // { withCredentials: true } causes the cookie to be sent to server.
      const user = response.data;
      // alert(JSON.stringify(user));
      store.dispatch({ type: ActionType.Login, payload: user });
      // if (store.getState().user.role === "") {
      //   this.props.history.push("/login");
      // }
      if (store.getState().user.role === "user") {
        this.props.history.push("/vacations");
      }
      this.props.history.push("/admin");
    } catch (err) {
      alert(err.response ? err.response.data : err.message);
    }
  };
}
