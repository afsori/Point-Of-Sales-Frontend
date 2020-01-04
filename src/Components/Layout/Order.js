import React from "react";
import axios from "axios";
import clsx from "clsx";
// import NoActivity from "../Page/NoActivity";
// import Product from "../Page/Product";
import { Container, Grid, Paper } from "@material-ui/core";
// import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import Typography from "@material-ui/core/Typography";
import { Row, Col, Badge, Pagination, InputNumber } from "antd";

import ButtonGroup from "antd/lib/button/button-group";
import AppsRoundedIcon from "@material-ui/icons/AppsRounded";
import FiberNewRoundedIcon from "@material-ui/icons/FiberNewRounded";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import IconButton from "@material-ui/core/IconButton";

import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { Route, Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import { deepOrange, green } from "@material-ui/core/colors";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import { withStyles } from "@material-ui/core/styles";
import ModalCheckout from "./ModalCheckout";
import ModalEdit from "./ModalEdit";

class Order extends React.Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);

    // this.updateProduct = this.updateProduct.bind(this);
    this.state = {
      userData: [],
      cartItem: [],
      valueCountItem: 0,
      valueCountPrice: [],
      cartItemCount: []
      // Tokens: localStorage.getItem("Token")
    };
  }

  sortby(by) {
    // console.log(by)
    axios
      .get(`http://localhost:4000/product/sort?sortby=${by}`)
      .then(res => {
        console.log(res, "sorting");
        this.setState({
          userData: res.data.response
        });
      })
      .catch(err => {});
  }
  getProduct() {
    axios
      .get("http://localhost:4000/product")
      .then(res => {
        console.log(res);
        this.setState({
          userData: res.data.result
        });
      })
      .catch(err => {});
  }

  componentDidMount() {
    this.getProduct();
  }

  // This move to cart//
  removeCartItem(id_product) {
    this.setState({
      cartItem: this.state.cartItem.filter(
        data => data.id_product !== id_product
      )
    });
    // let cartCount = this.state.cartItem.length;
    // this.sendBackData(cartCount - 2);
    // this.props.parentCallback(count + 1)
  }
  cartReset() {
    this.setState({
      cartItem: []
      // disabledClick: []
    });
    this.props.parentCallback(0);
  }

  cartAdd(data) {
    const count = {
      id_product: data.id,
      name: data.name,
      Image: data.Image,
      Price: data.Price,
      count: 1
    };
    this.setState(prevState => {
      return {
        cartItem: [...prevState.cartItem, count]
      };
    });
    let cartCount = this.state.cartItem.length;
  }

  cartItemCount(idx, count) {
    let items = this.state.cartItem;
    items[idx].count = count;
    this.setState({ cartItem: items });
  }
  buttonCartItemCount(idx, method) {
    let items = this.state.cartItem;
    if (method === "+") items[idx].count += 1;
    else items[idx].count -= 1;
    this.setState({ cartItem: items });
  }
  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  //handle search

  handleSearch(e) {
    // event.preventDefault();
    // const data = event.target.value;
    axios
      .get(`http://localhost:4000/product/search?keyword=${e.target.value}`)
      .then(res => {
        console.log(res.data, "INI SEARCHING");
        this.setState({
          userData: res.data.result
        });
      })
      .catch(err => {});
  }

  handleClickOpen = data => {
    this.setState({
      edit_id: data.id_product,
      edit_name: data.name,
      edit_price: data.price,

      edit_category: data.category
    });
    this.refs.ModalEdit.handleClickOpen(
      data.id_product,
      data.name,
      data.price,
      data.category
    );
  };
  render() {
    // console.log(this.state.Tokens, "in token")
    let arr = this.state.cartItem;
    let total = arr.reduce((prev, next) => prev + next.count * next.Price, 0);
    let quantity = arr.reduce((prev, next) => prev + next.count, 0);
    console.log("object", quantity);
    const { classes } = this.props;
    console.log(this.state.userData);
    console.log(this.state.cartItem, "ini chat item");

    return (
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={8}>
            <Paper
              style={{ background: "#f5f5fb" }}
              className={clsx(classes.paper, classes.fixedHeight)}
            >
              {/* <Product /> */}
              <Typography
                variant="h5"
                style={{ color: "black", marginLeft: "40%" }}
                component="h3"
              >
                FOOD ITEMS
              </Typography>
              <Grid container justify="center" style={{ marginTop: "2%" }}>
                <br />
                <br />
                <br></br>
                <Grid container justify="center">
                  <IconButton
                    onClick={this.onSubmitSearchMain}
                    fontSize="large"
                  >
                    <SearchIcon />
                  </IconButton>{" "}
                  &nbsp;
                  <InputBase
                    placeholder=" Search Name..."
                    inputProps={{ "aria-label": "naked" }}
                    name="search"
                    onChange={this.handleSearch}
                  />{" "}
                  &emsp;
                  <IconButton onClick={() => this.sortby("ASC")} size="large">
                    <ArrowUpwardIcon />
                  </IconButton>
                  <IconButton onClick={() => this.sortby("DESC")} size="large">
                    <ArrowDownwardIcon />
                  </IconButton>
                </Grid>
              </Grid>
              {/* <-- Card Looping --> */}

              <Grid container className={classes.root} spacing={5}>
                <Grid item xs={12}>
                  <Grid
                    container
                    justify="center"
                    style={{
                      padding: 10,
                      spacing: 10,
                      paddingRight: 10,
                      paddingBottom: "10%"
                    }}
                  >
                    {this.state.userData.map((data, idx) => {
                      return (
                        <Grid key={idx} item>
                          <Card
                            style={{ padding: 5, paddingBottom: 5 }}
                            className={classes.card}
                            onClick={() =>
                              // this.state.cartItem.filter(
                              //   cart => data.id_product === cart.id_product
                              // ).length > 0
                              //   ? null
                              // :
                              this.cartAdd(data)
                            }
                          >
                            <CardActionArea>
                              <CardMedia
                                style={{
                                  width: 200,
                                  height: 150
                                }}
                                variant="square"
                                className={classes.square}
                                image={data.Image}
                              />
                              <CardContent>
                                <Typography variant="body2" component="p">
                                  {data.name}
                                </Typography>
                                <Typography variant="body2" component="p">
                                  Rp. {data.Price}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            {/* <Button
                                style={{ width: 20, height: 20 }}
                                variant="outlined"
                                // onClick={this.removeProduct}
                                color="primary"
                              > */}

                            {/* </Button> */}
                          </Card>
                          {/* {localStorage.Tokens ? ( */}
                          <Typography style={{ width: "5%" }}>
                            <ModalEdit
                              id_product={data.id}
                              name={data.name}
                              description={data.description}
                              price={data.Price}
                              image={data.Image}
                              quantity={data.quantity}
                              // ref="ModalEdit"
                              // onClick={() => this.handleClickOpen(data)}
                            />
                          </Typography>
                          {/* ) : (
                            ""
                          )} */}

                          <Paper className={classes.paper} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={clsx(classes.paper, classes.fixedHeight)}>
              {/* <NoActivity /> */}
              <Typography className={classes.cart}>Cart</Typography>

              <br />

              {this.state.cartItem.length > 0 ? (
                this.state.cartItem
                  .map((data, idx) => {
                    return (
                      // <Grid container spacing={3}>

                      <Card key={idx} title={data.name}>
                        <Row>
                          <Col span={8}>
                            <img
                              style={{ objectFit: "cover" }}
                              src={data.Image}
                              width="20%"
                            />
                          </Col>
                          <Col span={8}> {data.name}</Col>
                          <Col span={8}>Rp. {data.Price * data.count}</Col>
                          <Col span={8}>
                            <a
                              style={{ color: "red" }}
                              onClick={() =>
                                this.removeCartItem(data.id_product)
                              }
                            >
                              Remove
                            </a>
                          </Col>

                          <Col span={3} />
                          <Col span={12}>
                            <ButtonGroup>
                              <Button
                                onClick={() =>
                                  this.buttonCartItemCount(idx, "-")
                                }
                              >
                                -
                              </Button>
                              <input
                                onChange={event =>
                                  this.cartItemCount(idx, event.target.value)
                                }
                                value={data.count}
                                name="price"
                                min={0}
                                type="number"
                                style={{ width: 45, height: 30 }}
                              />
                              <Button
                                onClick={() =>
                                  this.buttonCartItemCount(idx, "+")
                                }
                              >
                                +
                              </Button>
                            </ButtonGroup>
                          </Col>
                        </Row>
                      </Card>
                    );
                  })
                  .reverse()
              ) : (
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  item
                  xs={12}
                  md={8}
                  lg={12}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="https://image.flaticon.com/icons/png/512/2067/2067278.png"
                    className={classes.bigAvatar}
                  />

                  {/* <Typography
                    // variant="h5"
                    style={{
                      color: "dark",
                      justifyContent: "center",
                      fontSize: "10",
                      alignContent: "center",
                      alignItems: "center",
                      marginTop: "-40%"
                    }}
                    // component="h3"
                  >
                    You cart is empty
                  </Typography> */}
                </Grid>
              )}
            </Paper>

            {/* Modal Chekout */}
            <Card
              style={{
                // marginTop: "-40%",
                background: "white",
                width: "100%",
                textAlign: "center",
                // marginLeft: "-10%",
                alignContent: "center"
              }}
            >
              <hr></hr>
              <Typography
                style={{ fontSize: 20 }}

                // className={classes.item}
                // component="h5"
              >
                TOTAL : {"Rp. " + this.formatNumber(total)}
              </Typography>
              <Typography
                style={{ fontSize: 15 }}

                // className={classes.item}
                // component="h5"
              >
                Belum termasuk PPN
              </Typography>
              <ModalCheckout
                cartModal={this.state.cartItem}
                quantity={quantity}
                total={total}
              />

              <Link to="/" style={{ textDecoration: "none" }}>
                <Fab
                  style={{
                    // marginTop: "-40%",
                    background: "#fa02c0",
                    color: "white",
                    width: "90%"
                    // textAlign: "center",
                    // marginLeft: "5%",
                    // alignContent: "center"
                  }}
                  variant="medium"
                  color="black"
                  aria-label="add"
                >
                  {/* <FiberNewRoundedIcon style={{ color: "white" }} /> */}
                  &nbsp; Cancel
                </Fab>
              </Link>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex"
  },
  card: {
    maxWidth: 210
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
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
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
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
    flexDirection: "column"
  },
  fixedHeight: {
    height: 1000
  },
  bigAvatar: {
    // margin: 10,
    width: 250,
    height: 250
  },
  item: {
    color: "#999fa3",
    // alignItems: "center",
    // alignContent: "center",
    fontSize: "2"
    // justifyContent: "center",
    // alignSelf: "center"
  },
  cart: {
    fontSize: "60",
    textAlign: "center",
    color: "black",
    fontWeight: "bold"
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing(2)
  },
  spacing: {
    padding: 10
  }
});
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  card: {
    // maxWidth: 300
  },
  media: {
    height: 140
  },
  control: {
    padding: theme.spacing(2)
  }
}));
export default withStyles(styles)(Order);
