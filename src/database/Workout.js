const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = (filterParams) => {
  try {
    let workouts = DB.workouts;
    if (filterParams.mode) {
      workouts = workouts.filter(workout => 
        workout.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    if (filterParams.equipment) {
      workouts = workouts.filter(workout => 
        workout.equipment.indexOf(filterParams.equipment) !== -1  
      );
    }
    
    if (filterParams.sort) {
      if (filterParams.sort === "-createdAt") {
        workouts = workouts.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        )
      } else if (filterParams.sort === "-updatedAt") {
        workouts = workouts.sort((a, b) => 
          new Date(b.updatedAt) - new Date(a.updatedAt)
        )
      }
    }

    if (filterParams.page) {
      let indx = Number(filterParams.page) * 10;
      if (indx < workouts.length && (indx + 10) < workouts.length) {
        workouts = workouts.slice(indx, indx + 10);
      } else if (indx < workouts.length) {
        workouts = workouts.slice(indx, workouts.length - 1);
      } else {
        workouts = workouts.slice(workouts.length - 11, workouts.length - 1);
      }
    }
    
    if (filterParams.length) {
      workouts = workouts.slice(0, Number(filterParams.length));
    }
    return workouts;
  } catch (error) {
    throw { status: 500, message: error };
  }
}

const getOneWorkout = (workoutId) => {
  try {
    const workout = DB.workouts.find(workout => workout.id === workoutId);
    if (!workout) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`
      };
    }
    return workout;
  } catch(error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
}

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Workout with the name ${newWorkout.name} already exists`
    };
  }
  try {
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch(error) {
    throw { status: 500, message: error?.message || error}
  }
}

const updateOneWorkout = (workoutId, changes) => {
  try{
    const indexForUpdate = DB.workouts.findIndex(workout => workout.id === workoutId);
    if (indexForUpdate == -1) {
      throw { 
        status: 400,
        message: `Can't find workout with the id ${workoutId}`
      };
    }
    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleDateString("en-US", { timeZone: 'UTC'})
    };
    DB.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
  } catch(error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
}

const deleteOneWorkout = (workoutId) => {
  try {
    const indexForDeletion = DB.workouts.findIndex(
      workout => workout.id === workoutId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find a workout with the id ${workoutId}`
      };
    }
    DB.workouts.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch(error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

module.exports = { 
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout
}