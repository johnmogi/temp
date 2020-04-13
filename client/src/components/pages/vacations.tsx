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
import { VacCard } from "./vac-card";

const PORT = process.env.PORT || 3009;

interface VacationsState {
  arrangedVacs: Boolean;
  // followed: Boolean;
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
      arrangedVacs: false,
      // followed: false,
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
  // since this runs quite a lot I'm limiting the contact points as much as i can...
  public componentDidUpdate = (prevProps: any, prevState: any) => {
    if (store.getState().userLogged && this.state.vacsFollowed.length > 0) {
    }
  };

  private async arrangeVacs() {
    const vacs = [...this.state.vacs];

    const newVacsFollowed = [...this.state.vacsFollowed];

    for (let i = 0; i < this.state.vacsFollowed.length; i++) {
      const index = newVacsFollowed.findIndex(
        v => v.vacationID === newVacsFollowed[i].vacationID
      );
      const vac = vacs[index];
      // vacation.follow = true;
      newVacsFollowed.splice(index, 1);
      newVacsFollowed.unshift(vac);
    }
    this.setState({ vacs: newVacsFollowed });
  }

  // take vacsfollowed and findindex on vacs then bring those values to front and finally

  public getUserFollowedVacs = (args: ChangeEvent<HTMLInputElement>) => {
    if (this.state.userLogged === false) {
      alert("Only logged in users can follow vacations");
      return;
    }
    // this.setState({ arrangedVacs: true });
    // this.checkVacs();
  };

  render() {
    return (
      <div className="card">
        <Grid className="vacations row" container spacing={3}   >
          {this.state.vacs.map(v => (
            <Grid item xs={12} sm={6} key={v.vacationID}>
              <Card>
                {/* <Switch onChange={this.checkVacs} value={v.vacationID}></Switch> */}
                <VacCard
                  value={v.vacationID}
                  className=""
                  vacationID={v.vacationID}
                  id={v.vacationID}
                  description={v.description}
                  destination={v.destination}
                  picFileName={v.picFileName}
                  startDate={v.startDate}
                  endDate={v.endDate}
                  price={v.price}
                  follow={v.follow}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
