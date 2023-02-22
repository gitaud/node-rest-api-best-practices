const recordService = require('../services/recordService');

const getRecordForWorkout = (req, res) => {
  try {
    const {
      params: { workoutId }
    } = req;
    if (!workoutId) {
      throw {
        status: 400,
        message: `Parameter 'workoutId' must be supplied`
      }
    }
    const record = recordService.getRecordForWorkout(workoutId);
    res
      .status(200)
      .send({
        status: 'OK',
        data: record  
      })
  } catch(error) {
    res
      .status(error?.status || 500)
      .send({
        status: 'FAILED',
        data: { error: error?.message || error }
      })
  }
}

module.exports = { getRecordForWorkout };