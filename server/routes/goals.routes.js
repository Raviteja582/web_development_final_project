import express from "express";
import authCtrl from "../controllers/auth.controller";
import goalCtrl from "../controllers/goals.controller";

const router = express.Router();

router
  .route("/api/goals")
  .get(authCtrl.requireSignin, goalCtrl.getAllGoals)
  .post(authCtrl.requireSignin, goalCtrl.createGoal);

router
  .route("/api/goals/:goalId")
  // .get(authCtrl.requireSignin, goalCtrl.read)
  .put(authCtrl.requireSignin, goalCtrl.hasAuthorization, goalCtrl.updateGoal)
  .delete(
    authCtrl.requireSignin,
    goalCtrl.hasAuthorization,
    goalCtrl.removeGoal
  );

router.param("goalId", goalCtrl.getGoalById);

export default router;
