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
import { Route, Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import { Row, Col, Badge, Pagination, InputNumber } from "antd";
import jsPDF from "jspdf";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  textField: {
    width: 300
  }
});

class ModalCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataApiModalAdd: [],
      dataPostProduct: {
        name: "",
        description: "",
        quantity: "",
        image: "",
        price: "",
        category_id: ""
      },
      cartModal: []
    };
    // this.inputChange = this.inputChange.bind(this);
    // this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  // inputChange(e) {
  //   let newDataPost = { ...this.state.dataPostProduct };
  //   newDataPost[e.currentTarget.name] = e.currentTarget.value;

  //   this.setState(
  //     {
  //       dataPostProduct: newDataPost
  //     },
  //     () => console.log(this.state.dataPostProduct)
  //   );
  // }

  // onSubmitForm() {
  //   axios
  //     .post(`http://localhost:3030/product`, this.state.dataPostProduct, {
  //       headers: { "x-access-token": this.state.token }
  //     })
  //     .then(res => {
  //       if (res.data.status === 200) {
  //         this.setState({
  //           open: false
  //         });
  //       }
  //     });
  // }

  // formatNumber(num) {
  //   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  // }
  handleCheckout() {
    let Mydata = [];
    let checkout = this.props.cartModal;
    let total = this.props.total;
    let quantity = this.props.quantity;
    console.log("object", quantity);
    checkout.map((item, index) => {
      Mydata.push(item.name);

      return (
        console.log(item.name), console.log(item.Price), console.log(item.count)
      );
    });
    const Data1 = Mydata.toString();
    console.log("ini data1", Data1);
    const checkoutNew = {
      total: total,
      name: Data1,
      count: quantity
    };
    // console.log(total, "ini total");
    console.log("okeeeeeeeeeeeeee", checkoutNew, "ini checknew");
    // console.log("ini checkout", checkout);
    // console.log(checkout, "ini chekout");
    axios
      .post("http://localhost:4000/product/transaction", checkoutNew)
      .then(() => {
        // Swal.fire(
        //   "Congratulations!",
        //   "Data has been entered successfully!",
        //   "success"
        // );
        document.location.href = "/";
        var doc = new jsPDF();
        let space = 10;
        // doc.text(`Receipt Code ${codeReceipt}`, 10, (space += 10));
        // doc.text(`Cashier ${cashier}`, 10, (space += 10));
        // doc.text(`Cashier ${cashier}`, 10, 30);
        // if (checkout.length > 0) {
        checkout.map(items => {
          // doc.text(`${items.name} ${items.count}x Rp. ${this.formatNumber(items)}`, 10, 10);
          doc.text(
            `${items.name} ${items.count}x Rp. ${items.Price}`,
            10,
            (space += 10)
          );
          console.log("object", items.name);
          console.log("object", items.Price);
          console.log("object", items.count);
        });
        doc.text(`Total Rp. ${total}`, 10, (space += 10));
        // doc.text(`Payment Cash`, 10, (space += 10));
        doc.save("admin.pdf");
      })
      .catch(error => {
        console.log(error);
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ListItem button onClick={this.handleClickOpen}>
          <ListItemIcon>{/* <AddBoxIcon /> */}</ListItemIcon>

          <Link to="/" style={{ textDecoration: "none" }}>
            <Fab
              style={{
                background: "#00edf5",
                color: "white",
                width: "300%",
                textAlign: "center",
                // marginTop: "-200%",
                marginLeft: "-44%",
                alignContent: "center"
              }}
              variant="medium"
              color="black"
              aria-label="add"
            >
              &nbsp; Checkout
            </Fab>
          </Link>
        </ListItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Checkout</DialogTitle>
          <Divider />
          <DialogContent>
            {this.props.cartModal.map((data, idx) => {
              return (
                <Row key={idx} style={{ width: 450 }}>
                  <Col>
                    <Typography variant="h6">
                      {data.name} {data.count}
                    </Typography>
                  </Col>
                  <Col>
                    <Typography
                      variant="h6"
                      style={{
                        float: "right",
                        // textAlign: "right",
                        textAlignLast: "right",
                        textAlign: "end",
                        marginTop: "-5%"
                      }}
                    >
                      Rp. {data.Price * data.count}
                    </Typography>
                  </Col>
                </Row>
              );
            })}
            {/* {this.props.cartModal.map((data, idx) => {
              return (
                <table>
                  <tr key={idx}>
                    <td>
                      <Typography variant="h6">{data.name}</Typography>
                    </td>
                    <br></br>
                    <td>
                      <Typography
                        variant="h6"
                        style={{
                          float: "right",
                          textAlignLast: "right",
                          textAlign: "end"
                        }}
                      >
                        Rp. {data.Price}
                      </Typography>
                    </td>
                    <Divider />

                   
                  </tr>
                </table>
              )
            })} */}
          </DialogContent>
          <Typography variant="h6" style={{ marginLeft: "5%" }}>
            Total : {this.props.total}
          </Typography>

          <DialogActions>
            <Button
              style={{
                background: "#fa02c0",
                color: "white",
                width: "90%",
                textAlign: "center",
                // marginLeft: "-25%",
                marginRight: "5%",
                alignContent: "center"
              }}
              variant="outlined"
              onClick={this.handleCheckout}
              color="primary"
            >
              Print
            </Button>
          </DialogActions>
          <Typography style={{ marginLeft: "47%" }}>Or</Typography>
          <DialogActions>
            <Button
              style={{
                background: "#00edf5",
                color: "white",
                width: "90%",
                textAlign: "center",
                marginRight: "5%",
                // marginTop: "-200%",
                marginLeft: "5%",
                alignContent: "center"
              }}
              variant="contained"
              onClick={this.onSubmitForm}
              color="primary"
            >
              Send Email
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ModalCheckout);
