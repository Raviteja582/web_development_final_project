import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  LinearProgress,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  createGoal,
  updateGoal,
  removeGoal,
  getAllGoals,
} from "./api-goals.js";
import auth from "../auth/auth-helper";
import { isEmpty } from "lodash";

const useStyles = makeStyles((theme) => ({
  flexRow: {
    display: "flex",
    gap: 5,
    alignItems: "stretch",
    justifyItems: "center",
  },
}));

export default function FinancialGoals() {
  const classes = useStyles();
  const jwt = auth.isAuthenticated();

  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    amountRequired: "",
    savedAmount: "",
    timeline: "",
  });
  const [editGoal, setEditGoal] = useState(null);

  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const goal = {
      ...formValues,
      savedAmount: parseFloat(formValues.savedAmount),
      amountRequired: parseFloat(formValues.amountRequired),
      timeline: new Date(formValues.timeline),
    };
    console.log("[frontend] created goal: ", goal);
    if (goal.amountRequired <= goal.savedAmount) {
      alert("Amount Required should be greater than Saved Amount");
      return;
    }
    createGoal(
      {
        t: jwt.token,
      },
      goal
    ).then((res) => {
      goal.id = res.id;
      setGoals([...goals, goal]);
    });
    setFormValues({
      title: "",
      amountRequired: "",
      savedAmount: "",
      timeline: "",
    });
    setShowForm(false);
  };

  const calculateProgress = (goal) =>
    Math.min((goal.savedAmount / goal.amountRequired) * 100, 100);

  const handleEditClick = (goal) => {
    setEditGoal(goal);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditGoal({ ...editGoal, [name]: value });
  };

  const saveEdit = () => {
    const updatedGoal = {
      ...editGoal,
      savedAmount: parseFloat(editGoal.savedAmount),
      amountRequired: parseFloat(editGoal.amountRequired),
      timeline: new Date(editGoal.timeline),
    };
    console.log("[frontend] updated goal: ", updatedGoal);
    updateGoal(
      {
        goalId: updatedGoal.id,
      },
      {
        t: jwt.token,
      },
      updatedGoal
    ).then((res) => {
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === updatedGoal.id
            ? {
                ...goal,
                amountRequired: updatedGoal.amountRequired,
                timeline: updatedGoal.timeline,
                savedAmount: updatedGoal.savedAmount,
              }
            : goal
        )
      );
    });
    setEditGoal(null);
  };

  const handleDeleteClick = (goal) => {
    removeGoal(
      { goalId: goal.id },
      {
        t: jwt.token,
      }
    ).then(() => {
      setGoals((prevGoals) => prevGoals.filter((preg) => preg.id !== goal.id));
    });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate() + 1).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    getAllGoals({
      t: jwt.token,
    }).then((goals) => {
      console.log("[frontend]", goals);
      setGoals(() =>
        goals.map((goal) => ({
          id: goal._id,
          title: goal.title,
          amountRequired: goal.amountRequired,
          timeline: goal.timeline,
          savedAmount: goal.savedAmount,
        }))
      );
    });
  }, []);

  const cancelEdit = () => setEditGoal(null);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Financial Goals Tracker
      </Typography>

      <Box textAlign="center" my={2}>
        <Button variant="contained" color="primary" onClick={toggleForm}>
          {showForm ? "Close Form" : "Create New Goal"}
        </Button>
      </Box>

      {showForm && (
        <Paper style={{ padding: "20px", marginBottom: "20px" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title of the Goal"
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Money Required ($)"
                  name="amountRequired"
                  type="number"
                  value={formValues.amountRequired}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Initial Amount Present ($)"
                  name="savedAmount"
                  type="number"
                  value={formValues.savedAmount}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tentative Timeline"
                  name="timeline"
                  type="date"
                  value={formValues.timeline}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Box textAlign="center" my={2}>
              <Button type="submit" variant="contained" color="primary">
                Add Goal
              </Button>
            </Box>
          </form>
        </Paper>
      )}

      <Box>
        <Typography variant="h5" gutterBottom>
          Your Goals
        </Typography>
        {goals.length === 0 ? (
          <Typography>No goals added yet.</Typography>
        ) : (
          goals.map((goal) => (
            <Paper
              key={goal.id}
              style={{
                padding: "15px",
                marginBottom: "15px",
                background: "#f5f5f5",
              }}
            >
              <Typography variant="h6">{goal.title}</Typography>
              <Typography>
                Target: ${goal.amountRequired}, Saved: ${goal.savedAmount}
              </Typography>
              <Typography>
                Remaining: ${goal.amountRequired - goal.savedAmount}
              </Typography>
              <Typography>Timeline: {formatDate(goal.timeline)}</Typography>
              <Box my={1}>
                <LinearProgress
                  variant="determinate"
                  value={calculateProgress(goal)}
                />
              </Box>
              <div className={classes.flexRow}>
                <Box textAlign="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditClick(goal)}
                  >
                    Edit
                  </Button>
                </Box>
                <Box textAlign="left">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleDeleteClick(goal)}
                  >
                    Delete
                  </Button>
                </Box>
              </div>
            </Paper>
          ))
        )}
      </Box>

      {editGoal && (
        <Dialog open={!!editGoal} onClose={cancelEdit}>
          <DialogTitle>Edit Goal</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Money Required ($)"
              name="amountRequired"
              type="number"
              value={editGoal.amountRequired}
              onChange={handleEditChange}
              required
              style={{ marginBottom: "15px" }}
            />
            <TextField
              fullWidth
              label="Money Saved ($)"
              name="savedAmount"
              type="number"
              value={editGoal.savedAmount}
              onChange={handleEditChange}
              required
              style={{ marginBottom: "15px" }}
            />
            <TextField
              fullWidth
              label="Timeline"
              name="timeline"
              type="date"
              value={editGoal.timeline}
              onChange={handleEditChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelEdit} color="secondary">
              Cancel
            </Button>
            <Button onClick={saveEdit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
