import React from "react";
import { Route } from "react-router-dom";
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Link
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import clsx from "clsx";
import { mainListItems } from "./ListItems";
import { withStyles } from "@material-ui/core/styles";

import Order from "../Layout/Order";
import Report from "../Layout/Report";
import Login from "../Layout/Login";
// import Message from "../Layout/Message";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Point of Sale Afs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

class Dashboard extends React.Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({
      open: true
    });
  };

  handleDrawerClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          style={{
            background: "linear-gradient( 45deg, white 30%,  white 90%)"
          }}
          position="absolute"
          className={clsx(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              // color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              style={{ color: "black" }}
              noWrap
              className={classes.title}
            >
              POINT OF SALE
            </Typography>
            <IconButton></IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.props.setOpen}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
        </Drawer>
        {/* Content */}
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div className="dashboard-panel-container">
            {/* <Route exact path="/" component={Message} /> */}
            <Route exact path="/" component={Order} />
            <Route exact path="/report" component={Report} />
            <Route path="/login" component={Login} />
          </div>
          <Copyright />
        </main>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24,
    color: "dark"
    // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1,
    color: "dark"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    color: "dark"
  },
  fixedHeight: {
    height: 500
  }
});
export default withStyles(styles)(Dashboard);
