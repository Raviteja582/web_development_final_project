import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import expenseTracker from "./../assets/images/budget.png";
import expenseCharts from "./../assets/images/expenseCharts.jpg";
import expensesImage from "./../assets/images/expenses.jpg";
import financialGoals from "./../assets/images/financialgoals.jpg";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";
import ExpenseOverview from "./../expense/ExpenseOverview";

const useStyles = makeStyles((theme) => ({
  flexRow: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    flexWrap: "wrap",
  },
  card: {
    flex: "50%",
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 250,
  },
  credit: {
    padding: 10,
    textAlign: "center",
    backgroundColor: "#ededed",
    borderBottom: "1px solid #d0d0d0",
    "& a": {
      color: "#4f83cc",
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <>
      {auth.isAuthenticated() && <ExpenseOverview />}
      {!auth.isAuthenticated() && typeof window !== "undefined" && (
        <div className={classes.flexRow}>
          <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
              Home Page
            </Typography>
            <CardMedia
              className={classes.media}
              image={expenseTracker}
              title="Unicorn Bicycle"
            />
            <CardContent>
              <Typography
                variant="body1"
                component="p"
                className={classes.credit}
              >
                Welcome to Expense Tracker.
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
              Expenses
            </Typography>
            <CardMedia
              className={classes.media}
              image={expensesImage}
              title="Unicorn Bicycle"
            />
            <CardContent>
              <Typography
                variant="body1"
                component="p"
                className={classes.credit}
              >
                Add/Update/Delete daily expenses with notes and categories
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
              Expense Charts
            </Typography>
            <CardMedia
              className={classes.media}
              image={expenseCharts}
              title="Unicorn Bicycle"
            />
            <CardContent>
              <Typography
                variant="body1"
                component="p"
                className={classes.credit}
              >
                Use Visual Charts to track the expenditure per category, over a
                month in a year
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
              Financial Goals
            </Typography>
            <CardMedia
              className={classes.media}
              image={financialGoals}
              title="Unicorn Bicycle"
            />
            <CardContent>
              <Typography
                variant="body1"
                component="p"
                className={classes.credit}
              >
                Add/Update your financial goals for the future.
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
