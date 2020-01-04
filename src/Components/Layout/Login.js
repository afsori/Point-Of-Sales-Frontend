import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
// import ThreeSixtyIcon from "@material-ui/icons/ThreeSixty";
import ThreeSixtyIcon from "@material-ui/icons/ThreeSixty";

import axios from "axios";
import Swal from "sweetalert2";

import { withStyles } from "@material-ui/core/styles";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.postLogin = this.postLogin.bind(this);

    this.state = {
      username: "",
      password: ""

      // token: localStorage.getItem("jwt")
    };
  }

  postLogin() {
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("http://api-pos-1997.herokuapp.com/auth/signin", data)
      .then(res => {
        Swal.fire(
          "Congratulations!",
          "Data has been entered successfully!",
          "success"
        );
        // document.location.href = "/dashboard/product";
        // this.history.push("/dashboard/product");
        // if (res.data.status !== 400) {
        // this.setState({
        //   loginKey: true
        // });
        // }
        if (res) {
          localStorage.setItem("Token", res.data.Token);
          Swal.fire(
            "Welcome Admin!",
            "You are logged in as an admin!",
            "success"
          );
          document.location.href = "/";
        }
        console.log(res.data.Token, "idapat token");
        // console.log(res.data, "token");
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChangeInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    // console.log(this.handleChangeInput, "handle change");
  }

  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {localStorage.Token ? (
          ""
        ) : (
          <ListItem button onClick={this.handleClickOpen}>
            <ListItemIcon>
              <ThreeSixtyIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <Divider />
          <DialogContent>
            <table>
              <tr>
                <td>
                  <Typography variant="h6">Username</Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                  <TextField
                    id="outlined-dense"
                    placeholder="Username"
                    margin="dense"
                    variant="outlined"
                    className={classes.textField}
                    inputProps={{ maxLength: 13 }}
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChangeInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6">Password</Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                  {/* <TextField
                    id="outlined-dense"
                    placeholder="password"
                    margin="dense"
                    variant="outlined"
                    multiline
                    rowsMax="4"
                    className={classes.textField}
                    inputProps={{ maxLength: 44 }}
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChangeInput}
                  /> */}
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    autoComplete="current-password"
                    variant="outlined"
                    placeholder="password"
                    margin="dense"
                    variant="outlined"
                    className={classes.textField}
                    inputProps={{ maxLength: 44 }}
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChangeInput}
                  />
                </td>
              </tr>
            </table>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={this.handleClose}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              style={{
                background: "linear-gradient(120deg, #fe924e 30%, #f96504 90%)"
              }}
              variant="contained"
              onClick={this.postLogin}
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const styles = theme => ({
  textField: {
    width: 300
  }
});
export default withStyles(styles)(Login);
