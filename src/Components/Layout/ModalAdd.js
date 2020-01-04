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
import axios from "axios";
import Swal from "sweetalert2";

import { withStyles } from "@material-ui/core/styles";

class ModalAdd extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.postProduct = this.postProduct.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);

    this.state = {
      name: "",
      description: "",
      quantity: "",
      image: "",
      price: "",
      category: ""

      // token: localStorage.getItem("jwt")
    };
  }

  postProduct() {
    const data = {
      name: this.state.name,
      description: this.state.description,
      quantity: this.state.quantity,
      price: this.state.price,
      image: this.state.image,
      category: this.state.category
    };
    axios
      .post("http://localhost:4000/product", data)
      .then(() => {
        Swal.fire(
          "Congratulations!",
          "Data has been entered successfully!",
          "success"
        );
        document.location.href = "/";
        // this.history.push("/dashboard/product");
        console.log("ini data ADA", data);
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

  handleChangeCategory(value) {
    this.setState({
      category: value
    });
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

  handleChange = e => {
    let category_idNew = { ...this.state.dataPostProduct };

    category_idNew["category_id"] = e.target.value;

    this.setState(
      {
        dataPostProduct: category_idNew
      },
      () => console.log(this.state.dataPostProduct)
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ListItem button onClick={this.handleClickOpen}>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Add Data Product" />
        </ListItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
          <Divider />
          <DialogContent>
            <table>
              <tr>
                <td>
                  <Typography variant="h6">Name</Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                  <TextField
                    id="outlined-dense"
                    placeholder="Name"
                    margin="dense"
                    variant="outlined"
                    className={classes.textField}
                    inputProps={{ maxLength: 13 }}
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChangeInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6">Description</Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                  <TextField
                    id="outlined-dense"
                    placeholder="Description"
                    margin="dense"
                    variant="outlined"
                    multiline
                    rowsMax="4"
                    className={classes.textField}
                    name="description"
                    type="text"
                    value={this.state.description}
                    onChange={this.handleChangeInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6">Image</Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                  <TextField
                    id="outlined-dense"
                    placeholder="image"
                    margin="dense"
                    variant="outlined"
                    className={classes.textField}
                    name="image"
                    type="text"
                    value={this.state.image}
                    onChange={this.handleChangeInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6">Price</Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                  <TextField
                    id="outlined-number"
                    placeholder="price"
                    margin="dense"
                    className={classes.textField}
                    name="price"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={this.state.price}
                    onChange={this.handleChangeInput}
                    InputLabelProps={{
                      shrink: true
                    }}
                    variant="outlined"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6">Quantity</Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                  <TextField
                    id="outlined-number"
                    placeholder="Quantity"
                    className={classes.textField}
                    name="quantity"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={this.state.quantity}
                    onChange={this.handleChangeInput}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="dense"
                    variant="outlined"
                  />
                </td>
              </tr>
              {/* <tr>
                <td>
                  <Typography variant="h6">Category</Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      margin="dense"
                      name="category"
                      type="text"
                      onChange={this.handleChangeCategory}
                      value={this.state.category}
                    >
                      <MenuItem>Food</MenuItem>;<MenuItem>Beverage</MenuItem>;
                    </Select>
                  </FormControl>
                </td>
              </tr> */}
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
              onClick={this.postProduct}
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
export default withStyles(styles)(ModalAdd);
