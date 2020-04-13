import * as React from "react";
import { Link } from "react-router-dom";
import "./vacations.css";
import { store } from "../redux/store";
// MUI//
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Switch from "@material-ui/core/Switch";

// import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
// import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
// MUI//

export const VacCard = (props: any) => {
  return (
    <div className="" key={props.vacationID}>
      <CardHeader
        title={props.destination}
        subheader={props.startDate}
        avatar={
          <Avatar aria-label="vacation" className="">
            <Switch
              onChange={getUserFollowedVacs}
              value={props.vacationID}
            ></Switch>
          </Avatar>
        }
      />

      <CardMedia
        image={`/assets/images/${props.picFileName}`}
        title={props.description}
      />

      <img
        src={`/assets/images/${props.picFileName}`}
        className="card-img-top"
        alt={props.description}
      />

      <div className="card-body"></div>
      <ul>
        <li>{props.description}</li>
        <li>startDate : {props.startDate}</li>
        <li> endDate : {props.endDate}</li>

        <li> price :{props.price} $</li>
      </ul>
    </div>
  );

  function getUserFollowedVacs() {
    if (store.getState().userLogged === false) {
      alert("Only logged in users can follow vacations");
      return;
    }
    alert(props.vacationID);

    // store.getState({ arrangedVacs: store.getState().arrangedVacs });
    console.log(store.dispatch);
    // store.getState().arrangedVacs.arrangedVacs === true;
    // this.setState({ arrangedVacs: true });
  }
};
