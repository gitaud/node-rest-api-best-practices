const express = require("express");
const cors = require("cors");
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const v1MemberRoutes = require("./v1/routes/memberRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use("/api/v1/workouts", v1WorkoutRouter);
app.use("/api/v1/members", v1MemberRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})