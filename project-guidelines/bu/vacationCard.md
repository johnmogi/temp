import React, { Component } from "react"; // MUI// import CardMedia from "@material-ui/core/CardMedia"; import CardHeader from "@material-ui/core/CardHeader"; import Avatar from "@material-ui/core/Avatar"; import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone"; import { VacsModel } from "../models/vacs-model"; import { UserModel } from "../models/user-model";

import { store } from "../redux/store"; import { Unsubscribe } from "redux"; import { Action } from "../redux/action"; import { ActionType } from "../redux/actionType"; import { Switch } from "@material-ui/core";

const PORT = process.env.PORT || 3009;

interface VactionBoxState { vacations: VacsModel[]; user: UserModel; userLogged: boolean; vacsFollowed: VacsModel[]; } export class VacCard extends Component

<any, vactionboxstate=""> {
  private unsubscribeStore: Unsubscribe;</any,>

public constructor(props: any) { super(props); this.state = { vacations: store.getState().vacations, user: store.getState().user, userLogged: store.getState().userLogged, vacsFollowed: store.getState().vacsFollowed }; this.unsubscribeStore = store.subscribe(() => { this.setState({ user: store.getState().user }); this.setState({ vacations: store.getState().vacations }); this.setState({ userLogged: store.getState().userLogged }); this.setState({ vacsFollowed: store.getState().vacsFollowed }); }); }

public componentWillUnmount = () => { this.unsubscribeStore(); };

private getUserFollowedVacs = () => { if (this.state.userLogged === false) { alert("Only logged in users can follow vacations"); return; } const vacationID = {this.getState().} const userID = +this.state.user.userID; alert(vacationID); const sendInfo = { user: userID, vacation: vacationID }; alert(sendInfo); // const options = { // method: "POST", // headers: { // "Content-Type": "application/json", // Accept: "application/json" // }, // body: JSON.stringify(sendInfo) // }; // alert(options); // fetch(`http://localhost:${PORT}/api/auth/follow`, options) // .then(response => response.json()) // .then(res => { // alert(JSON.stringify(res)); // }) // .catch(err => alert(err)); };

public render(): JSX.Element { return (

<div classname="" key="{this.props.vacationID}">
  <cardheader avatar="{" <avatar="" aria-label="vacation" classname="">
  <favoritetwotoneicon>
            
          }
          title={this.props.destination}
          subheader={this.props.startDate}
        /&gt;
        <switch onchange="{this.getUserFollowedVacs}">
  <p></p>
  <pre><code>    &lt;CardMedia
      image={`/assets/images/${this.props.picFileName}`}
      title={this.props.description}
    /&gt;

    &lt;img
      src={`/assets/images/${this.props.picFileName}`}
      className="card-img-top"
      alt={this.props.description}
    /&gt;

    &lt;div className="card-body"&gt;&lt;/div&gt;
    &lt;ul&gt;
      &lt;li&gt;{this.props.description}&lt;/li&gt;
      &lt;li&gt;startDate : {this.props.startDate}&lt;/li&gt;
      &lt;li&gt; endDate : {this.props.endDate}&lt;/li&gt;

      &lt;li&gt; price :{this.props.price} $&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
);
</code></pre>
  <p>  }
}</p>
</switch></favoritetwotoneicon>
</cardheader>
</div>
