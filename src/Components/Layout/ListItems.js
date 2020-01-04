import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import SettingsIcon from "@material-ui/icons/Settings";
import ModalAdd from "./ModalAdd";
import Order from "./Order";
import Logout from "./Logout";
import Login from "./Login";
import Report from "./Report";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button component={Link} to="/report">
      <ListItemIcon>
        <InsertChartIcon />
      </ListItemIcon>
      <ListItemText primary="Report" />
    </ListItem>
   
    <ModalAdd />
    <Divider /> <br />
    <Login />
    <Logout />
  </div>
);
