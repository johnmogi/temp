import * as React from "react";
import { Component, ChangeEvent } from "react";
import { VacsModel } from "../models/vacs-model";
import { Unsubscribe } from "redux";
import { store } from "../redux/store";

import Switch from "@material-ui/core/Switch";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import "./vacations.css";

import { UserModel } from "../models/user-model";

const PORT = process.env.PORT || 3009;

interface VacationsState {
  followed: Boolean;
  user: UserModel;
  vacs: VacsModel[];
  userLogged: boolean;
  vacsFollowed: VacsModel[];
}

export class Vacations extends Component<any, VacationsState> {
  private unsubscribe: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      followed: false,
      user: store.getState().user,
      vacs: store.getState().vacations,
      userLogged: store.getState().userLogged,
      vacsFollowed: store.getState().vacsFollowed
    };

    this.unsubscribe = store.subscribe(() => {
      this.setState({ user: store.getState().user });
      this.setState({ vacs: store.getState().vacations });
      this.setState({ userLogged: store.getState().userLogged });
      this.setState({ vacsFollowed: store.getState().vacsFollowed });
    });
  }
  public componentWillUnmount = () => {
    this.unsubscribe();
  };
  public componentDidUpdate() {
    if (this.state.vacsFollowed.length > 1) {
      alert(this.state.vacsFollowed.length);
    }
  }
  public async componentDidMount() {
    try {
      fetch(`http://localhost:${PORT}/api/vacations`)
        .then(res => res.json())
        .then(vacs => this.setState({ vacs }))
        .catch(err => alert(err.message));
    } catch (err) {
      alert(err.message);
    }
    if (store.getState().userLogged) {
      try {
        const id = +this.state.user.userID;
        fetch(`http://localhost:${PORT}/api/auth/follow/${id}`)
          .then(response => response.json())
          .then(vacsFollowed => this.setState({ vacsFollowed }))
          .catch(err => alert(err.message));
      } catch (err) {
        alert(err.message);
      }
    }
  }

  private getUserFollowedVacs = (args: ChangeEvent<HTMLInputElement>) => {
    if (this.state.userLogged === false) {
      alert("Only logged in users can follow vacations");
      return;
    }

    const vacationID = +args.target.value;
    const userID = +this.state.user.userID;

    const sendInfo = `{ "userID": ${userID}, "vacationID": ${vacationID} }`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      // body: JSON.stringify(sendInfo)
      body: sendInfo
    };
    fetch(`http://localhost:${PORT}/api/auth/follow`, options)
      .then(response => response.json())
      .then(vacsFollowed => this.setState({ ...vacsFollowed }))
      .catch(err => alert(err));
  };

  render() {
    return (
      <Grid className="vacations row" container spacing={3}>
        {this.state.vacs.map(v => (
          <Grid item xs={4} key={v.vacationID}>
            <Card>
              <Grid className="card col-4">
                <CardHeader
                  avatar={
                    <Avatar aria-label="vacation" className="">
                      <FavoriteTwoToneIcon />
                    </Avatar>
                  }
                  title={v.destination}
                  subheader={v.startDate}
                />
                <Switch
                  onChange={this.getUserFollowedVacs}
                  value={v.vacationID}
                >
                  {this.state.followed ? "true" : "false"}
                </Switch>
                <CardMedia
                  image={`/assets/images/${v.picFileName}`}
                  title={v.description}
                />

                <img
                  src={`/assets/images/${v.picFileName}`}
                  className="card-img-top"
                  alt={v.description}
                />

                <div className="card-body"></div>
                <ul>
                  <li>{v.description}</li>
                  <li>startDate : {v.startDate}</li>
                  <li> endDate : {v.endDate}</li>

                  <li> price :{v.price} $</li>
                </ul>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}
