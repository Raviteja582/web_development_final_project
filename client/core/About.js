import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  info: {
    border: "1px solid",
    margin: 20,
    padding: 20,
  },
  heading: {
    marginLeft: '25%'
  },
}));

function About() {
  const classes = useStyles();
  return (
    <div className={classes.info}>
      <h1 className={classes.heading}>
        Expense Tracking App: Your Financial Assistant
      </h1>

      <h2>What is an Expense Tracking App?</h2>
      <p>
        An expense tracking app is a digital tool designed to help individuals
        and businesses monitor and manage their spending habits. By recording
        income, expenses, and financial goals, these apps provide valuable
        insights into financial behavior.
      </p>

      <h2>Why Use an Expense Tracking App?</h2>
      <ul>
        <li>Financial Awareness</li>
        <li>Budgeting</li>
        <li>Goal Setting</li>
        <li>Debt Management</li>
        <li>Tax Preparation</li>
      </ul>

      <h2>Key Features of Expense Tracking Apps</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Features</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><strong>Expense Entry</strong></TableCell>
              <TableCell>
                Allows users to input details about each expense, including
                date, category, amount, and description.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Category Tracking</strong></TableCell>
              <TableCell>
                Categorizes expenses into different groups (e.g., food,
                transportation, entertainment) for better analysis.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Visual Charts</strong></TableCell>
              <TableCell>
                Display Visual Charts of Expenses based on Pie Charts, Bar
                charts and Scatter Plot Chart
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Financial Goals</strong></TableCell>
              <TableCell>
                Provide interface to add the personal goals to achieve there
                Financial Necessities with proper tracking of investement and
                timeline.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h2>How to Choose the Right Expense Tracking App</h2>
      <p>
        When selecting an expense tracking app, consider the following factors:
      </p>
      <ul>
        <li>User Interface</li>
        <li>Features</li>
        <li>Platform Compatibility</li>
        <li>Security</li>
        <li>Cost</li>
      </ul>

      <p>
        By using an expense tracking app, you can take control of your finances,
        make informed decisions, and achieve your financial goals.
      </p>
    </div>
  );
}

export default About;
