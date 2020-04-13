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

import { UserModel } from "../models/user-model";

const PORT = process.env.PORT || 3009;

interface VacationsState {
  //   followed: Boolean;
  user: UserModel;
  vacation: VacsModel[];
  vacsFollowed: VacsModel[];
}
export class VacCard extends Component<any, VacationsState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      user: store.getState().user,
      vacation: store.getState().vacations,
      vacsFollowed: store.getState().vacsFollowed
    };
    this.unsubscribeStore = store.subscribe(() => {
      this.setState({ user: store.getState().user });
      this.setState({ vacation: store.getState().vacation });
      this.setState({ vacsFollowed: store.getState().vacsFollowed });
    });
  }
  private getUserFollowedVacs = () => {
    if (store.getState().userLogged === false) {
      alert("Only logged in users can follow vacations");
      return;
    }
    const vacationID = +this.props.id;
    const userID = +this.state.user.userID;
    alert(vacationID);
  };
  private removeUserFollowedVacs = () => {
    const vacationID = +this.props.id;
    alert(vacationID);
  };
  // store.getState({ arrangedVacs: store.getState().arrangedVacs });
  // store.getState().arrangedVacs.arrangedVacs === true;
  // this.setState({ arrangedVacs: true });

  public render(): JSX.Element {
    return (
      <div className="" key={this.props.vacationID}>
        <CardHeader
          title={this.props.destination}
          subheader={this.props.startDate}
          avatar={
            <Avatar aria-label="vacation" className="">
              {!this.props.follow ? (
                <Switch onChange={this.getUserFollowedVacs}></Switch>
              ) : (
                  <Switch checked onChange={this.removeUserFollowedVacs}></Switch>
                )}
            </Avatar>
          }
        />

        <CardMedia
          image={`/assets/images/${this.props.picFileName}`}
          title={this.props.description}
        />

        <img
          src={`/assets/images/${this.props.picFileName}`}
          className="card-img-top MuiCardMedia-root"
          alt={this.props.description}
        />

        <div className="card-body">
          <ul>
            <li>{this.props.follow}</li>
            <li>{this.props.description}</li>
            <li>startDate : {this.props.startDate}</li>
            <li> endDate : {this.props.endDate}</li>

            <li> price :{this.props.price} $</li>
          </ul>
        </div>
      </div>
    );
  }
}
