import React from "react";
import clsx from "clsx";
// import Report from '../Page/Report';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Container, Grid, Paper } from "@material-ui/core";
import { Route, Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import axios from "axios";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

const styles = theme => ({
  root: {
    display: "flex"
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
    height: 500
  }
});

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Transaction: []
    };
  }

  getTransaction() {
    axios
      .get("http://localhost:4000/product/transaction")
      .then(res => {
        console.log(res);
        this.setState({
          Transaction: res.data.result
        });
      })
      .catch(err => {});
  }

  componentDidMount() {
    this.getTransaction();
  }

  render() {
    const { classes } = this.props;
    // const classes = useStyles();
    return (
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Fab
              style={{ background: "white" }}
              variant="medium"
              color="black"
              aria-label="add"
            >
              &nbsp; BACK
            </Fab>
          </Link>{" "}
          &emsp;&emsp;
          {/* Chart */}
          <Grid item xs={12} md={8} lg={12}>
            <Paper className={clsx(classes.paper, classes.fixedHeight)}>
              {/* <Report /> */}
              <h1>History Page</h1>
              {/* <TableContainer component={Paper}> */}
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Count</StyledTableCell>
                    <StyledTableCell align="right">Total</StyledTableCell>
                    {/* <StyledTableCell align="right">
                      Carbs&nbsp;(g)
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Protein&nbsp;(g)
                    </StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.Transaction.map((data, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {data.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {data.count}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {data.total}
                      </StyledTableCell>
                      {/* <StyledTableCell align="right">
                        {row.carbs}
                      </StyledTableCell> */}
                      {/* <StyledTableCell align="right">
                        {row.protein}
                      </StyledTableCell> */}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              {/* </TableContainer> */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default withStyles(styles)(Report);
