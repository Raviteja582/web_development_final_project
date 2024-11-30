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

function About() {
  return (
    <div>
      <h1>Expense Tracking App: Your Financial Assistant</h1>

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
              <TableCell>Feature</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Expense Entry</TableCell>
              <TableCell>
                Allows users to input details about each expense, including
                date, category, amount, and description.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Category Tracking</TableCell>
              <TableCell>
                Categorizes expenses into different groups (e.g., food,
                transportation, entertainment) for better analysis.
              </TableCell>
            </TableRow>
            {/* ... other rows for remaining features ... */}
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
