import * as React from "react";
import { Component, ChangeEvent } from "react";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import { VacsModel } from "../../models/vacs-model";
//MUI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//MUI

export class AddVacAdmin extends Component {
  public render() {
    return (
      <div className="admin">
        <h2>Admin</h2>
        <AddVacAdmin />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Destination</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>destination</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
