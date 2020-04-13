import * as React from "react";
import { Component, ChangeEvent } from "react";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import { AddVacAdmin } from "./add-vacation";
import { VacsModel } from "../../models/vacs-model";
import "./admin.css";
//MUI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

//MUI
const PORT = process.env.PORT || 3009;

interface AdminState {
  vacs: VacsModel[];
}

export class Admin extends Component<any, AdminState> {
  private unsubscribe: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      vacs: store.getState().vacations
    };

    this.unsubscribe = store.subscribe(() => {
      this.setState({ vacs: store.getState().vacations });
    });
  }

  public async componentDidMount() {
    try {
      if (
        !store.getState().userLogged ||
        store.getState().user.role !== "Admin"
      ) {
        this.props.history.push("/login");
        return;
      }
      fetch(`http://localhost:${PORT}/api/vacations`)
        .then(res => res.json())
        .then(vacs => this.setState({ vacs }))
        .catch(err => alert(err.message));
    } catch (err) {
      alert(err.message);
    }
  }
  private deleteVac = () => {
    const vacationID = +this.props.id;
    console.log(vacationID);
    // const newVacation = { ...this.state.newVacation };
    // newVacation.destination = destination;
    // this.setState({ newVacation });
  };

  public render() {
    return (
      <div className="admin">
        <h2>Admin</h2>
        <AddVacAdmin />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className="dark">
                <TableCell>Destination</TableCell>
                <TableCell>description</TableCell>
                <TableCell>price</TableCell>
                <TableCell>startDate</TableCell>
                <TableCell>endDate</TableCell>
                <TableCell>picFileName</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.vacs.map(v => (
                <TableRow key={v.vacationID}>
                  <TableCell>{v.destination}</TableCell>
                  <TableCell component="th" scope="row">
                    {v.description}
                  </TableCell>
                  <TableCell>{v.price}</TableCell>
                  <TableCell>{v.startDate}</TableCell>
                  <TableCell>{v.endDate}</TableCell>
                  <TableCell>{v.picFileName}</TableCell>
                  <TableCell align="right">
                    <EditTwoToneIcon />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      value={v.vacationID}
                      onClick={this.deleteVac}
                      startIcon={<DeleteIcon />}
                    ></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
