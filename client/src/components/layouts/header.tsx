import * as React from "react";
import { Menu } from "./main-menu";
import { HeadLog } from "./head-log";
import { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./header.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

// export class Header extends Component {
export default function Header() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>

          <Typography variant="h5" className="space1" >
            Vacations
            </Typography>
          <Typography variant="h6" className={classes.title}>

            <Menu />
          </Typography>
          <HeadLog />
        </Toolbar>
      </AppBar>
    </div>
  );
}

{
  /* <Grid container spacing={0}>
          <Grid item xs={1}>
            VACATIONS
          </Grid>
          <Grid item xs={8}>
            <Menu />
          </Grid>
          <Grid item xs={3}>
            <HeadLog />
          </Grid>
        </Grid>*/
}
