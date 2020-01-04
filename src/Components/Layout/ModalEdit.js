import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import InsertChartIcon from "@material-ui/icons/InsertChart";

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
import CachedIcon from "@material-ui/icons/Cached";
import { withStyles } from "@material-ui/core/styles";

class ModalEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.handleDeleteMenu = this.handleDeleteMenu.bind(this);
    // this.postProduct = this.postProduct.bind(this);
    // this.handleChangeCategory = this.handleChangeCategory.bind(this);

    this.state = {
      // id_product: "",
      quantity: "",
      description: "",
      id_product: "",
      category: "",
      image: "",
      price: "",
      Tokens: localStorage.getItem("Token")

      // token: localStorage.getItem("jwt")
    };
  }

  handleDeleteMenu() {
    let id_product = this.state.id_product;
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
      .then(result => {
        if (result.value) {
          axios
            .delete(`http://api-pos-1997.herokuapp.com/product/${id_product}`)
            .then(() => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              document.location.href = "/";
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateProduct() {
    // alert(this.state.id_product);
    let id_product = this.state.id_product;
    const data = {
      id_product: this.state.id_product,
      name: this.state.name,
      description: this.state.description,
      quantity: this.state.quantity,
      price: this.state.price,
      image: this.state.image,
      category: this.state.category
    };
    axios
      .put(`http://api-pos-1997.herokuapp.com/product/${id_product}`, data)
      .then(() => {
        Swal.fire("Good job!", "Data successfully changed!", "success");

        document.location.href = "/";

        console.log(data, "update data");
      })
      .catch(error => {
        console.log(error);
      });
  }
  // updateProduct = (id_product, name, price, category) => {
  //   this.setState({
  //     visible: true,
  //     id_product: id_product,
  //     name: name,
  //     price: price,
  //     category: category
  //   });
  // };
  handleChangeInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    // console.log(this.handleChangeInput, "handle change");
  }

  state = {
    open: false
  };

  handleClickOpen = (id_product, name, price, category) => {
    this.setState({
      open: true,
      id_product: this.props.id_product,
      name: this.props.name,
      image: this.props.image,
      price: this.props.price,
      category: category
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    // console.log(this.handleClickOpen, "ini klik open modal");

    const { classes } = this.props;
    return (
      <div>
        {localStorage.Token ? (
          <ListItem button onClick={this.handleClickOpen}>
            <ListItemIcon>
              <InsertChartIcon />
            </ListItemIcon>
            <ListItemText primary="Action" />
          </ListItem>
        ) : (
          ""
        )}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
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
              {/* <tr>
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
                    inputProps={{ maxLength: 44 }}
                    name="description"
                    type="text"
                    value={this.props.description}
                    onChange={this.handleChangeInput}
                  />
                </td>
              </tr> */}
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
              {/* <tr>
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
                    value={this.props.quantity}
                    onChange={this.handleChangeInput}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="dense"
                    variant="outlined"
                  />
                </td>
              </tr> */}
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
              style={{
                background: "linear-gradient(120deg, red 30%, red 90%)",
                float: "left",
                textAlign: "start",
                textAlign: "left"
              }}
              variant="contained"
              onClick={this.handleDeleteMenu}
              color="primary"
            >
              Delete
            </Button>
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
              onClick={this.updateProduct}
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
export default withStyles(styles)(ModalEdit);
