const DB = require("./db.json");

const getRecordForWorkout = (workoutId) => {
  try {
    const record = DB.records.filter((record) => record.workout === workoutId);
    if (record.length === 0) {
      throw {
        status: 400,
        message: `Can't find a workout with the id ${workoutId}`
      };
    }
    return record;
  } catch(error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
}

module.exports = { getRecordForWorkout };