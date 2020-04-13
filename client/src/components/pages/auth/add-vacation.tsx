import * as React from "react";
import { Component, ChangeEvent } from "react";

import { store } from "../../redux/store";
import { Action } from "../../redux/action";
import { ActionType } from "../../redux/actionType";
import { Unsubscribe } from "redux";

import { NewVacsModel } from "../../models/vacs-model";

//MUI
// import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
//MUI
const PORT = process.env.PORT || 3009;

interface VacationsState {
  //   newVacation: NewVacsModel[];
}

export class AddVacAdmin extends Component<any, VacationsState> {
  private unsubscribe: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      //   newVacation: new NewVacsModel()
    };

    this.unsubscribe = store.subscribe(() => {
      //   this.setState({ newVacation: store.getState().vacation });
    });
  }
  public componentWillUnmount = () => {
    this.unsubscribe();
  };

  public componentDidMount(): void {
    // const vacation = { ...this.state.newVacation };
    const date = new Date();
    // date.setHours(0, 0, 0);
    // newVacation.startDate = date;
    // newVacation.endDate = date;
    // this.setState({ newVacation });
  }
  private setDestination = (args: ChangeEvent<HTMLInputElement>) => {
    const destination = args.target.value;
    // const newVacation = { ...this.state.newVacation };
    // newVacation.destination = destination;
    // this.setState({ newVacation });
  };
  private setDescription = (args: ChangeEvent<HTMLInputElement>) => {
    const description = args.target.value;
    // const newVacation = { ...this.state.newVacation };
    // newVacation.description = description;
    // this.setState({ newVacation });
  };
  private setPicture = async () => {
    // const vacation = { ...this.state.newVacation };
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      //   formData.append("image", newVacation.picFileName);

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: formData
      };
      alert(options);
      //   fetch(`http://localhost:${PORT}/api/auth/file`, options)
      //     .then(res => res.json())
      //     .then(image => resolve(image))
      //     .catch(err => reject(err));
    });
  };

  private setStartDate = (args: ChangeEvent<HTMLInputElement>) => {
    const startDate = args.target.value;
    // const newVacation = { ...this.state.newVacation };
    // newVacation.startDate = startDate;
    // this.setState({ newVacation });
  };
  private setEndDate = (args: ChangeEvent<HTMLInputElement>) => {
    const endDate = args.target.value;
    // const newVacation = { ...this.state.newVacation };
    // newVacation.endDate = endDate;
    // this.setState({ newVacation });
  };
  private setPrice = (args: ChangeEvent<HTMLInputElement>) => {
    const price = args.target.value;
    // const newVacation = { ...this.state.newVacation };
    // newVacation.price = price;
    // this.setState({ newVacation });
  };

  private addVacForm = () => {
    // const user = { ...this.state.newUser };
    // user.userId = this.state.selectedID;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
      //   body: JSON.stringify(this.state.newVacation)
    };
    console.log(options);
    // fetch(`http://localhost:${PORT}/api/vacations`, options)
    //   .then(response => response.json())
    //   .then(vacation =>
    //     alert("vacation has been added." + JSON.stringify(vacation))
    //   )
    //   .catch(err => alert(err.message));
  };

  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead></TableHead>

          <TableBody>
            <TableRow key="demo">
              <TableCell>
                <TableCell>Add A Vacation:</TableCell>
                <TableCell align="right">
                  <TextField
                    label="destination"
                    id="destinationAdd"
                    onChange={this.setDestination}
                    // value={this.state.newVacation.destination}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    label="description"
                    id="descriptionAdd"
                    onChange={this.setDescription}
                    // value={this.state.newVacation.description}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="startDateAdd"
                    label="Start date"
                    type="date"
                    defaultValue="2017-05-24"
                    onChange={this.setStartDate}
                    // value={this.state.newVacation.startDate}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="startDateAdd"
                    label="End date"
                    type="date"
                    data-date-format="YYYY MMMM DD"
                    defaultValue="yyyy-mm-dd"
                    onChange={this.setEndDate}
                    // value={this.state.newVacation.endDate}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </TableCell>

                <TableCell align="right">
                  <TextField
                    label="Price"
                    placeholder=""
                    id="priceAdd"
                    onChange={this.setPrice}
                    // value={this.state.newVacation.price}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <input
                    accept="image/*"
                    className="picFileNameAdd"
                    id="picFileName"
                    multiple
                    type="text"
                    name="picFileName"
                    onChange={this.setPicture}
                    // value={this.state.newVacation.picFileName}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={this.addVacForm}
                    variant="outlined"
                    size="large"
                    color="primary"
                  >
                    Submit
                  </Button>
                </TableCell>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
