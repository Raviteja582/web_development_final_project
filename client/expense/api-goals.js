const createGoal = async (credentials, goal) => {
  try {
    let response = await fetch("/api/goals/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(goal),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

const updateGoal = async (params, credentials, goal) => {
  try {
    let response = await fetch("/api/goals/" + params.goalId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(goal),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

const removeGoal = async (params, credentials) => {
  try {
    let response = await fetch("/api/goals/" + params.goalId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

const getAllGoals = async (credentials) => {
  try {
    let response = await fetch("/api/goals/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { createGoal, updateGoal, removeGoal, getAllGoals };
