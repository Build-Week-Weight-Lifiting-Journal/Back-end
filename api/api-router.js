const router = require("express").Router();

const restricted = require("../middleware/restricted-middleware");
const authRouter = require("../auth/auth-router");
const usersRouter = require("../routes/users-router");
const workoutRouter = require("../routes/workouts-router");

router.use("/auth", authRouter);
router.use("/users", /*restricted,*/ usersRouter);
router.use("/users", workoutRouter)

module.exports = router;