import Goals from "../models/goals.model";
import extend from "lodash/extend";
import errorHandler from "../helpers/dbErrorHandler";
import mongoose from "mongoose";
import { isEmpty } from "lodash";
import { ObjectId } from "mongoose";

const createGoal = async (req, res) => {
  try {
    req.body.recorded_by = req.auth._id;
    const goal = new Goals(req.body);
    const dbRes = await goal.save();
    return res.status(200).json({
      id: dbRes._id,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const updateGoal = async (req, res) => {
  try {
    let goal = req.goal;
    goal.savedAmount = req.body.savedAmount;
    goal.amountRequired = req.body.amountRequired;
    goal.timeline = new Date(req.body.timeline);
    goal.updated = Date.now();
    await goal.save();
    return res.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeGoal = async (req, res) => {
  try {
    let goal = req.goal;
    await goal.remove();
    return res.status(200).json({ status: "success" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const getGoalById = async (req, res, next, id) => {
  try {
    let goal = await Goals.findById(id);
    if (isEmpty(goal)) {
      return res.status("400").json({
        error: "Goal not found",
      });
    }
    req.goal = goal;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const hasAuthorization = (req, res, next) => {
  const authorized =
    req.goal && req.auth && req.goal.recorded_by._id == req.auth._id;
  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};

const getAllGoals = async (req, res) => {
  try {
    const userId = req.auth._id;
    const goals = await Goals.find({
      recorded_by: mongoose.Types.ObjectId(userId),
    });
    return res.json(goals);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  createGoal,
  removeGoal,
  updateGoal,
  getGoalById,
  getAllGoals,
  hasAuthorization,
};
